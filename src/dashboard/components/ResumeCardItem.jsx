import { Loader2Icon, MoreVertical, NotebookIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";
function ResumeCardItem({ resume, refreshData}) {
  const navigation = useNavigate();
  const[openAlert,setOpenAlert]=useState(false);
  const[loading,setLoading]=useState(false);

  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    },(error)=>{
      setLoading(false);
    })
  }
  return (
    <div>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="
        p-14 bg-gradient-to-t from-blue-200 via-gray-200 to-gray-400   py-24 border items-center flex justify-center 
        bg-secondary border-dashed rounded-lg cursor-pointer
         hover:scale-105 duration-200 transition h-[280px] hover:shadow-md"
        >
          <NotebookIcon />
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-2xl"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigation(`/my-resume/${resume.documentId}/view`);
              }}
            >
              view
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigation(`/my-resume/${resume.documentId}/view`);
              }}
            >
              download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> setOpenAlert(true)}>delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription> 
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=> setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disable={loading}
              
              >{loading?<Loader2Icon className="animate-spin"/>:'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
