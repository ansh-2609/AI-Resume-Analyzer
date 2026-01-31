import {
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

function ResumePreview({
  resumes,
  selectedResume,
  setSelectedResume,
  progress,
  setProgress,
  onDownload,
  onFindJobs,
  onDelete
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Resume Preview
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* {resumes && resumes.map((resume) => {
          const isSelected = selectedResume?.id === resume.id;

          return (
            <div
              key={resume.id}
              onClick={() =>
                setSelectedResume({
                  id: resume.id,
                  name: resume.name,
                  score: resume.resume_score || 0,
                  strengths: resume.resume_feedback?.strengths || [],
                  weaknesses: resume.resume_feedback?.weaknesses || [],
                  improvements: resume.resume_feedback?.improvements || []
                })
              }
              className={`border rounded-lg p-4 cursor-pointer transition
                ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-start mb-2">
                <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {resume.name || 'Untitled Resume'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Uploaded {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {isSelected && progress && (
                <span className="text-sm text-gray-500">
                  <ClockIcon className="inline h-4 w-4 mr-1" />
                  {progress}
                </span>
              )}
            </div>
          );
        })} */}

         {resumes && resumes.map((resume) => {
            const isSelected = selectedResume?.id === resume.id;

            return (
                <div
                key={resume.id}
                onClick={() => {
                    const selected = {
                    id: resume.id,
                    name: resume.name,
                    score: resume.resume_score || 0,
                    strengths: resume.resume_feedback?.strengths || [],
                    weaknesses: resume.resume_feedback?.weaknesses || [],
                    improvements: resume.resume_feedback?.improvements || [],
                    };
                    setSelectedResume(selected);
                }}
                className={`border rounded-lg p-4 cursor-pointer transition
                            ${
                                isSelected
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:bg-gray-50"
                            }`}
                >
                <div className="flex items-start mb-3 flex-wrap">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-2 shrink-0" />
                    <div>
                    <h3 className="font-medium text-gray-900">
                        {resume.name || "Untitled Resume"}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Uploaded{" "}
                        {new Date(resume.created_at).toLocaleDateString()}
                    </p>
                    </div>
                </div>

                <div className="text-sm text-gray-600 whitespace-pre-line">
                    {/* {resume.raw_text?.substring(0, 200)}
                                {resume.raw_text?.length > 200 && "..."} */}
                    {isSelected && (
                    <span className="text-sm text-gray-500">
                        {(progress && <ClockIcon className="inline h-4 w-4 mr-1" />) || ""}
                        {progress || ""}
                    </span>
                    )}
                </div>
                </div>
            );
            })}
      </div>

      {selectedResume && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onDownload(selectedResume.id)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
          >
            Download
          </button>

          <button
            onClick={() => onFindJobs(selectedResume.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Find Jobs
          </button>

          <button
            onClick={() => onDelete(selectedResume.id)}
            className="col-span-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm"
          >
            Delete Resume
          </button>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;
