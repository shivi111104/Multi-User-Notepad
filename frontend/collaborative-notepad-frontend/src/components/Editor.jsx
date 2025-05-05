// src/components/Editor.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  saveDocument,
  fetchDocuments,
  fetchDocumentById
} from "../services/api";
import "./components.css";

const Editor = () => {
  const [content, setContent] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [title, setTitle] = useState("Untitled Document");
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Only save if editing an existing document
      if (selectedDocId && title.trim() && content.trim()) {
        handleSave(false);
      }
    }, 2000); // auto-save every 10 seconds
    return () => clearInterval(interval);
  }, [title, content, selectedDocId]);

  const loadDocuments = async () => {
    try {
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error("Failed to load documents:", err);
    }
  };

  const handleChange = (e) => setContent(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSave = async (showAlert = true) => {
    try {
      // Prevent saving new docs with no ID unless user explicitly saves
      if (!selectedDocId && !showAlert) return;
  
      const docPayload = {
        id: selectedDocId,
        title,
        content,
      };
  
      const saved = await saveDocument(docPayload);
  
      // If this was a new document (manual save), update the selected ID
      if (!selectedDocId && saved.id) {
        setSelectedDocId(saved.id);
      }
  
      showAlert && alert("✅ Document saved!");
      loadDocuments();
    } catch (error) {
      console.error("Save error:", error);
      showAlert && alert("❌ Save failed.");
    }
  };

  const handleFormat = (style) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText = content;
    if (style === "bold") {
      newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
    } else if (style === "italic") {
      newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
    } else if (style === "underline") {
      newText = content.substring(0, start) + `__${selectedText}__` + content.substring(end);
    }

    setContent(newText);
  };

  const handleDocumentSelect = async (e) => {
    const docId = e.target.value;
    setSelectedDocId(docId);
    try {
      const doc = await fetchDocumentById(docId);
      setTitle(doc.title);
      setContent(doc.content);
    } catch (err) {
      console.error("Failed to fetch document:", err);
    }
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.md`;
    link.click();
  };

  const handleExportPDF = () => {
    const html = `
      <html>
        <head><title>${title}</title></head>
        <body><pre>${content}</pre></body>
      </html>
    `;
    const blob = new Blob([html], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.pdf`;
    link.click();
  };

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <div className="format-buttons">
          <button onClick={() => handleFormat("bold")} className="btn-format">Bold</button>
          <button onClick={() => handleFormat("italic")} className="btn-format">Italic</button>
          <button onClick={() => handleFormat("underline")} className="btn-format">Underline</button>
        </div>

        <select value={selectedDocId || ""} onChange={handleDocumentSelect} className="dropdown">
          <option value="">📄 Load Document</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.title}
            </option>
          ))}
        </select>

        <button onClick={() => setPreview((prev) => !prev)} className="btn-toggle">
          {preview ? "✏️ Edit Mode" : "👁️ Preview"}
        </button>

        <button onClick={handleSave} className="btn-save">💾 Save</button>
        <button onClick={handleExportMarkdown} className="btn-export">⬇️ .md</button>
        <button onClick={handleExportPDF} className="btn-export">⬇️ .pdf</button>
      </div>

      <div className="editor-title">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter document title..."
        />
      </div>

      <div className="editor-body">
        {preview ? (
          <div className="preview-pane">
            <pre>{content}</pre>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            placeholder="Start typing..."
          />
        )}
      </div>
    </div>
  );
};

export default Editor;
