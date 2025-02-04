"use client";

import FileUpload from "../../components/upload/UploadFile";

const UploadPage = () => {
  return (
    <div>
        <h1 className="text-4xl font-bold mb-6">Gestion des Médias</h1>
        <FileUpload />
    </div>
  );
};

export default UploadPage;
