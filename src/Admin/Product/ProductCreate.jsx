  import React, { useState } from "react";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { storage } from "../../firebase";

  function ProductCreate() {
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const uploadFiles = async () => {
      const urls = [];

      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `/mulitpleFiles/${images[i].name}`);

        await uploadBytes(imageRef, images[i])
          .then(async () => {
            // Get the download URL for the uploaded image
            const url = await getDownloadURL(imageRef);
            urls.push(url);
            console.log("Success");
          })
          .catch((error) => {
            console.error("Error", error);
          });
      }

      // Update the state with the array of download URLs
      setImageUrls(urls);
      console.log(imageUrls);
    };

    console.log(images);

    return (
      <div className="App">
        <input
          type="file"
          multiple
          onChange={(event) => {
            setImages(event.target.files);
          }}
        />

        <button onClick={uploadFiles}>Submit</button>
      </div>
    );
  }

  export default ProductCreate;
