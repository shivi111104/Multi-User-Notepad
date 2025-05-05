// src/pages/DocumentEditor.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Editor from "../components/Editor";
import "../styles/DocumentEditor.css";
import { fetchDocumentById, saveDocument } from "../services/api";

const DocumentEditor = () => {
  const [documentId, setDocumentId] = useState(null);
  const [content, setContent] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      if (documentId) {
        const doc = await fetchDocumentById(documentId);
        setContent(doc.content);
      } else {
        setContent("");
      }
    };

    fetchDocument();
  }, [documentId]);

  const handleSave = async () => {
    await saveDocument(documentId, content);
    alert("Document saved.");
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className={`document-editor ${isDarkMode ? "dark" : ""}`}>
      <Sidebar onSelectDocument={setDocumentId} />
      <div className="editor-panel">
        <Toolbar onSave={handleSave} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Editor content={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default DocumentEditor;
