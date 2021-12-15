import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfRead = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <>
      <Document
        file="../../../../backend/public/files/papers-Pradumna Vatsa (MERN stack developer).pdf-1639029004415.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </>
  );
};

export default PdfRead;
