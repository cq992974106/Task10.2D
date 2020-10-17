import React from 'react';
import { Input, Form,  message} from 'antd';
import 'antd/dist/antd.css';


const File_upload = (props)=>{
 var file3={};
 var Title = props.Title;
  function inputfile () {
    let file3 = document.querySelector('#input').files[0];
    if(file3){
      var reader = new FileReader();
            // into base64
          reader.readAsDataURL(file3);
          reader.onload = function(){
          // display img
          document.getElementById("file1_img").src = this.result;
          //console.log( reader.result)
          var fileData = reader.result;
          fetch('http://localhost:5000/upload', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
              Title:Title,
              imgData:fileData
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log("Error:" + err)
        })
    
        }
    }

  }

    return (
      <div className="homepage">
      <Form 
        id="form_test" 
        onSubmit={inputfile}  
        target="nm_iframe" 
        method="post" 
        enctype="multipart/form-data"
      >
        <iframe id="id_iframe" name="nm_iframe" style={{display:'none'}}></iframe>  
        <div id="img_div1">
          <img id="file1_img" src="" alt=""  width={300} height={300}/>
        </div>
        <div id="input_div1">
          Upload image(Do not upload files larger than 2M)
          <Input type="file" id="input" name="file1" accept="image/*" onChange={inputfile} ></Input>
          </div>
  
      </Form>
      </div>
    );
  }



export default File_upload;