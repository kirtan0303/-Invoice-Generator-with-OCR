# Canvas Invoice Generator with OCR

A full-stack web application that allows users to upload scanned receipts or images, extract invoice data using OCR (Tesseract.js), and store them in a MongoDB database for later viewing and analysis.

---

## Tech Stack

### Frontend
- React.js (with Hooks)
- Axios

### Backend
- Node.js + Express.js
- Tesseract.js (OCR Engine)
- Multer (File Upload Middleware)
- MongoDB (via Mongoose)

---

## Features

- Upload scanned receipts (PNG, JPG, etc.)
- Perform OCR (Optical Character Recognition) to extract invoice text
- Store and retrieve extracted invoice data
- View recent uploads in a scrollable dashboard
- MongoDB-based storage with timestamps

---

# Future Enhancements
PDF export of generated invoices

Parsing structured fields (vendor, amount, date) from raw text

Admin login with JWT

Analytics dashboard (weekly/monthly uploads)

Cloud deployment (Render, Vercel, or Heroku)

# License
This project is licensed under the MIT License.
