const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB model
mongoose.connect('mongodb://localhost:27017/invoices', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const InvoiceSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);

const upload = multer({ dest: 'uploads/' });

// OCR endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await Tesseract.recognize(filePath, 'eng');
    const extractedText = result.data.text;

    const newInvoice = new Invoice({ text: extractedText });
    await newInvoice.save();

    fs.unlinkSync(filePath); // clean up
    res.json({ text: extractedText });
  } catch (err) {
    res.status(500).json({ error: 'OCR failed', details: err.message });
  }
});

// Fetch all invoices
app.get('/invoices', async (req, res) => {
  const invoices = await Invoice.find().sort({ date: -1 });
  res.json(invoices);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
