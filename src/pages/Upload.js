import React from 'react'
import { useEffect } from 'react'
import { createRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function helloWorld() {

  console.log("Hello world")
}

export default function Upload() {

  const fileInput = createRef()
  const videoTitle = createRef()
  const textArea = createRef()
  

  const navigate = useNavigate();

  function handleSubmit(event) {
    
   navigate('/redirect')

    event.preventDefault();

    let formData = new FormData()
    var file = fileInput.current.files[0]
    formData.set("avatar", file);

    var JSONdata = {
      "File_title": file.name,
      "Video_title": videoTitle.current.value,
      "Description": textArea.current.value
    }

    var JSONdata2 = JSON.stringify(JSONdata)

    axios({
      method: "post",
      url: "/video",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) { console.log(response); alert("Video uploaded successfully") }).catch(function (error) {
      console.log(error.toJSON());
    });

    axios({
      method: "post",
      url: "/json",
      data: JSONdata2,
      headers: { "Content-Type": 'application/json' },
    }).then(function (response) { console.log(response); alert("Title/Descriptions updated") }).catch(function (error) {
      console.log(error.toJSON());
    });

    helloWorld()

  }

  return (
    <div className="upload"><h1>Upload your files here</h1>
      <form onSubmit={handleSubmit}>
        <ul className="wrapper">
          <li className="form-row">
            <input type="file" accept=".mp4" ref={fileInput} required></input>
          </li>
          <li className="form-row">
            <label> Title: </label>
            <input type="text" ref={videoTitle} required></input>
          </li>
          <li className="form-row">
            <label> Description: </label>
            <textarea rows="8" name="description" cols="50" ref={textArea} required></textarea><br />
          </li>
          <li className="form-row">
            <input type="submit" value="Upload"></input>
          </li>
        </ul>
      </form>
    </div>
  )
}