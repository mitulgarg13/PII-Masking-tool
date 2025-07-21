# 🔐 PII Masking Tool

A full-stack web application that allows users to upload images and returns a PII-masked version of the image. Built using **React.js** (frontend), **Express.js** (backend), and a mock setup for image processing.

---

## ✨ Features

- Drag-and-drop or click-to-upload image
- Loading spinner while masking is in progress
- Side-by-side view: original vs masked image
- Download masked image with one click
- Toast notifications for upload success/error
- Dark mode UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, react-dropzone, react-hot-toast
- **Backend:** Node.js, Express.js, Multer
- **Storage:** Local static file storage (mocked)
- **Other:** Vite, Axios

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pii-masking-tool.git
cd pii-masking-tool
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
node index.js
Runs the Express server on http://localhost:5000

Handles image uploads and returns a dummy masked image

3. Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
Starts the React app at http://localhost:5173

🚀 Usage
Start both backend and frontend servers

Open the app in your browser

Upload an image (drag & drop or click)

Wait for processing to finish

View and download the masked image

📦 Dependencies
Frontend:

react

vite

tailwindcss

axios

react-dropzone

react-hot-toast

Backend:

express

multer

cors

📝 Notes
This is a demo using a mocked masking step (masked.png). You can integrate real PII masking logic in the backend.

The masked image is served from the backend/uploads folder.

📸 Preview
<!-- Optional: Add a screenshot if you want -->

🧑‍💻 Author
Mitul Garg
Student, Full Stack Enthusiast

📄 License
MIT – Feel free to use and modify this for personal or academic use.

yaml
Copy
Edit

---
