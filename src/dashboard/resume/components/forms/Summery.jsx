import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import GlobalApi from "./../../../../../service/GlobalApi";
import { BrainCircuitIcon, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);

  const params = useParams();

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
    </div>
  );
}

export default Summery;
