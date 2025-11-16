import React from "react";

function EductionalPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.education.map((education, index) => {
        return (
          <div key={index} className="my-3">
            <h2
              className="text-sm font-bold"
              style={{
                color: resumeInfo.themeColor,
              }}
            >
              {education?.universityName}
            </h2>
            <h2 className="text-xs flex justify-between">
              {education?.degree} - {education?.cgpa}
              <span>Enddate-{education?.endDate}</span>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default EductionalPreview;
