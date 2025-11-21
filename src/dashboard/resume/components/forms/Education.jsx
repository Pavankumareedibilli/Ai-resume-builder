import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useDeferredValue, useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {

   const [loading,setLoading]=useState(false) ;
   const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params =useParams();
   const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      endDate: "",
      degree: "",
      cgpa: "",
    },
  ]);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        endDate: "",
        degree: "",
        cgpa: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));

  };
  const onSave = () => {
    setLoading(true);
    const data={
        data:{
            education:educationalList
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
  useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        education:educationalList
    })
  },[educationalList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-amber-200 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Educational Details </h2>
      <p>Fill up your Education Details</p>

      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 my-5 gap-3 border p-3 rounded-lg">
              <div>
                <label> University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label> Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label>CGPA</label>
                <Input name="cgpa" onChange={(e) => handleChange(e, index)} />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={AddNewEducation}
              variant="outline"
              className="text-amber-400"
            >
              +Add More Education
            </Button>
            <Button
              onClick={RemoveEducation}
              variant="outline"
              className="text-red-500"
            >
              -Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
