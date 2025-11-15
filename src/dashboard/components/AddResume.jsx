import { Ghost, Loader2, PlusSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeid: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center 
        bg-secondary border-dashed border-gray-400 rounded-lg cursor-pointer
         hover:scale-105 duration-200 transition h-[280px] hover:shadow-md"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume!</DialogTitle>
            <DialogDescription>
              <p>Enter Name of your Resume</p>
              <Input
                className="my-2"
                placeholder="Ex. FullStack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant={Ghost}>
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>
               {loading?<Loader2 className="animate-spin"/>:'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
