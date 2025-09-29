import { Ghost, PlusSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddResume = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
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
              <Input className="my-2" placeholder="Ex. FullStack Resume" />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={()=>setOpenDialog(false)} variant={Ghost}>Cancel</Button>
              <Button>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
