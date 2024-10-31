import React, { useState } from "react";
import axios from "axios";
import {useEffect} from 'react';
import {Link} from 'react-router-dom'
import myData from '../backend/filedata.json'

export default function Home(){

  function importAll(r) {
    return r.keys().map(r);
  }

  var listOfImages =[];
  var newImages = [];
  var thirdImages = []
  var fourthImages = []

  listOfImages = importAll(require.context('../backend/uploads', false, /\.(png|jpe?g|svg)$/));

  function removePrefixAndExtension(filePath) {
    // Regular expression to match `/static/media/` and everything after the dot
    const regex = /\/static\/media\/|(\..*)$/g;
    return filePath.replace(regex, '') + '.mp4';
  }

  function removePrefixAndExtension2(filePath) {
    // Regular expression to match `/static/media/` and everything after the dot
    const regex = /\/static\/media\/|(\..*)$/g;
    return filePath.replace(regex, '')
  }

  for (var i=0;i<listOfImages.length;i++){

    const newPath = removePrefixAndExtension(listOfImages[i])
    const newPath2 = removePrefixAndExtension2(listOfImages[i])
    newImages.push(newPath)
    fourthImages.push(newPath2)
  }

  for (var i =0; i<newImages.length;i++){

    for(var j =0; j<myData.length; j++){

      if(newImages[i] == myData[j].File_title){

        console.log(myData[j].Video_title)
        thirdImages.push(myData[j].Video_title)
      }

    }
  }

  console.log(fourthImages)


  return (<div><h1>Home</h1><div className="gallery">
     {listOfImages.map((main, index) => <div><Link to={`videos/${fourthImages[index]}`}><img key = {index} src= {main} title= {main} width="320px"height="240px" style={{boxShadow: "5px 5px 15px black", backgroundColor: "gray"}}/></Link><h2> {thirdImages[index]}</h2></div>)}
    </div></div>)
 
}