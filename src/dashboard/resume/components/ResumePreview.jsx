import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import React, { useContext } from 'react'
import PersonalDetailPreview from "./preview/PersonalDetailPreview"
import SummeryPreview from "./preview/SummeryPreview"
import ProjectsPreview from "./preview/ProjectsPreview"
import EductionalPreview from "./preview/EductionalPreview"
import SkillsPreview from "./preview/SkillsPreview"

function ResumePreview () {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]"
    style={{
        borderColor:resumeInfo?.themeColor
    }}
    >
        {/* personalDetails */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* summery */}
        <SummeryPreview resumeInfo={resumeInfo}/>
        {/* projects */}
        <ProjectsPreview resumeInfo={resumeInfo}/>
        {/* Educational detail */}
        <EductionalPreview resumeInfo={resumeInfo}/>
        {/* skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview
