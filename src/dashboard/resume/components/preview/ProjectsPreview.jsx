import React from "react";
function ProjectsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.projects.map((projects, index) => (
        <div key={index} className="my-3">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo.themeColor,
            }}
          >
            {projects?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {projects?.techStack}
          </h2>
          <p className="text-xs my-2">{projects.workSummery}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPreview;
