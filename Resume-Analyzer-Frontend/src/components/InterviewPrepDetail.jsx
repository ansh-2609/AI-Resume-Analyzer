import React from "react";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  LightBulbIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const interviewContent = {
  frontend: {
    title: "Frontend Developer",
    questions: [
      {
        q: "What is the Virtual DOM in React?",
        answer:
          "The Virtual DOM is a lightweight JavaScript representation of the real DOM. React compares the Virtual DOM with a previous version using a diffing algorithm and updates only the changed parts in the real DOM, improving performance.",
        interviewerLooksFor: [
          "Understanding of React internals",
          "Performance awareness",
          "Clear explanation",
        ],
        tip: "Mention reconciliation and diffing for extra points.",
      },
      {
        q: "What are React hooks?",
        answer:
          "Hooks are functions that let you use state and lifecycle features in functional components. Examples include useState for state management and useEffect for side effects.",
        interviewerLooksFor: [
          "Knowledge of modern React",
          "Ability to explain hooks use-cases",
        ],
        tip: "Explain when NOT to use useEffect.",
      },
    ],
  },

  backend: {
    title: "Backend Developer",
    questions: [
      {
        q: "How does JWT authentication work?",
        answer:
          "JWT authentication works by issuing a signed token after login. The client sends this token with each request, and the server verifies it without storing session data.",
        interviewerLooksFor: [
          "Security fundamentals",
          "Stateless authentication understanding",
        ],
        tip: "Explain access vs refresh tokens if asked.",
      },
    ],
  },
};

function InterviewPrepDetail({ jobTitle, onBack }) {
//   const job = interviewContent[jobId];

   const job = useSelector((state) => state.interviewQuestions.questions);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-sm mb-6 text-blue-600 hover:underline"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to jobs
        </button>

        <h1 className="text-3xl font-bold mb-6">
          {jobTitle} Interview Prep Questions
        </h1>

        <div className="space-y-6">
          {job.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-3">
                Q{index + 1}. {item.question}
              </h2>

              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> {item.answer}
              </p>

              <div className="mb-4">
                <h4 className="flex items-center font-medium mb-2">
                  <FireIcon className="h-4 w-4 text-red-500 mr-1" />
                  Interviewer is looking for
                </h4>
                <ul className="space-y-1">
                  {item.goals.map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <h4 className="flex items-center text-sm font-semibold mb-1">
                  <LightBulbIcon className="h-4 w-4 mr-1 text-blue-600" />
                  Pro Tip
                </h4>
                <p className="text-sm text-blue-800">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewPrepDetail;


