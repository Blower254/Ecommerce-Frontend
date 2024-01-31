import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import Loading from "../../Client/Loading/Loading";
import { toast } from "react-toastify";
import './ProductCreate.css';

function ProductCreates() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    // Convert FileList to an array
    const filesArray = Array.from(files);

    setImages(filesArray);

    // Trigger Formik's setFieldValue to validate the "images" field
    event.currentTarget.form.dispatchEvent(new Event("submit", { cancelable: true }));
  };

  const initialValues = {
    title: "",
    price: "",
    description: "",
    category: "",
    rating: {
      rate: 0,
      count: 0,
    },
    images: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().max(50, "Max 50 characters").required("Title is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    rating: Yup.object().shape({
      rate: Yup.number().required("Rating is required"),
      count: Yup.number().required("Rating Count is required"),
    }),
    
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
     
      setIsLoading(true);

         if (isLoading) {
            console.log("Please wait, form is still processing...");
            return;
          }
      
      const urls = await Promise.all(
        images.map(async (image) => {
          try {
            // Create a folder structure using title and category
            const folderPath = `/products/${values.category}/${values.title}`;
            const imageRef = ref(storage, `${folderPath}/${image.name}`);
  
            await uploadBytes(imageRef, image);
            
            toast.success("Upload Success!");

            return getDownloadURL(imageRef);
          } catch (error) {
            console.error("Error during file upload:", error);
            throw error; // Propagate the error for handling in the main try-catch block
          }
        })
      );
  
      // Append image URLs to form data
      const formData = { ...values, images: urls };
  
      // Assuming you have a function like setFormData to update the form state
      console.log("Form data:", formData);
      // Use 'formData' to update your form state or perform other actions
  
      // Example: Using Axios to submit the form data to a server
      await axios.post("https://ecommerce-api-k87g.onrender.com/api/products", formData);
  
      // Reset form and state after successful submission
      resetForm();
      setImages([]);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="App create-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {isLoading ? 
        <div className="product-create-loading-overlay">
          <Loading/> 
        </div>
        : 
        <div className="product-create-component">
        <Form className='product-create-form'>
        <div className="form-floating mb-3">

          <label htmlFor="title">Title:</label>
          <Field type="text" id="title" name="title" className='form-control' />
          <ErrorMessage name="title" component="div" />
        </div>
        <div className="form-floating mb-3">

          <label htmlFor="price">Price:</label>
          <Field type="text" id="price" name="price"  className='form-control'/>
          <ErrorMessage name="price" component="div" />
          </div>
        <div className="form-floating mb-3">

          <label htmlFor="description">Description:</label>
          <Field as="textarea" id="description" name="description"  className='form-control'/>
          <ErrorMessage name="description" component="div" />
          </div>
        <div className="form-floating mb-3">

          <label htmlFor="category">Category:</label>
          <Field type="text" id="category" name="category" className='form-control'/>
          <ErrorMessage name="category" component="div" />
          </div>
        <div className="form-floating mb-3">

          <label htmlFor="rating.rate">Rating:</label>
          <Field type="number" id="rating.rate" name="rating.rate" className='form-control'/>
          <ErrorMessage name="rating.rate" component="div" />
          </div>
        <div className="form-floating mb-3">

          <label htmlFor="rating.count">Rating Count:</label>
          <Field type="number" id="rating.count" name="rating.count" className='form-control'/>
          <ErrorMessage name="rating.count" component="div" />
          </div>

          <input
            type="file"
            multiple
            name="images"
            onChange={handleFileChange}
          />
          <ErrorMessage name="images" component="div" />
          
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </Form>
        <div className="image-priview-container">
              <h2>Selected Images:</h2>
             <div className="image-priview-container">
              {images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} className="image-priview" alt={`Preview ${index}`} />
              ))}
            </div>
           </div>
        </div>
      }
      </Formik>
    </div>
  );
}

export default ProductCreates;
