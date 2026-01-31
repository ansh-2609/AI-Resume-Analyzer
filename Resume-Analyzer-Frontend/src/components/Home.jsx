// HomeSimple.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeSimple = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const isloggedIn = useSelector((state) => state.auth.isLoggedIn);

  // return (
  //   <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
  //     {/* Hero Section */}
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  //       <div className="text-center">
  //         <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
  //           AI Resume Analyzer
  //           <span className="block text-blue-600">Job Matching Platform</span>
  //         </h1>
  //         <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
  //           Upload your resume. Get matched with perfect jobs. Prepare for interviews.
  //           All powered by artificial intelligence.
  //         </p>
  //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //           <Link
  //             to="/register"
  //             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
  //           >
  //             Get Started Free
  //           </Link>
  //           <Link
  //             to="/demo"
  //             className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 transition-all duration-300 text-lg"
  //           >
  //             Watch Demo
  //           </Link>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Features */}
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  //       <div className="grid md:grid-cols-3 gap-8">
  //         {[
  //           {
  //             title: "Smart Resume Analysis",
  //             desc: "AI extracts skills, experience, and achievements from your resume automatically.",
  //             emoji: "📄"
  //           },
  //           {
  //             title: "Intelligent Job Matching",
  //             desc: "Get match scores and explanations for why you're a good fit for each job.",
  //             emoji: "🎯"
  //           },
  //           {
  //             title: "Interview Preparation",
  //             desc: "Generate personalized interview questions based on specific job requirements.",
  //             emoji: "💼"
  //           }
  //         ].map((feature, idx) => (
  //           <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
  //             <div className="text-4xl mb-4">{feature.emoji}</div>
  //             <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
  //             <p className="text-gray-600">{feature.desc}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>

  //     {/* CTA */}
  //     <div className="bg-linear-to-r from-blue-600 to-purple-600 py-20">
  //       <div className="max-w-4xl mx-auto px-4 text-center">
  //         <h2 className="text-4xl font-bold text-white mb-6">
  //           Ready to Transform Your Job Search?
  //         </h2>
  //         <p className="text-xl text-blue-100 mb-10">
  //           Join thousands who found their dream job faster with AI
  //         </p>
  //         <Link
  //           to="/register"
  //           className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl text-lg transition-all duration-300 transform hover:-translate-y-1"
  //         >
  //           Start Your Free Trial
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
  <div
    className={`min-h-screen px-4 py-8 lg:px-8 ${
      isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}
  >
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          AI Resume Analyzer
          <span className="block text-blue-600">
            Job Matching Platform
          </span>
        </h1>

        <p
          className={`text-xl mb-10 max-w-3xl mx-auto ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Upload your resume. Get matched with perfect jobs. Prepare for interviews.
          All powered by artificial intelligence.
        </p>
        
        {isloggedIn && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Get Started Free
            </Link>

            {/* <Link
              to="/demo"
              className={`font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl border-2 transition-all duration-300 text-lg ${
                isDark
                  ? "bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Watch Demo
            </Link> */}
          </div>
        )}
        
      </div>
    </div>

    {/* Features */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Smart Resume Analysis",
            desc: "AI extracts skills, experience, and achievements from your resume automatically.",
            emoji: "📄",
          },
          {
            title: "Intelligent Job Matching",
            desc: "Get match scores and explanations for why you're a good fit for each job.",
            emoji: "🎯",
          },
          {
            title: "Interview Preparation",
            desc: "Generate personalized interview questions based on specific job requirements.",
            emoji: "💼",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-4xl mb-4">{feature.emoji}</div>
            <h3
              className={`text-2xl font-bold mb-3 ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {feature.title}
            </h3>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    {/* <div className="bg-linear-to-r from-blue-600 to-purple-600 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Job Search?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Join thousands who found their dream job faster with AI
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl shadow-2xl text-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Start Your Free Trial
        </Link>
      </div>
    </div> */}
  </div>
);

};

export default HomeSimple;

