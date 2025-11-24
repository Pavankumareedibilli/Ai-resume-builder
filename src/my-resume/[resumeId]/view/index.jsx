import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "./../../../../service/GlobalApi";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'My Resume',
      text: 'Check out my resume!',
      url: window.location.href,
    })
    .then(() => console.log('Shared successfully'))
    .catch((err) => console.error('Share failed:', err));
  } else {
    alert('Share API not supported in this browser.');
  }
};

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      
      <div className="no-print ">
        <Header />
        <div>
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Downlod or share your resume here
            </h2>
            <div className="flex justify-center gap-20 mt-5 ">
              <Button onClick={HandleDownload}>Download</Button>
              <Button onClick={handleShare}>Share</Button>

            </div>
          </div>
        </div>
      </div>
      <div  className="my-10 mx-10 md:mx-20 lg:mx-36 print-area">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
