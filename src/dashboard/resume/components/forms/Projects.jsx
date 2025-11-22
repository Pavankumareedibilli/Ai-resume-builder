import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
const formField = {
  title: "",
  techStack: "",
  workSummery: "",
};

function Projects() {

  const [loading,setLoading] = useState(false);
  const [projectList, setProjectList] = useState([formField]);
const params =useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, event) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };
  const AddNewProjectList = () => {
    setProjectList([...projectList, { ...formField }]);
  };

  const RemoveProject = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = projectList.slice();
    newEntries[index][name] = e.target.value;
    setProjectList(newEntries);
  };
 const onSave = () => {
    setLoading(true);
    const data={
        data:{
            projects:projectList
        }
    }
    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
        console.log(resp);
        setLoading(false);
        toast('Details Updated!');
    },(error)=>{
        setLoading(false);
        toast('Server Error, Please try again!');
    })
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      projects: projectList,
    });
  }, [projectList]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-amber-200 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Project Details </h2>
        <p>Fill up your project details</p>
        <div>
          {projectList.map((item, index) => {
            return (
              <div
                key={index}
                className=" grid grid-cols-2  gap-3 border p-3 my-5 rounded-lg"
              >
                <div>
                  <label className="text-xs">Project Title</label>
                  <Input
                    name="title"
                    value={item.title}
                    onChange={(event) => handleChange(index, event)}
                   
                  />
                </div>
                <div>
                  <label className="text-xs ">Tech Stack</label>
                  <Input
                    name="techStack"
                    value={item.techStack}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                   index={index}
                    onRichTextEditorChange={(event) => {
                      handleRichTextEditor(event, "workSummery", index);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={AddNewProjectList}
              variant="outline"
              className="text-amber-400"
            >
              +Add More Projects
            </Button>
            <Button
              onClick={RemoveProject}
              variant="outline"
              className="text-red-500"
            >
              -Remove
            </Button>
          </div>
           <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className="animate-spin"/>:'save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
