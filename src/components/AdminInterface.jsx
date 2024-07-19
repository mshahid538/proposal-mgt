"use client";

import React, { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const AdminPdfUploader = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const pdfContainerRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfBytes = event.target.result;
        const pdfDoc = await PDFDocument.load(pdfBytes);
        setPdfDoc(pdfDoc);

        const pdfDataUrl = await pdfDoc.saveAsBase64({ dataUri: true });
        setPdfFile(pdfDataUrl);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSaveSignaturePosition = async () => {
    if (!pdfDoc) return;

    const page = pdfDoc.getPages()[0];

    page.drawRectangle({
      x: signaturePosition.x,
      y: page.getHeight() - signaturePosition.y - 50,
      width: 100,
      height: 50,
      borderColor: rgb(1, 0, 0),
      borderWidth: 2,
    });

    const customData = JSON.stringify({
      signaturePosition: {
        x: signaturePosition.x,
        y: signaturePosition.y
      }
    });
    pdfDoc.setKeywords([customData]);

    // Save the updated PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "with_placeholder.pdf");
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = pdfContainerRef.current.getBoundingClientRect();
    setSignaturePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = pdfContainerRef.current.getBoundingClientRect();
      setSignaturePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="pdf-uploader">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div ref={pdfContainerRef} style={{ position: "relative", display: 'inline-block' }}>
        {pdfFile && <embed src={pdfFile} type="application/pdf" width="600" height="800" />}
        <div
          style={{
            position: "absolute",
            top: `${signaturePosition.y}px`,
            left: `${signaturePosition.x}px`,
            width: "100px",
            height: "50px",
            border: "2px dashed red",
            cursor: "move",
            pointerEvents: isDragging ? 'none' : 'all',
          }}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <button onClick={handleSaveSignaturePosition}>Save Signature Position</button>
    </div>
  );
};

export default AdminPdfUploader;
