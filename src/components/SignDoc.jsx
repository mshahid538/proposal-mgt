"use client";

import { useState } from "react";
import Sign from "./fields/Sign";
import PdfUploader from "./PdfUploader";
import ClientPdfUploader from "./ClientInterface";
import AdminPdfUploader from "./AdminInterface";

const SignDoc = () => {
  const [signature, setSignature] = useState("");

  return (
    <div>
      <Sign setSign={setSignature} />
      {signature && (
        <>
          <PdfUploader signature={signature} />
          {/* <ClientPdfUploader signature={signature} /> */}
          {/* <hr /> */}
          {/* <AdminPdfUploader /> */}
        </>
      )}
    </div>
  );
};

export default SignDoc;
