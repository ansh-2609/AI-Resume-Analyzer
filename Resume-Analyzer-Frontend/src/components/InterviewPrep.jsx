import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  BriefcaseIcon,
  ArrowRightIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import InterviewPrepDetail from "./InterviewPrepDetail";
import { fetchInterviewQuestions } from "../services/appServices";
import { setQuestions } from "../store/interviewQuestionsSlice";

const jobs = [
  {
    id: "frontend",
    title: "Frontend Developer",
    level: "Mid-Level",
    description: "React, UI, performance, accessibility",
  },
  {
    id: "backend",
    title: "Backend Developer",
    level: "Junior–Mid",
    description: "APIs, databases, auth, scalability",
  },
  {
    id: "data",
    title: "Data Scientist",
    level: "Entry–Mid",
    description: "ML, stats, data analysis",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    level: "Mid–Senior",
    description: "CI/CD, cloud, monitoring",
  },
];

function InterviewPrep() {
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();

  if (selectedJob) {
    return (
      <InterviewPrepDetail
        jobTitle={selectedJob}
        onBack={() => setSelectedJob(null)}
      />
    );
  }

  const handleSelectJob = async(jobTitle) => {

    const response = await fetchInterviewQuestions(jobTitle);
    console.log('Interview Questions for', jobTitle, ':', response);
    dispatch(setQuestions(response));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Interview Preparation</h1>
        <p className="text-gray-600 mb-8">
          Choose a role to start your interview prep
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => {
                handleSelectJob(job.title.toLowerCase());
                setSelectedJob(job.title);
              }}
            >
              <div className="flex items-center mb-3">
                <BriefcaseIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">{job.title}</h2>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {job.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                  {job.level}
                </span>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewPrep;
