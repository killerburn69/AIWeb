import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from "react"
function App() {
  const [image, setImage] = useState("")
  const handleSubmit = async(e)=>{
    e.preventDefault()
    // console.log("heloo")
    try {
      const res = await axios.post("https://reqres.in/api/users/",{name:"John", job:"ehllo"})
      console.log(res.data);
    } catch (error) {
      
    }
  }
  const previewAvatar = async (e)=>{
    const file = e.target.files[0]
    // file.preview = URL.createObjectURL(file)
    // setImage(file)
    const base64 = await converBase64(file)
    // console.log(base64.split(',')[1]);
    setImage(base64)
  }
  const converBase64 = (file)=>{
    return new Promise ((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = ()=>{
        resolve(fileReader.result);
      }
      fileReader.onerror = (error)=>{
        reject(error)
      }
    })
  }
  const removeImage = ()=>{
    setImage('')
  }
  return (
    <div className="App">
      <h1>Nhận dạng chữ tiếng việt viết tay</h1>
      <div className="file-upload">
        <h1 className="file-upload-btn">Add Image</h1>
        <form onSubmit={handleSubmit}>
          <div className='image-upload-wrap'>
            <input className="file-upload-input" type='file' onChange={previewAvatar}/>
            <div className="drag-text">
              <h3>Drag and drop a file or select add Image</h3>
            </div>
          </div>
          <div className={image ? "file-upload-content active" : "file-upload-content"}>
            {image && 
              <React.Fragment>
                <img className="file-upload-image" src={image} alt="your image" />
                <div className="image-title-wrap">
                  <button type="button" className="remove-image" onClick={removeImage}>Remove <span className="image-title">Uploaded Image</span></button>
                  <button type="submit" className="train-image">Training <span className="image-title">Uploaded Image</span></button>
                </div>
              </React.Fragment>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
