import React, { useState } from 'react';
import './App.css';
import Requester from './Requester';
import Greeting from './Greeting'
import Worker from './Worker';
import './Header.css'

function App() {

  const [page,setPage] = useState('')

  function requesterPage(){
    setPage("requester");
  }

  function workerPage(){
    setPage("worker");
  }
  function pageRender(){
    if(page==="requester")
    {
      return (  <div>
   <Requester 
   />
        </div>
      )
    }
    else if (page==="worker")
    return(<div>
      <Worker />
    </div>)

  }

  return <div className= 'header-div'>
  <br></br>
  
  <br></br>
  <Greeting htext={page} />

  <div class="Header">
  <a class="title"  onClick = {requesterPage} >New Requester Task</a>
   <a class="title" onClick = {workerPage} >Worker Task</a>
 </div>
  {pageRender()}
  </div>
}

export default App;
