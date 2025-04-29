import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await axios.get('http://localhost:5000/invoices');
    setInvoices(res.data);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('http://localhost:5000/upload', formData);
    fetchInvoices();
    alert('OCR Text:\n' + res.data.text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧾 Canvas Invoice Generator (OCR)</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload and Extract</button>

      <h3>Extracted Invoices</h3>
      <ul>
        {invoices.map((inv, idx) => (
          <li key={idx}>
            <pre>{inv.text.substring(0, 300)}...</pre>
            <small>{new Date(inv.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
