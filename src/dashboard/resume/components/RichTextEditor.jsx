import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { BrainCircuitIcon, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnItalic,
  Editor,
  Toolbar,
  EditorProvider,
  BtnBulletList,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModel";
import { toast } from "sonner";

const PROMPT = "Project Title {projectTitle}, Based on Project title give me 5 line summery of project";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
  setLoading(true);
  if (!resumeInfo.projects[index].title) {
    toast("Please Add Project Title!");
    setLoading(false);  // prevent loader freeze
    return;
  }

  try {
    const prompt = PROMPT.replace(
      "{projectTitle}",
      resumeInfo.projects[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);

    // THIS was your mistake ↓↓↓↓↓↓↓↓↓
    const apiText = await result.response.text();  // MUST await
    const resp = JSON.parse(apiText);              // Now valid

    const text =
      typeof resp?.summary === "string"
        ? resp.summary
        : Array.isArray(resp?.summary)
        ? resp.summary.join(" ")
        : JSON.stringify(resp?.summary);

    setValue(text.replace(/[*_]/g, ""));
  } catch (err) {
    console.error(err);
    toast.error("AI failed – try again later");
  }

  setLoading(false);
};

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          onClick={GenerateSummeryFromAI}
          variant="outline"
          size="sm"
          className=" border-amber-300 flex gap-2"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <BrainCircuitIcon />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
