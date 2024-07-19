"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactSignatureCanvas from "react-signature-canvas";
import { XCircleIcon } from "lucide-react";

const SignDoc = () => {
  const [sign, setSign] = useState("");
  const [canvas, setCanvas] = useState();

  const handleClear = () => {
    canvas.clear();
    setSign("");
  };

  const handleSave = () => {
    setSign(canvas.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Signature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Signature</DialogTitle>
          <DialogDescription>Draw to create a signature. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="relative mx-auto">
          <div className="bg-teal-100 border-teal-300 border-2 w-[300px] h-[300px]">
            <ReactSignatureCanvas
              penColor="teal"
              ref={(ref) => setCanvas(ref)}
              canvasProps={{ width: 300, height: 300, className: "sigCanvas" }}
            />
          </div>
          <div className="absolute top-0 left-0 flex gap-1 p-1 m-1 bg-white rounded-lg">
            <button onClick={handleClear}>
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignDoc;
