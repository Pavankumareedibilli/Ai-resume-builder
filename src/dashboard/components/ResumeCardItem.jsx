import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
function ResumeCardItem ({resume})  {
  return (
    <Link to={`/dashboard/resume/${resume.resumeid}/edit`} >
        <div className='p-14 py-24 border items-center flex justify-center 
        bg-secondary border-dashed border-gray-400 rounded-lg cursor-pointer
         hover:scale-105 duration-200 transition h-[280px] hover:shadow-md'>
            <NotebookIcon/>
        </div>
        <h2 className='my-1 text-center'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem
