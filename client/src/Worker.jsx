import React, {useState,useEffect} from 'react';
import CardList from './CardList';
import Header from './Header';
const Worker = (props)=>{
const [searchTask , setsearchTask] = useState('')
const [searchDate , setsearchDate] = useState('')
const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 500);
  return () => clearInterval(id);
}, []);


function onSearchChangeByTitle(e)
{
  setsearchTask(e.target.value)
}

function onSearchChangeByDate(e)
{
  setsearchDate(e.target.value)
}


function getCardList(){
  return  <div><CardList 
  searchTask= {searchTask}
  searchDate = {searchDate}
/></div>
}

function workerPage(){
  return (
    <div>
    <div className='row'>
    <p>Search:</p>
      <input 
      onChange = {onSearchChangeByTitle}
      type="text"
      placeholder = "search by Title"
      value = {searchTask}
      />
         <p>Expiry date: </p>
        <input 
      onChange = {onSearchChangeByDate}
      type="Date"
      placeholder = "search by Date"
      value = {searchDate}
      />
   </div>
  
  {getCardList()}
     
    </div>
  )
}

return (
  <div>
  {workerPage()}
  </div>
)
}

export default Worker;