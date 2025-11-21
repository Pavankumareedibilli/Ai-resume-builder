import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "./../../../../../service/GlobalApi";
import { BrainCircuitIcon, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AIModel";

const prompt = `
You must respond with VALID JSON ONLY.

Return an ARRAY with exactly 3 objects for:
- Fresher
- Mid-level
- Experienced

Each object must have this exact structure:

{
  "experienceLevel": "Fresher | Mid-level | Experienced",
  "summery": "4-5 line resume summary based on the job title"
}

Job Title: {jobTitle}

Do NOT include any text outside the JSON array.
`;


function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();

  useEffect(() => {
    summery &&
      setResumeInfo(
        {
          ...resumeInfo,
          summery: summery,
        },
        [summery]
      );
  });

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummeryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Details Updated!");
      },
      (error) => {
        setLoading(false);
        toast('Server Error, Please try again!');
        
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-amber-200 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery </h2>
        <p>Add summery for your job title</p>

        <form className="mt-5" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label> Add summery </label>
            <Button
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              variant="outline"
              className="border-amber-300 flex gap-2"
            >
              <BrainCircuitIcon />
              Generate From AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="flex mt-2 justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "save"}
            </Button>
          </div>
        </form>
      </div>
      <div>
        {aiGeneratedSummeryList && (
          <div>
            <h2 className="font-bold text-lg">Suggestions</h2>

            {aiGeneratedSummeryList.map((item, index) => {
             return( <div>
                <h2 className="font-bold my-1">
                  Level : {item?.experienceLevel}
                </h2>
                <p>{item?.summery}</p>
              </div>);
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Summery;
