import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { Input } from "@/components/ui/input";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router";
import { toast } from "sonner";

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const {resumeId} = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true)
    const data ={
        data:{
            skills:skillsList
        }
    }
    GlobalApi.UpdateResumeDetail(resumeId,data)
    .then(resp=>{
        console.log(resp);
        setLoading(false);
        toast('Details Updated!')
    },(error)=>{
        setLoading(false);
        toast('Server Error, Try again!')
    })
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-amber-200 border-t-4 mt-10">
      <h2 className="font-bold text-lg"> Skills </h2>
      <p>Fill up your top Skills </p>

      <div>
        {skillsList.map((item, index) => {
          return (
            <div className="flex justify-between border rounded-lg p-5 mb-2">
              <div>
                <label className="text-sm">Name</label>
                <Input
                  className="w-full"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 140 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={AddNewSkills}
            variant="outline"
            className="text-amber-400"
          >
            +Add More Skills
          </Button>
          <Button
            onClick={RemoveSkills}
            variant="outline"
            className="text-red-500"
          >
            -Remove Skill
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
