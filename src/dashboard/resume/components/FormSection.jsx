import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLineIcon, ArrowRight, Flag, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext]= useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme{" "}
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeftFromLineIcon />
            </Button>
          )}

          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personalDetails */}
      {activeFormIndex == 1 ? <PersonalDetails  enableNext={(v)=>setEnableNext(v)}/> : activeFormIndex==2?
      <Summery enableNext={(v)=>setEnableNext(v)} />:null}
      

      {/* projects */}

      {/* Educational details */}

      {/* skills */}
    </div>
  );
}

export default FormSection;
