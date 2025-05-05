import React from 'react';
import './components.css';

const Toolbar = ({ onSave, onSummarize, onExport }) => {
  return (
    <div className="toolbar">
      <button className="btn success" onClick={onSave}>Save</button>
      <button className="btn info" onClick={onSummarize}>Summarize</button>
      <button className="btn export" onClick={onExport}>Export</button>
    </div>
  );
};

export default Toolbar;
