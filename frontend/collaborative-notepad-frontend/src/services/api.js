import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return response.data; // Should include token
};

export const register = async (email, username, password) => {
  const response = await axios.post(`${API_BASE}/auth/register`, { email, username, password });
  return response.data; // Should include token
};

export const fetchRevisions = (documentId) => {
  return axios.get(`${API_BASE}/revisions/${documentId}`);
};

export const postComment = (docId, commentText) => {
  return axios.post(`${API_BASE}/comments`, {
    documentId: docId,
    text: commentText,
  });
};

// ✅ Updated to handle create and update
export async function saveDocument(document) {
  const { id, title, content } = document;
  const method = id ? "PUT" : "POST";
  const endpoint = id ? `/documents/${id}` : `/documents`;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Save failed: " + errorText);
  }

  return response.json();
}

export async function fetchDocuments() {
  const response = await fetch(`${API_BASE}/documents`);
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  return response.json();
}

export async function fetchDocumentById(id) {
  const response = await fetch(`${API_BASE}/documents/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch document by ID");
  }
  return response.json();
}
