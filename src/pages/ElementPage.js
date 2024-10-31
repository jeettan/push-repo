import React from "react";
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import myData from '../backend/filedata.json'

function ElementPage(){

const { id } = useParams()

const id2 = `${id}.mp4`
var id3, id4;
   
for (var i=0; i<myData.length; i++){

  if (id2 == myData[i].File_title){

    id3 = myData[i].Video_title
    id4 = myData[i].Description
    break;
  }

}

return(

  <div className="watch">
    <h1> Enjoy watching..</h1>
    <div className="video">
  <ReactPlayer url={`/assets/${id2}`} height="500px" width= "500px" controls={true}></ReactPlayer>
  </div>
  <div>
  <h2>Filename: {id2} </h2>
  </div>
  <div>
  <h2>  {id3}</h2>
  </div>
  <div> {id4} </div>
  </div>

)
  
};

export default ElementPage;
