// src/components/Sidebar.jsx
import React from 'react';
import './components.css';

const Sidebar = ({ username = "", documents = [], onSelect, onNewDocument, onLogout }) => {
  return (
    <div className="sidebar">
      <button className="btn primary" onClick={onNewDocument}>New Document</button>
      <hr />
      <h3>Welcome Back!</h3>
      {documents.map((doc) => (
        <button
          key={doc.id}
          className="doc-button"
          onClick={() => onSelect(doc.id)}
        >
          {doc.title}
        </button>
      ))}
      <hr />
      <button className="btn danger" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
