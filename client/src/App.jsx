import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [maskedUrl, setMaskedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setMaskedUrl(null);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setMaskedUrl(res.data.maskedImageUrl);
      toast.success("Image masked successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while uploading.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = maskedUrl;
    link.download = "masked-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="w-full bg-gray-800 shadow-md p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-semibold">🏠 Home</div>
          <p className="text-sm text-gray-400 hidden sm:block">
            Built with React + Express
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="w-full flex justify-center px-4">
        <div className="w-full max-w-xl py-10 flex flex-col items-center gap-6">

          {/* Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-4">
            🔐 PII Masking Tool
          </h1>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="w-full border-2 border-dashed border-gray-600 p-6 text-center rounded-lg cursor-pointer hover:bg-gray-800 transition"
          >
            <input {...getInputProps()} />
            <p className="text-gray-300">
              {previewUrl
                ? "📷 File selected. Ready to upload."
                : "Drag & drop an image here, or click to select one"}
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 rounded-lg transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                Processing...
              </div>
            ) : (
              "Upload & Mask"
            )}
          </button>

          {/* Download Button */}
          {maskedUrl && (
            <button
              onClick={handleDownload}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition duration-200"
            >
              Download Masked Image
            </button>
          )}

          {/* Image Previews */}
          {(previewUrl || maskedUrl) && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {previewUrl && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Original Image:</p>
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="w-full rounded-md border border-gray-700 shadow"
                  />
                </div>
              )}
              {maskedUrl && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Masked Image:</p>
                  <img
                    src={maskedUrl}
                    alt="Masked"
                    className="w-full rounded-md border border-gray-700 shadow"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

