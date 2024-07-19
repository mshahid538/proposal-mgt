"use client";

import React, { useState, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

const PdfUploader = ({ signature }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const pdfContainerRef = useRef(null);
  const signatureRef = useRef(null);

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

  const handleAddSignature = async () => {
    if (!pdfDoc || !signature) return;

    const page = pdfDoc.getPages()[0];
    const pngImage = await pdfDoc.embedPng(signature);
    const { width, height } = pngImage.scale(0.5);

    const pdfContainerRect = pdfContainerRef.current.getBoundingClientRect();
    const x = signaturePosition.x - pdfContainerRect.left;
    const y = pdfContainerRect.bottom - signaturePosition.y - height;

    page.drawImage(pngImage, {
      x: x,
      y: y,
      width,
      height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "signed.pdf");
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    signatureRef.current = { x: e.clientX - signaturePosition.x, y: e.clientY - signaturePosition.y };
  };

  const handleMouseMove = (e) => {
    if (isDragging && signatureRef.current) {
      setSignaturePosition({
        x: e.clientX - signatureRef.current.x,
        y: e.clientY - signatureRef.current.y,
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
      <div ref={pdfContainerRef} style={{ position: "relative" }}>
        {pdfFile && <embed src={pdfFile} type="application/pdf" width="600" height="400" />}
        {signature && (
          <img
            src={signature}
            alt="signature"
            draggable="false"
            style={{
              position: "absolute",
              top: signaturePosition.y,
              left: signaturePosition.x,
              cursor: "move",
              width: "100px",
              height: "auto",
            }}
            onMouseDown={handleMouseDown}
          />
        )}
      </div>
      <button onClick={handleAddSignature}>Add Signature and Download</button>
    </div>
  );
};

export default PdfUploader;
