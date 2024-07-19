"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

const ClientPdfUploader = ({ signature }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [signaturePosition, setSignaturePosition] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfBytes = event.target.result;
        const pdfDoc = await PDFDocument.load(pdfBytes);
        setPdfDoc(pdfDoc);

        const keywords = pdfDoc.getKeywords();
        if (keywords && keywords.length > 0) {
          const customData = JSON.parse(keywords[0]);
          if (customData.signaturePosition) {
            setSignaturePosition(customData.signaturePosition);
          }
        }

        const pdfDataUrl = await pdfDoc.saveAsBase64({ dataUri: true });
        setPdfFile(pdfDataUrl);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleAddSignature = async () => {
    if (!pdfDoc || !signaturePosition || !signature) return;

    const page = pdfDoc.getPages()[0];
    const pngImage = await pdfDoc.embedPng(signature);
    const { width, height } = pngImage.scale(0.5);

    page.drawImage(pngImage, {
      x: signaturePosition.x,
      y: page.getHeight() - signaturePosition.y - height,
      width,
      height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "signed.pdf");
  };

  return (
    <div className="pdf-uploader">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div style={{ position: "relative" }}>
        {pdfFile && <embed src={pdfFile} type="application/pdf" width="600" height="800" />}
        {signaturePosition && (
          <img
            src={signature}
            alt="signature"
            style={{
              position: "absolute",
              top: `${signaturePosition.y}px`,
              left: `${signaturePosition.x}px`,
              cursor: "move",
              width: "100px",
              height: "50px",
              zIndex: 10
            }}
          />
        )}
      </div>
      <button onClick={handleAddSignature}>Add Signature and Download</button>
    </div>
  );
};

export default ClientPdfUploader;
