const pdf = require('pdf-parse');
const fs = require('fs');
const Resume = require('../models/resumes/resumes');
const jwt = require('jsonwebtoken');
const path = require('path');
const fsp = require('fs/promises');
const bcryptjs = require('bcryptjs');
const { resolveJobTitle } = require("../config/resolveJobTitle");
const MatchedJobs = require("../models/matchedJobs/matchedJobs");


// const { GoogleGenerativeAI } = require('@google/generative-ai');
const Skill = require('../models/skills/skill');

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const Groq = require("groq-sdk");
const { buildJobQueriesFromSkills } = require('../config/jobQueryBuilder');
const { fetchJobs } = require('../config/jobService');
const User = require('../models/users/user');
const FrontendQuestions = require('../models/interviewQuestions/frontendQuestions');
const ReactQuestions = require('../models/interviewQuestions/reactQuestions');
const BackendQuestions = require('../models/interviewQuestions/backendQuestions');
const DataScientistQuestions = require('../models/interviewQuestions/dataScientistQuestions');
const DevOpsQuestions = require('../models/interviewQuestions/devOpsQuestions');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const groq_chatbot = new Groq({ apiKey: process.env.GROQ_API_KEY_CHATBOT });

// function extractJSON(text) {
//   return text
//     .replace(/```json/g, '')
//     .replace(/```/g, '')
//     .trim();
// }

function extractJSON(text) {
  try {
    // Remove everything before first {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON object found");
    }

    let jsonString = text.substring(start, end + 1);

    // Remove JS-style comments or parentheses explanations
    jsonString = jsonString.replace(/\([^)]*\)/g, "");

    return JSON.parse(jsonString);
  } catch (err) {
  console.error("JSON Parse Error:", err.message);
  throw err; 
}
}


exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;   
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

exports.uploadResume = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const file = req.file;

        // console.log('User ID:', userId);
        // console.log('Uploaded file:', file);

        
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' }); 
        }
        
        // Extract text from PDF
        const dataBuffer = fs.readFileSync(file.path);
        // console.log('Data Buffer:', dataBuffer);
        const pdfData = await pdf(dataBuffer);
        // console.log('PDF Data:', pdfData);
        const resumeText = pdfData.text;
        // console.log('Extracted Resume Text:', resumeText);
        
        // Save to database
        const resume = new Resume(null, userId, file.originalname ,file.path, resumeText, null);
        const result = await resume.insert();

        // console.log('Resume uploaded with ID:', result); 
        
        // Emit processing status via Socket.io
        // req.io.emit(`processing-${userId}`, {
        //     resumeId: result.insertId,
        //     status: 'uploaded',
        //     message: 'Resume uploaded successfully'
        // });
        
        res.json({
            success: true,
            resumeId: result[0].insertId,
            text: resumeText.substring(0, 500) + '...'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getMyResumes = async (req, res) => {
    try {
        console.log('Request params:', req.params);
        const {userId} = req.params;
        console.log('User ID for fetching resumes:', userId);
        
        const [resumes] = await Resume.findById(userId);
        // console.log('Fetched resumes:', resumes);
        
        
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.downloadResume = async (req, res) => {
  try {
    const {resumeId} = req.params;
    const id = parseInt(resumeId);
    const userId = req.userId;
    console.log('User ID for downloading resume:', userId);
    console.log('Resume ID for downloading resume:', id);
    const [resumeFilePath] = await Resume.findFileById(id, userId);

    console.log('Resume File Path:', resumeFilePath);

    if (!resumeFilePath) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const filePath = path.resolve(resumeFilePath[0].file_path);
    console.log('File Path:', filePath);
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading resume:", err);
        return res.status(500).json({ message: "Error downloading resume" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.extractSkills = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const userId = req.userId;
    console.log('Resume ID for extracting skills:', resumeId);

    const [resume] = await Resume.findByResumeId(resumeId);
    console.log('Resume for extracting skills:', resume);
    if (!resume || resume.length === 0) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const resumeText = resume[0].raw_text;
    if (!resumeText) {
      return res.status(400).json({ error: "Resume text missing" });
    }
    
//     const prompt = `
// Analyze this resume and extract the following information in JSON format ONLY.

// IMPORTANT:
// - Extract ALL personal, academic, and professional projects
// - Include college, freelance, and GitHub projects
// - Do NOT omit projects even if they appear under experience

// Expected JSON format:
// {
//   "skills": {
//     "programming": [],
//     "frameworks": [],
//     "tools": [],
//     "soft_skills": [],
//     "databases": [],
//     "cloud_platforms": [],
//     "other": []
//   },
//   "experience": [],
//   "projects": [
//     {
//       "name": "",
//       "description": "",
//       "technologies": [],
//       "role": ""
//     }
//   ],
//   "certifications": [],
//   "education": "",
//   "total_experience_years": number
// }

// Resume:
// ${resumeText.substring(0, 4000)}

// Return ONLY valid JSON. No explanation.
// `;

    const prompt = `
    You are an intelligent resume parsing engine.

    TASK:
    Analyze the resume and extract structured information in STRICT JSON format.

    CRITICAL INSTRUCTION:
    - Do NOT omit any technical skill mentioned explicitly or implicitly
    - If unsure about a skill’s category, place it in "other" rather than omitting it
    - Extract skills even if they appear in project descriptions, experience, or tools sections

    SKILL CLASSIFICATION LOGIC (DO NOT LIST EXAMPLES IN OUTPUT):
    - programming: languages used to write logic, scripts, or applications
    - markup_languages: languages used to structure content or documents
    - styling_languages: languages used to style or design user interfaces
    - frameworks: libraries or platforms that provide application structure
    - tools: software used for development, deployment, or productivity
    - databases: systems used for data storage or querying
    - cloud_platforms: services used for hosting, deployment, or infrastructure
    - data_technologies: tools or libraries used for analytics, data processing, or ML
    - devops: CI/CD, containers, infrastructure, or automation tools
    - soft_skills: non-technical professional skills
    - other: any skill that does not clearly fit above categories

    IMPLICIT SKILL RULES:
    - If frontend or web development is mentioned, include relevant markup and styling languages if implied
    - If backend development is mentioned, include server-side programming languages and frameworks if implied
    - If data, AI, or ML work is mentioned, include related data technologies if implied
    - If cloud or deployment is mentioned, include relevant cloud or DevOps tools if implied

    EXPECTED JSON FORMAT (STRICT):
    {
      "skills": {
        "programming": [],
        "markup_languages": [],
        "styling_languages": [],
        "frameworks": [],
        "tools": [],
        "databases": [],
        "cloud_platforms": [],
        "data_technologies": [],
        "devops": [],
        "soft_skills": [],
        "other": []
      },
      "experience": [],
      "projects": [
        {
          "name": "",
          "description": "",
          "technologies": [],
          "role": ""
        }
      ],
      "certifications": [],
      "education": "",
      "total_experience_years": number
    }

    IMPORTANT OUTPUT RULES:
    - Output ONLY valid JSON
    - Output MUST start with { and end with }
    - Do NOT include explanations, comments, or extra text
    - All arrays must contain plain strings only

    RESUME TEXT:
    ${resumeText.substring(0, 4000)}
    `;


    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

    const responseText = completion.choices[0].message.content;

    let analysis;
    try {
      analysis = extractJSON(responseText);
    } catch (err) {
      console.error("Invalid JSON from Groq:", responseText);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    if (analysis.skills) {
      for (const category of Object.keys(analysis.skills)) {
        for (const skill of analysis.skills[category]) {
          const skillRecord = new Skill(
            null,
            userId,
            resumeId,
            skill,
            category,
            0.9
          );
          await skillRecord.insert();
        }
      }
    }

    await Resume.updateParsedData(
      resumeId,
      JSON.stringify(analysis)
    );

    res.json({ success: true, analysis });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateStats = async (req, res) => {
  try {
    const { resumeId } = req.body;

const [resume] = await Resume.findByResumeId(resumeId);
if (!resume || resume.length === 0) {
  return res.status(404).json({ error: "Resume not found" });
}

const resumeText = resume[0].raw_text;

const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer and senior technical recruiter with 15+ years of experience evaluating resumes for competitive software, data, and technical roles.

Your task is to conduct a RIGOROUS, REALISTIC, and STRICT evaluation.
Be critical and conservative. Most resumes have significant flaws.
Do NOT assume intent. Evaluate ONLY what is explicitly written.

-----------------------------------
SCORING FRAMEWORK (STRICT CALIBRATION):
- 95–100: Exceptional. Top 1%. Rarely awarded.
- 85–94: Excellent. Strong resume with minor gaps.
- 70–84: Good, but clearly improvable.
- 55–69: Average. Typical resume with weak impact, metrics, or keywords.
- 40–54: Below average. Multiple serious issues.
- Below 40: Poor. ATS-unfriendly or unclear.

DEFAULT: Most resumes should fall between 50–70.

-----------------------------------
EVALUATION CRITERIA (ALL MUST BE CONSIDERED):

1. ATS Compatibility & Formatting
- Parseable structure, standard headings, bullet clarity
- No tables, columns, graphics, or dense paragraphs
- Penalize ATS-unfriendly formatting heavily

2. Skills & Keyword Optimization
- Role-relevant technical keywords
- Skills listed must be demonstrated in experience or projects
- Penalize missing core technologies for the apparent target role
- Penalize buzzwords without evidence

3. Experience Quality & Impact
- Action verbs + quantified results
- Clear technical or business impact
- Penalize vague phrases (“worked on”, “responsible for”)
- Penalize long, duty-only bullets

4. Projects Quality
- Penalize missing or weak projects
- Require technical depth, clear tech stack, and outcomes
- Penalize trivial or tutorial-level projects

5. Structure & Clarity
- Logical ordering, easy to scan in under 10 seconds
- Concise bullets (1–2 lines max)
- Penalize redundancy and buried key information

6. Professional Language
- Clear, professional tone
- No grammar or spelling errors
- No personal pronouns

-----------------------------------
MANDATORY PENALTIES:
- No quantified achievements → major score reduction
- Missing or weak projects → major score reduction
- Keyword gaps for technical roles → score reduction
- Listing skills not used anywhere → score reduction
- ATS-unfriendly formatting → major score reduction

-----------------------------------
OUTPUT RULES (CRITICAL):
- Be blunt, honest, and specific
- No generic praise or filler language
- No explanations outside the JSON
- Return ONLY valid JSON
- Match the format EXACTLY
- Do NOT add extra fields
- Strengths, weaknesses, and improvements must be concise but specific

-----------------------------------
RETURN FORMAT (EXACT):
{
  "score": number,
  "strengths": [
    "specific strength 1",
    "specific strength 2"
  ],
  "weaknesses": [
    "specific weakness 1",
    "specific weakness 2"
  ],
  "improvements": [
    "clear, actionable improvement 1",
    "clear, actionable improvement 2"
  ]
}

Resume:
${resumeText.substring(0, 8000)}
`;


    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

    const aiResponse = 
      extractJSON(completion.choices[0].message.content)


    // Save score + feedback
    await Resume.updateResumeEvaluation(
      resumeId,
      aiResponse.score,
      {
        strengths: aiResponse.strengths,
        weaknesses: aiResponse.weaknesses,
        improvements: aiResponse.improvements
      }
    );

    console.log('Updated resume evaluation:', aiResponse);

    res.json(aiResponse);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.matchRealJobs = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const userId = req.userId;

    if (!resumeId) {
      return res.status(400).json({ error: "resumeId is required" });
    }

    const [cached] = await MatchedJobs.findByResumeId(resumeId);
    console.log('cached', cached);

    if (cached.length > 0) {
      const createdAt = new Date(cached[0].created_at);
      const isExpired = Date.now() - createdAt.getTime() > DAY_IN_MS;

      if (!isExpired) {
        console.log("Serving matched jobs from DB (not expired)");
        return res.json((cached[0].jobs_json));
      }

      console.log("Cache expired — deleting old entry");
      await MatchedJobs.deleteByResumeId(resumeId);
    }

    console.log("No cached jobs — fetching from API");

    const [resume] = await Resume.findByResumeId(resumeId);
    // console.log('resume', resume);

    if (!resume || resume.length === 0) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const parsedData = resume[0].parsed_data || {};
    // console.log('parsedData',parsedData);

    const jobTitle = resolveJobTitle({
      rawText: resume[0].raw_text,
      skills: parsedData.skills
    });

    console.log("Detected job title:", jobTitle);

    if (!jobTitle) {
      return res.status(400).json({ error: "Unable to detect job title from resume" });
    }

    // const queries = buildJobQueriesFromSkills(parsedData.skills);


    // let jobs = [];
    // for (const query of queries) {
    //   const fetched = await fetchJobs(query, "India", resume[0].parsed_data.total_experience);
    //   jobs.push(...fetched);
    // }

    const query = `${jobTitle} jobs`;

    // const jobs = await fetchJobs(query, "India");

    let jobs;

    if (process.env.USE_FAKE_JOBS === "true") {
      console.log("Using fake jobs (DEV MODE)");
      jobs = require("../config/fakeJobs");
    } else {
      jobs = await fetchJobs(query, "India");
    }
    console.log('jobs',jobs);
    console.log('jobs length',jobs.length);

    // Remove duplicates
    const uniqueJobs = Array.from(
      new Map(jobs.map(j => [`${j.title}-${j.company}`, j])).values()
    ).slice(0, 30);

    const matchedJobs = [];

    for (const job of uniqueJobs) {
const prompt = `
You are an Applicant Tracking System (ATS) that evaluates how well a resume matches a job description.

TASK:
Compare the resume and the job description and calculate a match score.

SCORING RULES:
- Score must be an integer from 0 to 10
- Base the score on:
  - Skill overlap (most important)
  - Relevant experience
  - Keywords and tools
- Do NOT consider formatting or grammar
- Do NOT invent information not present in the resume

OUTPUT FORMAT:
Return ONLY valid JSON.
Do not include explanations, markdown, or extra text.

JSON SCHEMA:
{
  "score": number,
  "missing": string[],
  "strengths": string[]
}

GUIDELINES:
- "missing": list the most important missing skills or requirements (max 5)
- "strengths": list the strongest matching skills or experiences (max 5)
- Keep each item short (1 short sentence or phrase)

RESUME:
${resume[0].raw_text.substring(0, 4000)}

JOB DESCRIPTION:
${job.description.substring(0, 4000)}
`;


      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      });

      const result = extractJSON(completion.choices[0].message.content);

      matchedJobs.push({
          ...job,
          score: result.score,
          missing: result.missing,
          strengths: result.strengths
        });
      }

    await MatchedJobs.save(userId, resumeId, matchedJobs);
    res.json(matchedJobs.sort((a, b) => b.score - a.score));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const [resume] = await Resume.findByResumeId(resumeId);
    // console.log('resume', resume);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    console.log('resume file path', resume[0].file_path);

    const filePath = path.join(__dirname, '..', resume[0].file_path);

    // delete file
    await fsp.unlink(filePath);

    // delete DB record
    await Skill.deleteSkillsByResumeId(resumeId);
    await Resume.deleteResume(resumeId);

    res.json({ success: true, message: 'Resume deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.analyzeJobs = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    console.log('resumeId', resumeId);
    console.log('jobDescription', jobDescription);

    // Fetch parsed resume data
    const [resumes] = await Resume.findParsedDataByResumeId(resumeId);

    console.log('resumes', resumes);

    if (resumes.length === 0) {
      return res.status(404).json({ error: "Resume not found" });
    }


    const resumeData = resumes[0].parsed_data;
    console.log('resumeData', resumeData);

    const flatResumeSkills = Object.values(resumeData.skills || {})
  .flat()
  .filter(Boolean);

    const prompt = `
Compare this resume with the job description and provide:

1. Match score (0-100)
2. Strong matches (skills/experience that align well)
3. Missing requirements (skills/experience that are present in the job description but not in the resume)
4. Suggestions to improve fit (give 3-5 suggestions)

Resume Skills:
${JSON.stringify(flatResumeSkills)}

Resume Experience:
${
  resumeData.experience
    ? JSON.stringify(resumeData.experience)
    : "Not specified"
}

Job Description:
${jobDescription}

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include explanations
- Do NOT include comments
- Do NOT include text before or after JSON
- All array values must be plain strings

Return JSON exactly in this format:
{
  "score": number,
  "strongMatches": [],
  "missing": [],
  "suggestions": []
}
`;

// const prompt = `
// You are a STRICT ATS-style resume–job matching engine.

// Your task is to compare a resume against a job description and return a structured evaluation.

// ==============================
// INTERNAL STEP (DO NOT OUTPUT)
// ==============================
// From the JOB DESCRIPTION, extract a list called REQUIRED_SKILLS.

// REQUIRED_SKILLS rules:
// - Include ONLY skills, tools, technologies, or frameworks
// - Include ONLY items explicitly written in the job description
// - Do NOT infer, generalize, or add synonyms
// - Exclude soft skills, traits, and generic phrases

// ==============================
// MATCHING RULES (MANDATORY)
// ==============================
// - strongMatches:
//   Items that appear in BOTH REQUIRED_SKILLS and the resume
// - missing:
//   Items that appear in REQUIRED_SKILLS but DO NOT appear anywhere in the resume
// - You are FORBIDDEN from adding:
//   - Resume-only skills to "missing"
//   - Skills not explicitly written in the job description
//   - Inferred or implied skills

// If REQUIRED_SKILLS is empty:
// - strongMatches MUST be []
// - missing MUST be []

// ==============================
// SCORING RULES
// ==============================
// - Score must be an integer from 0 to 100
// - Score is based ONLY on REQUIRED_SKILLS coverage
// - Use this formula:
//   score = round((strongMatches.length / REQUIRED_SKILLS.length) * 100)
// - Extra resume skills MUST NOT increase or decrease the score
// - Do NOT inflate scores

// ==============================
// SUGGESTIONS RULES
// ==============================
// - Suggestions must relate ONLY to missing REQUIRED_SKILLS
// - Each suggestion should be concrete and actionable
// - If nothing is missing, return an empty array []

// ==============================
// OUTPUT RULES (CRITICAL)
// ==============================
// - Output ONLY valid JSON
// - Output MUST start with { and end with }
// - No explanations, no markdown, no comments
// - All array values MUST be plain strings

// ==============================
// INPUT DATA
// ==============================

// RESUME SKILLS:
// ${JSON.stringify(flatResumeSkills)}

// RESUME EXPERIENCE:
// ${
//   resumeData.experience
//     ? JSON.stringify(resumeData.experience)
//     : "Not specified"
// }

// JOB DESCRIPTION:
// ${jobDescription}

// ==============================
// RESPONSE FORMAT (STRICT)
// ==============================
// {
//   "score": number,
//   "strongMatches": [],
//   "missing": [],
//   "suggestions": []
// }
// `;


//     const prompt = `
// You are an automated resume–job matching engine.

// TASK:
// Analyze the resume against the job description and compute how well they match.

// SCORING RULES:
// - Score must be an integer from 0 to 100
// - Base score on skills overlap, relevant experience, and tools
// - Do NOT inflate scores

// OUTPUT RULES (MANDATORY):
// - Output MUST be valid JSON
// - Output MUST start with { and end with }
// - Do NOT include explanations, notes, or commentary
// - Do NOT include markdown or code fences
// - Do NOT include parentheses, comments, or trailing text
// - Every array item MUST be a plain string

// FIELDS DEFINITION:
// - score: integer (0–100)
// - strongMatches: skills or experience clearly matching the job
// - missing: skills or requirements mentioned in the job but not present in the resume
// - suggestions: concrete actions to improve resume–job fit

// RESUME SKILLS:
// ${JSON.stringify(resumeData.skills)}

// RESUME EXPERIENCE:
// ${
//   resumeData.experience
//     ? JSON.stringify(resumeData.experience)
//     : "Not specified"
// }

// JOB DESCRIPTION:
// ${jobDescription}

// RESPONSE FORMAT (STRICT):
// {
//   "score": 0,
//   "strongMatches": [],
//   "missing": [],
//   "suggestions": []
// }
// `;

//     const prompt = `
// You are an automated ATS-style resume–job matching engine.

// TASK:
// Compare the resume against the job description and evaluate how well the resume fits the role.

// IMPORTANT COMPARISON RULE:
// - Treat the JOB DESCRIPTION as the source of truth
// - Compare resume → job description (NOT the reverse)

// SCORING RULES:
// - Score must be an integer from 0 to 100
// - Base the score on:
//   - Presence of job-required skills in the resume
//   - Relevance of experience to the job
// - Do NOT penalize the resume for having extra or advanced skills
// - Do NOT inflate scores

// FIELD DEFINITIONS (STRICT):
// - "strongMatches":
//   Skills, tools, or experience that are CLEARLY mentioned in BOTH the resume and the job description

// - "missing":
//   Skills or requirements that are EXPLICITLY mentioned in the job description
//   AND are NOT found anywhere in the resume
//   - Do NOT include extra, optional, advanced, or unrelated resume skills
//   - If nothing is missing, return an empty array []

// - "suggestions":
//   Concrete, actionable suggestions to improve alignment with THIS job description only

// OUTPUT RULES (MANDATORY):
// - Output MUST be valid JSON
// - Output MUST start with { and end with }
// - Do NOT include explanations, notes, or commentary
// - Do NOT include markdown, code fences, or extra text
// - Do NOT include parentheses or comments
// - Every array item MUST be a plain string

// RESUME SKILLS:
// ${JSON.stringify(resumeData.skills)}

// RESUME EXPERIENCE:
// ${
//   resumeData.experience
//     ? JSON.stringify(resumeData.experience)
//     : "Not specified"
// }

// JOB DESCRIPTION:
// ${jobDescription}

// RESPONSE FORMAT (STRICT):
// {
//   "score": 0,
//   "strongMatches": [],
//   "missing": [],
//   "suggestions": []
// }
// `;

//     const prompt2 = `
// You are a STRICT ATS-style resume–job matching engine.

// YOU MUST FOLLOW THESE RULES EXACTLY.

// ==================================================
// STEP 1 — REQUIRED SKILLS EXTRACTION (INTERNAL ONLY)
// ==================================================
// From the JOB DESCRIPTION, extract ONLY skills or technologies that are:
// - Explicitly mentioned
// - Technical (languages, frameworks, databases, tools)

// DO NOT extract:
// - Soft skills
// - Attitudes or traits (e.g., willingness to learn, teamwork)
// - Generic phrases (e.g., web development concepts, freshers welcome)

// Call this list REQUIRED_SKILLS.

// ==================================================
// STEP 2 — RESUME COMPARISON
// ==================================================
// Compare the resume ONLY against REQUIRED_SKILLS.

// STRICT RULES:
// - A skill is a strongMatch ONLY if it appears in BOTH REQUIRED_SKILLS and the resume
// - A skill is missing ONLY if:
//   1) It appears in REQUIRED_SKILLS
//   2) It does NOT appear anywhere in the resume

// 🚫 YOU ARE FORBIDDEN from:
// - Adding skills from the resume into "missing"
// - Adding skills that are NOT explicitly written in the JOB DESCRIPTION
// - Inferring or guessing missing skills

// If REQUIRED_SKILLS is empty, then:
// - strongMatches MUST be []
// - missing MUST be []

// ==================================================
// SCORING RULES
// ==================================================
// - Score must be an integer from 0 to 100
// - Score is based ONLY on REQUIRED_SKILLS coverage
// - Extra resume skills MUST NOT reduce the score
// - Do NOT inflate scores

// ==================================================
// OUTPUT RULES (MANDATORY)
// ==================================================
// - Output ONLY valid JSON
// - Output MUST start with { and end with }
// - No explanations, no markdown, no comments
// - Every array item MUST be a plain string

// ==================================================
// RESUME SKILLS:
// ${JSON.stringify(flatResumeSkills)}

// RESUME EXPERIENCE:
// ${
//   resumeData.experience
//     ? JSON.stringify(resumeData.experience)
//     : "Not specified"
// }

// JOB DESCRIPTION:
// ${jobDescription}

// ==================================================
// RESPONSE FORMAT (STRICT):
// {
//   "score": 0,
//   "strongMatches": [],
//   "missing": [],
//   "suggestions": []
// }
// `;
// const prompt3 = `
// You are a STRICT ATS-style resume–job matching engine.

// ABSOLUTE RULES (YOU MUST FOLLOW):
// - The REQUIRED_SKILLS list is the ONLY source of truth
// - You are FORBIDDEN from adding, inferring, or guessing skills
// - You must NEVER use resume-only skills as "missing"
// - If a skill is not in REQUIRED_SKILLS, you MUST ignore it completely

// ==================================================
// REQUIRED_SKILLS (SOURCE OF TRUTH — DO NOT MODIFY):
// ${JSON.stringify(requiredSkills)}

// ==================================================
// RESUME SKILLS (FLATTENED LIST):
// ${JSON.stringify(flatResumeSkills)}

// ==================================================
// RESUME EXPERIENCE:
// ${
//   resumeData.experience
//     ? JSON.stringify(resumeData.experience)
//     : "Not specified"
// }

// ==================================================
// MATCHING LOGIC (MANDATORY):
// - strongMatches:
//   Skills that appear in BOTH REQUIRED_SKILLS and RESUME SKILLS
// - missing:
//   Skills that appear in REQUIRED_SKILLS but DO NOT appear in RESUME SKILLS
// - If REQUIRED_SKILLS is empty:
//   - strongMatches MUST be []
//   - missing MUST be []

// ==================================================
// SCORING RULES:
// - Score must be an integer from 0 to 100
// - Score is based ONLY on REQUIRED_SKILLS coverage
// - Extra resume skills MUST NOT affect the score
// - Do NOT inflate scores

// ==================================================
// SUGGESTIONS RULES:
// - Suggestions MUST relate ONLY to REQUIRED_SKILLS
// - Do NOT suggest adding unrelated or extra skills
// - If nothing is missing, return an empty array []

// ==================================================
// OUTPUT RULES (CRITICAL):
// - Output ONLY valid JSON
// - Output MUST start with { and end with }
// - No explanations
// - No markdown
// - No comments
// - Every array item MUST be a plain string

// ==================================================
// RESPONSE FORMAT (STRICT):
// {
//   "score": 0,
//   "strongMatches": [],
//   "missing": [],
//   "suggestions": []
// }
// `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are a JSON API. Respond with ONLY valid JSON. No explanations, no comments, no extra text."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    console.log("Completion:", completion);

    // const result = await model.generateContent(prompt);
    // const responseText = result.response.text();

    // // Parse Gemini output
    // const cleanJson = responseText
    //   .replace(/```json/g, "")
    //   .replace(/```/g, "")
    //   .trim();

    // const matchResult = JSON.parse(cleanJson);

    const aiResponse = extractJSON(completion.choices[0].message.content);
 
    console.log("AI Response:", aiResponse);

    const matchResult = {
      score: aiResponse.score,
      strongMatches: aiResponse.strongMatches,
      missing: aiResponse.missing,
      suggestions: aiResponse.suggestions,
    };

    console.log("Match Result:", matchResult);

    res.json(matchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getname = async (req, res) => {
  try {
    console.log('inside getname');
    const userId = req.userId;
    console.log('userId:', userId);
    const firstName = await User.getFirstName(userId);
    const lastName = await User.getLastName(userId);

    console.log('firstName:', firstName);
    console.log('lastName:', lastName);

    const name = `${firstName} ${lastName}`;

    console.log('Name:', name);

    res.json(name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getFirstName = async(req, res) => {
  try{
    const userId = req.userId;
    const firstName = await User.getFirstName(userId);
    console.log('First Name:', firstName);
    res.json(firstName);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.getLastName = async(req, res) => {
  try{
    const userId = req.userId;
    const lastName = await User.getLastName(userId);
    console.log('Last Name:', lastName);
    res.json(lastName);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.updateProfile = async(req, res) => {
  try{
    const userId = req.userId;
    const { firstname, lastname } = req.body;
    console.log('First Nameee:', firstname);
    console.log('Last Nameeee:', lastname);
    await User.updateProfile(userId, firstname, lastname);
    res.json({ success: true });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.deleteAccount = async(req, res) => {
  try{
    const userId = req.userId;
    await User.deleteAccount(userId);
    res.json({ ok: true });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.getEmail = async(req, res) => {
  try{
    const userId = req.userId;
    const email = await User.getEmail(userId);
    console.log('Email:', email);
    res.json(email);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.setPassword = async(req, res) => {
  try{
    const userId = req.userId;
    const { data } = req.body;
    console.log('data:', data);
    const password = await User.getPassword(userId);

    const { currentPassword, newPassword, confirmPassword } = data;

    if(!await bcryptjs.compare(currentPassword, password)){
      return res.json({ error: 'Current password is incorrect', ok: false });
    }
    
    if (newPassword !== confirmPassword) {
      return res.json({ error: 'Passwords do not match', ok: false });
    }

    if (currentPassword === newPassword) {
      return res.json({ error: 'New password cannot be the same as the current password', ok: false });
    }

    if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
      return res.json({ error: 'Please fill in all fields', ok: false });
    }  

    // const password = newPassword;
    const newHashedPassword = await bcryptjs.hash(newPassword, 12);
    await User.updatePassword(userId, newHashedPassword);
    return res.json({ message: 'Password updated successfully', ok: true });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message, ok: false });
  }
}

exports.setThemeBackend = async(req, res) => {
  try{
    const userId = req.userId;
    const { theme } = req.body;
    await User.updateTheme(userId, theme);
    return res.json({ message: 'Theme updated successfully', ok: true });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message, ok: false });
  }
}

exports.getThemeBackend = async(req, res) => {
  try{
    const userId = req.userId;
    const theme = await User.getTheme(userId);
    return res.json(theme);
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message, ok: false });
  }
}

exports.fetchInterviewQuestions = async(req,res) => {
  try{
    const jobTitle = req.params.jobTitle;
    let interviewQuestions = [];
    if(jobTitle === 'frontend developer'){
      const [rows]= await FrontendQuestions.fetchAll();
      interviewQuestions = rows;
    }
    else if(jobTitle === 'react developer'){
      const [rows]= await ReactQuestions.fetchAll();
      interviewQuestions = rows;
    }
    else if(jobTitle === 'backend developer'){
      const [rows]= await BackendQuestions.fetchAll();
      interviewQuestions = rows;
    }
    else if(jobTitle === 'data scientist'){
      const [rows]= await DataScientistQuestions.fetchAll();
      interviewQuestions = rows;
    }
    else if(jobTitle === 'devops engineer'){
      const [rows]= await DevOpsQuestions.fetchAll();
      interviewQuestions = rows;
    }
    return res.json(interviewQuestions);
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message, ok: false });
  }
}

exports.aiResponse = async(req, res) => {
  try{
    console.log('inside aiResponse');
    const { jobTitle, activeQuestion, input } = req.body;
    console.log('jobTitle:', jobTitle);
    console.log('activeQuestion:', activeQuestion.question);
    console.log('input:', input);

    const context = `
Job Role: ${jobTitle || "Interview Candidate"}
Interview Question: ${activeQuestion.question || "N/A"}
`;


    const completion = await groq_chatbot.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `You are an interview preparation assistant. Explain answers clearly with examples and simple language. ${context}`,
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json(aiResponse);
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message, ok: false });
  }
}
                                              

// exports.extractSkills = async (req, res) => {
//     try {
//         const { resumeId, resumeText } = req.body;

//         const model = genAI.getGenerativeModel({
//             model: 'gemini-pro'
//         });

//         const prompt = `
// Analyze this resume and extract the following information in JSON format:

// 1. Skills (categorize as: programming, frameworks, tools, soft_skills)
// 2. Experience (list each job with: title, company, duration, achievements)
// 3. Education
// 4. Years of total experience

// Resume Text:
// ${resumeText.substring(0, 4000)}

// Return ONLY valid JSON. No markdown, no explanation.
// `;

//         const result = await model.generateContent(prompt);
//         const responseText = result.response.text();

//         const analysis = JSON.parse(responseText);

//         // Save extracted skills
//         if (analysis.skills) {
//             for (const category of Object.keys(analysis.skills)) {
//                 for (const skill of analysis.skills[category]) {
//                     const skillRecord = new Skill(null, resumeId, skill, category, 0.9);
//                     await skillRecord.insert();
//                 }
//             }
//         }

//         // Store parsed data
//         await Resume.updateParsedData(resumeId, JSON.stringify(analysis));

//         res.json({ success: true, analysis });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// }



// exports.updateStats = async (req, res) => {
//   try {
//     const { resumeId, resumeText } = req.body;

//     const prompt = `
// Evaluate this resume for overall quality and ATS readiness.

// Criteria:
// - Clarity and structure
// - Skill coverage
// - Experience descriptions
// - Formatting and conciseness
// - Professional language

// Resume:
// ${resumeText.substring(0, 4000)}

// Return ONLY valid JSON:
// {
//   "score": number,
//   "strengths": [],
//   "weaknesses": [],
//   "improvements": []
// }
// `;

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.2
//     });

//     const responseText = completion.choices[0].message.content;
//     const result = JSON.parse(responseText);

//     // Save score to DB
//     await Resume.updateScore(resumeId, result.score);

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// }


//     const prompt = `
// Evaluate this resume for overall quality and ATS readiness.

// Return ONLY valid JSON:
// {
//   "score": number,
//   "strengths": [],
//   "weaknesses": [],
//   "improvements": []
// }

// Resume:
// ${resumeText.substring(0, 4000)}
// `;
//     const prompt = `
// You are an ATS (Applicant Tracking System) and senior technical recruiter.

// Evaluate the resume STRICTLY and realistically.
// Do NOT be generous. Average resumes should score between 50–70.

// SCORING RULES:
// - 90–100: Excellent, highly ATS-optimized, strong metrics, clear impact
// - 70–89: Good, minor improvements needed
// - 50–69: Average, missing impact, weak formatting or keywords
// - Below 50: Poor, ATS-unfriendly, unclear experience

// Evaluate across these dimensions:
// 1. ATS compatibility (parsing, headings, formatting, keyword usage)
// 2. Skills relevance and coverage
// 3. Experience quality (clarity, impact, metrics)
// 4. Projects quality (technical depth, relevance, technologies used)
// 5. Resume structure, clarity, and conciseness
// 6. Professional language and grammar

// IMPORTANT:
// - Penalize missing or weak projects
// - Penalize lack of measurable results (numbers, percentages, scale)
// - Penalize keyword gaps for software/technical roles
// - Penalize long paragraphs and vague bullet points
// - Reward clear tech stacks, tools, and quantified impact

// Return ONLY valid JSON in this exact format:
// {
//   "score": number,
//   "strengths": [
//     "specific strength 1",
//     "specific strength 2"
//   ],
//   "weaknesses": [
//     "specific weakness 1",
//     "specific weakness 2"
//   ],
//   "improvements": [
//     "clear, actionable improvement 1",
//     "clear, actionable improvement 2"
//   ]
// }

// Resume:
// ${resumeText.substring(0, 8000)}
// `;

// const prompt = `
// You are an ATS (Applicant Tracking System) analyzer combined with a senior technical recruiter's expertise. Your evaluation must be STRICTLY realistic, critical, and uncompromising.

// **CRITICAL EVALUATION PHILOSOPHY:**
// - Assume this resume is competing against TOP candidates in 2024-2025 market
// - Average-to-good resumes score 50-69
// - Above 80 requires exceptional, quantifiable excellence
// - Be brutally honest about gaps and weaknesses

// **SCORING MATRIX (Be Conservative):**
// - 95-100: World-class resume (Rare, exceptional metrics, perfect ATS optimization)
// - 90-94: Excellent (Strong ATS parsing, outstanding quantifiable impact)
// - 85-89: Very Good (Minor improvements needed, strong metrics)
// - 75-84: Good (Decent but needs refinement in key areas)
// - 65-74: Average (Will pass initial ATS but struggle against top candidates)
// - 50-64: Below Average (Significant improvements required)
// - <50: Poor (ATS-unfriendly, vague, lacks impact)

// **EVALUATION DIMENSIONS (Weighted Scoring):**

// 1. **ATS OPTIMIZATION (20%)**
//    - Proper section headings (Experience, Education, Skills, Projects)
//    - Machine-readable formatting (no tables, columns, or graphics)
//    - Keyword density without stuffing (7-15% keyword ratio)
//    - Standard file format compatibility
//    - Contact information parsing

// 2. **SKILLS & KEYWORDS (15%)**
//    - Relevant technical stack for target role
//    - Proper categorization (Languages, Frameworks, Tools, etc.)
//    - Current/trending technologies vs outdated ones
//    - Contextual usage (skills demonstrated in experience/projects)

// 3. **EXPERIENCE IMPACT (25%) - MOST IMPORTANT**
//    - Every bullet must follow STAR/XYZ format: "Accomplished X, measured by Y, using Z"
//    - Quantifiable metrics ($$$, %, #, scale) - REQUIRED
//    - Action verbs (Led, Built, Optimized, Reduced, Increased)
//    - Technical depth and progression
//    - Clear company context and role scope

// 4. **PROJECTS SECTION (20%)**
//    - Real-world technical complexity
//    - GitHub/portfolio links (if applicable field)
//    - Clear problem → solution → impact structure
//    - Technologies used and depth of implementation
//    - Business relevance and scale

// 5. **STRUCTURE & CLARITY (10%)**
//    - Concise, scannable bullet points (1-2 lines max)
//    - No paragraphs, dense text, or walls of words
//    - Logical flow and hierarchy
//    - White space and readability

// 6. **ROLE-SPECIFIC OPTIMIZATION (10%)**
//    - Tailored for specific job family (SWE, Data Science, DevOps, etc.)
//    - Industry-standard terminology
//    - Appropriate certification/education emphasis
//    - Portfolio/contributions for technical roles

// **AUTOMATIC PENALTIES (Subtract 5-15 points each):**
// - Missing quantifiable metrics in experience (-15)
// - No projects section for technical roles (-10)
// - Dense paragraphs instead of bullet points (-8)
// - Keyword stuffing detected (-7)
// - Vague buzzwords without evidence (-10)
// - Missing GitHub/Links for development roles (-5)
// - Outdated technologies without modern equivalents (-8)
// - Spelling/grammar errors (-5)
// - Inconsistent formatting (-6)

// **AUTOMATIC REWARDS (Add 5-15 points each):**
// - Every bullet with clear metrics (+3 each, max +15)
// - Open source contributions with impact (+10)
// - Patents, publications, speaking engagements (+8)
// - Clear career progression with increased scope (+10)
// - Multiple relevant certifications (+7)

// **CRITICAL CHECKS:**
// 1. Does every experience bullet answer: "So what?" and "How much?"
// 2. Would this parse correctly in Workday, Greenhouse, Lever?
// 3. Could a recruiter understand the technical depth in <30 seconds?
// 4. Are there red flags (employment gaps, job hopping without explanation)?
// 5. Does it pass the "sticky note test" - key achievements visible at a glance?

// **IMPORTANT INSTRUCTIONS:**
// - DO NOT inflate scores - be brutally honest
// - Focus on IMPACT over responsibilities
// - Technical roles must show technical depth, not just team leadership
// - Assume competition is fierce (100+ applicants per role)
// - Consider role level (entry, mid, senior, staff) appropriately
// - Flag any potential exaggeration or red flags

// **OUTPUT FORMAT - STRICT JSON ONLY:**
// {
//   "score": number (0-100),
//   "score_breakdown": {
//     "ats_optimization": {score: number, max_score: 20, notes: string},
//     "skills_keywords": {score: number, max_score: 15, notes: string},
//     "experience_impact": {score: number, max_score: 25, notes: string},
//     "projects_section": {score: number, max_score: 20, notes: string},
//     "structure_clarity": {score: number, max_score: 10, notes: string},
//     "role_specific": {score: number, max_score: 10, notes: string}
//   },
//   "strengths": [
//     "specific, evidence-based strength 1",
//     "specific, evidence-based strength 2"
//   ],
//   "critical_weaknesses": [
//     "high-priority issue that will cause rejection",
//     "second critical weakness"
//   ],
//   "improvements": [
//     "actionable, specific improvement with example",
//     "next priority improvement"
//   ],
//   "ats_friendliness": "High/Medium/Low",
//   "estimated_screening_result": "Pass/Fail/Marginal",
//   "top_3_priority_fixes": ["fix1", "fix2", "fix3"]
// }

// **Resume to evaluate (first 8000 characters):**
// ${resumeText.substring(0, 8000)}

// **EVALUATION RULES:**
// 1. Score first, then justify
// 2. Be specific - cite exact lines or sections
// 3. No generic advice - only resume-specific feedback
// 4. Consider the entire 8000 characters for context
// 5. Return ONLY the JSON object, no additional text
// `;



// const prompt = `
// You are an expert ATS (Applicant Tracking System) analyzer and senior technical recruiter with 15+ years of experience evaluating resumes across software engineering, data science, product management, and technical roles.

// Your task is to conduct a RIGOROUS, REALISTIC evaluation. You must be STRICT and CRITICAL—most resumes have significant flaws.

// === SCORING FRAMEWORK (Be Harsh) ===
// - 95-100: EXCEPTIONAL. Top 1% resume. Flawless ATS optimization, quantified achievements, perfect keywords, clear progression, strong technical depth.
// - 85-94: EXCELLENT. Top 10%. Strong across all areas, minor polish needed.
// - 70-84: GOOD. Solid resume but noticeable gaps in impact, metrics, or ATS optimization.
// - 55-69: AVERAGE. Typical resume with weak points. Missing quantification, poor formatting, or keyword gaps.
// - 40-54: BELOW AVERAGE. Significant issues in multiple areas. Needs major revision.
// - Below 40: POOR. ATS-unfriendly, unclear experience, lacks professionalism.

// DEFAULT ASSUMPTION: Most resumes fall in the 50-70 range. Only award high scores when genuinely deserved.

// === EVALUATION CRITERIA (Weight Each) ===

// 1. ATS COMPATIBILITY & FORMATTING (20%)
//    ✓ Clean, parseable structure (no tables, columns, images, headers/footers)
//    ✓ Standard section headings (Experience, Education, Skills, Projects)
//    ✓ Consistent date formats, bullet points, and spacing
//    ✓ No unusual fonts, graphics, or complex layouts
//    ✓ Proper use of whitespace—not too dense or too sparse
//    ⚠ PENALIZE: Fancy formatting, text in images, unclear sections

// 2. KEYWORD OPTIMIZATION & SKILLS (20%)
//    ✓ Role-relevant technical keywords throughout (languages, frameworks, tools)
//    ✓ Skills section includes both hard and soft skills
//    ✓ Keywords naturally integrated in experience/projects (not just listed)
//    ✓ Industry-standard terminology and buzzwords where appropriate
//    ✓ Both specific technologies AND general competencies
//    ⚠ PENALIZE: Missing critical skills for target role, outdated technologies only, generic buzzwords without context

// 3. EXPERIENCE QUALITY & IMPACT (25%)
//    ✓ QUANTIFIED achievements (percentages, numbers, scale, time saved)
//    ✓ Action verbs at start of each bullet (Led, Architected, Reduced, Increased)
//    ✓ Clear business/technical impact, not just job duties
//    ✓ Progression shown (promotions, increasing responsibility)
//    ✓ Concise bullets (1-2 lines max), easy to scan
//    ⚠ PENALIZE HEAVILY: No metrics, vague descriptions ("responsible for", "worked on"), long paragraphs, only listing duties

// 4. PROJECTS SECTION (20%)
//    ✓ 2-4 strong technical projects with clear outcomes
//    ✓ Tech stack explicitly mentioned for each project
//    ✓ Problem solved, approach taken, and result achieved
//    ✓ Links to GitHub, live demos, or portfolios
//    ✓ Projects demonstrate skills mentioned in job descriptions
//    ⚠ PENALIZE HEAVILY: No projects section, vague project descriptions, missing tech details, trivial projects

// 5. STRUCTURE & CLARITY (10%)
//    ✓ Logical flow: Contact → Summary/Objective (optional) → Experience → Projects → Education → Skills
//    ✓ Most relevant info at top
//    ✓ Consistent formatting throughout
//    ✓ Easy to skim in 6 seconds (recruiter test)
//    ✓ 1 page for <5 years experience, 2 pages max for 10+ years
//    ⚠ PENALIZE: Poor organization, buried important info, overly long (3+ pages)

// 6. PROFESSIONALISM & LANGUAGE (5%)
//    ✓ No grammatical errors or typos
//    ✓ Professional tone, active voice
//    ✓ No personal pronouns (I, me, my)
//    ✓ Appropriate level of detail
//    ⚠ PENALIZE: Spelling errors, passive voice, unprofessional language, irrelevant personal info

// === KEYWORD ANALYSIS INSTRUCTIONS ===

// You MUST identify missing keywords based on:
// - The candidate's apparent target role (software engineer, data scientist, product manager, etc.)
// - Technologies/skills mentioned but underutilized
// - Industry-standard tools and frameworks commonly expected
// - Both technical keywords (languages, frameworks, tools) AND soft skills (leadership, collaboration, agile)

// Common keyword categories to check:
// - **Programming Languages**: Python, JavaScript, Java, C++, TypeScript, Go, Ruby, etc.
// - **Frontend**: React, Angular, Vue, HTML, CSS, Tailwind, Next.js, etc.
// - **Backend**: Node.js, Django, Flask, Spring Boot, Express, FastAPI, etc.
// - **Databases**: PostgreSQL, MongoDB, MySQL, Redis, DynamoDB, etc.
// - **Cloud/DevOps**: AWS, Azure, GCP, Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions, etc.
// - **Data Science/ML**: TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, Jupyter, etc.
// - **Tools & Platforms**: Git, Jira, Confluence, Figma, Postman, etc.
// - **Methodologies**: Agile, Scrum, REST APIs, Microservices, TDD, etc.
// - **Soft Skills**: Leadership, Cross-functional collaboration, Stakeholder management, etc.

// === ANALYSIS REQUIREMENTS ===

// STRENGTHS (Identify 3-5 specific strengths):
// - Point to SPECIFIC elements that work well
// - Reference exact sections or bullet points
// - Explain WHY each strength matters for ATS/recruiters
// - Example: "Strong quantification in experience section (e.g., 'Reduced API response time by 40%')"

// WEAKNESSES (Identify 3-5 critical weaknesses):
// - Be SPECIFIC and HONEST about what's missing or poor
// - Prioritize issues that hurt ATS parsing or recruiter screening
// - Don't sugarcoat—if it's weak, say so directly
// - Example: "Projects section lacks technical depth—no mention of frameworks, architectures, or challenges overcome"

// IMPROVEMENTS (Provide 4-6 actionable improvements):
// - Give EXACT steps to improve the resume
// - Prioritize high-impact changes first
// - Include examples or templates when possible
// - **MUST include at least 1-2 keyword-specific improvements**
// - Example: "Rewrite experience bullets to follow this format: '[Action verb] + [what you did] + [quantified result]'. Change 'Responsible for managing database' to 'Optimized PostgreSQL queries, reducing load time by 35% for 50K+ daily users.'"

// KEYWORDS TO ADD (Identify 5-10 missing keywords):
// - List specific technical skills, tools, frameworks, or methodologies missing from the resume
// - Focus on high-value keywords relevant to the candidate's target role
// - Include both technical AND soft skill keywords
// - Prioritize commonly searched ATS keywords
// - Format: "Keyword - Why it matters"
// - Example: "Docker & Kubernetes - Essential for modern DevOps roles, shows containerization expertise"

// === CRITICAL DEDUCTION RULES ===
// - No quantified achievements? Automatic -15 points
// - No projects section or weak projects? Automatic -10 points
// - Poor ATS formatting (tables, columns, graphics)? Automatic -15 points
// - Missing key technical skills for role? -10 points
// - Grammatical errors or typos? -5 points per error (max -15)
// - Experience bullets that are just duties, not impact? -10 points
// - Longer than 2 pages with <10 years experience? -5 points

// === OUTPUT REQUIREMENTS ===

// Return ONLY valid JSON. No markdown, no code blocks, no additional text.

// Structure:
// {
//   "score": <number between 0-100>,
//   "strengths": [
//     "Specific strength with concrete example from resume",
//     "Another specific strength with context",
//     "Third strength explaining why it's effective"
//   ],
//   "weaknesses": [
//     "Specific weakness with direct reference to section",
//     "Another critical weakness with impact explanation",
//     "Third weakness that needs addressing"
//   ],
//   "improvements": [
//     "Actionable improvement #1 with before/after example if possible",
//     "Actionable improvement #2 with specific instruction",
//     "Add missing keywords: [list 3-5 specific keywords] in your Skills section and naturally integrate them into experience bullets where applicable",
//     "Another actionable improvement with implementation guidance"
//   ]
// }

// Resume to analyze:
// ${resumeText.substring(0, 4000)}

// Begin your analysis. Be thorough, critical, and actionable. Ensure you identify specific missing keywords that would improve ATS matching.
// `;