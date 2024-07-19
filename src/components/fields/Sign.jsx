"use client";

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import SignatureCanvas from "react-signature-canvas";

const Sign = ({ setSign }) => {
  const [canvas, setCanvas] = useState();

  const handleClear = () => {
    canvas.clear();
    setSign("");
  };

  const handleSave = () => {
    setSign(canvas.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <div className="relative">
      <div className="bg-teal-100 border-teal-300 border-2 w-[300px] h-[300px]">
        <SignatureCanvas
          penColor="teal"
          ref={(ref) => setCanvas(ref)}
          canvasProps={{ width: 300, height: 300, className: "sigCanvas" }}
        />
      </div>
      <div className="absolute top-0 left-0 flex gap-1 p-1 m-1 bg-white rounded-lg">
        <button onClick={handleClear}>
          <XCircleIcon className="w-6 h-6" />
        </button>
        <button onClick={handleSave}>
          <CheckCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Sign;
