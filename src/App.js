import React, { useState } from "react";
import { Image } from "cloudinary-react";
import Axios from "axios";

const App = () => {
  const [image, setImage] = useState("");
  const [path, setPath] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    Axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    ).then((response) => {
      console.log(response.data.secure_url);
      setPath(response.data.secure_url);
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={uploadImage}>Upload Image</button>
      <Image
        style={{ width: 300 }}
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={path}
      />
    </div>
  );
};

export default App;
