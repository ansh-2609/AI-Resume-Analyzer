import React, { useState } from "react";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LightBulbIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const interviewData = [
  {
    id: 1,
    title: "Frontend Developer",
    level: "Mid-Level",
    skills: ["React", "JavaScript", "CSS", "REST APIs"],
    questions: [
      "Explain the virtual DOM in React.",
      "What are React hooks and why are they useful?",
      "How do you optimize a React application?",
      "Difference between controlled and uncontrolled components?",
    ],
    tips: [
      "Be ready to explain useEffect with real examples",
      "Show projects with reusable components",
      "Understand browser rendering basics",
    ],
  },
  {
    id: 2,
    title: "Backend Developer",
    level: "Junior–Mid",
    skills: ["Node.js", "Databases", "APIs", "Authentication"],
    questions: [
      "Difference between SQL and NoSQL databases?",
      "How does JWT authentication work?",
      "What is middleware in Express?",
      "How do you handle errors in APIs?",
    ],
    tips: [
      "Explain API design clearly",
      "Know basic system design",
      "Practice writing clean endpoints",
    ],
  },
  {
    id: 3,
    title: "Data Scientist",
    level: "Entry–Mid",
    skills: ["Python", "Machine Learning", "Statistics", "Pandas"],
    questions: [
      "Difference between supervised and unsupervised learning?",
      "Explain bias vs variance tradeoff",
      "How do you handle missing data?",
      "What metrics do you use to evaluate models?",
    ],
    tips: [
      "Explain models in simple language",
      "Know real-world use cases",
      "Brush up on statistics fundamentals",
    ],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    level: "Mid–Senior",
    skills: ["Docker", "CI/CD", "AWS", "Linux"],
    questions: [
      "What is CI/CD?",
      "Explain Docker vs Virtual Machines",
      "How do you monitor production systems?",
      "What is infrastructure as code?",
    ],
    tips: [
      "Be confident with command-line basics",
      "Explain deployment pipelines clearly",
      "Mention scalability & reliability",
    ],
  },
];

function InterviewPrep() {
  const [expandedJob, setExpandedJob] = useState(null);

  const toggleExpand = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Interview Preparation
          </h1>
          <p className="mt-2 text-gray-600">
            Prepare smarter with role-specific questions, skills, and tips
          </p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {interviewData.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl bg-white shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h2>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {job.level}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(job.id)}
                  className="flex items-center px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
                >
                  {expandedJob === job.id ? (
                    <>
                      <ChevronUpIcon className="h-4 w-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="h-4 w-4 mr-1" />
                      View Prep
                    </>
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedJob === job.id && (
                <div className="border-t bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Questions */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold mb-3">
                      <FireIcon className="h-5 w-5 text-red-500 mr-2" />
                      Common Questions
                    </h3>
                    <ul className="space-y-2">
                      {job.questions.map((q, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          • {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold mb-3">
                      <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      Interview Tips
                    </h3>
                    <ul className="space-y-2">
                      {job.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Focus Area */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      What Interviewers Look For
                    </h3>
                    <p className="text-sm text-gray-600">
                      Strong fundamentals, clear communication, real project
                      examples, and the ability to explain trade-offs. Be honest
                      about what you know and show eagerness to learn.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewPrep;
