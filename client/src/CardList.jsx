import React,{useState,useEffect} from 'react'
import Card from './Card'
import './Card.css'
//import taskList from './taskList'
import Button from './Button'

function CardList (props)
{ 
  const [card, setCard] = useState({
    Title:'',
    Type:'',
    Question:'',
    Reward:'',
    Number:'',
  })

  const [img, setImg] = useState(''
  )

  const [info, setInfo] = useState(0
  )
  const [typeName, setType] = useState(''
  )
  const [question, setQuestion] = useState(''
  )
  //const [count, setCount] = useState(0);

 
  useEffect(() => {
    findTask();
}); 


  function deleteTask(Title){
    console.log(Title);
    fetch('http://localhost:5000/deleteTask', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        Title:Title
      })
  })
  .then(response => response.json())
  .then(data =>  {console.log(data);
  }
  )
  .catch(err => {
      console.log("Error:" + err)
  })

  if(Title===card.Title)
  {setInfo(0)}
  }
  
  function putImage(imgUrl){
    if(imgUrl!='')
    {return(<div>
       <div >
          <img  src={require('.'+imgUrl)} alt=""  width={300} height={300}/>
        </div>
      </div>
    )
    }
    else
    return(
    <div ></div>)
  }

  function findImg(Title){
    console.log(Title);
    fetch('http://localhost:5000/findImg', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        Title:Title
      })
  })
  .then(response => response.json())
  .then(data =>  { 
      setImg(data.imageUrl)
    
  }
  )
  .catch(err => {
      console.log("Error:" + err)
  })
  }


  function moreInfo(Title){
    fetch('http://localhost:5000/moreInfo', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        Title:Title
      })
  })
  .then(response => response.json())
  .then(data =>  {console.log(data);
    if(data.Type1 ==="on")
    {
      setType("Choice task")
      setQuestion(data.Question1);
      setImg('');
        }
    else if(data.Type2 ==="on")
    {
      setType("Decision-making task")
      setQuestion(data.Question2);
      setImg('');
    }
    else if(data.Type3 ==="on")
    {
      setType("Sentence-level task")
      setQuestion(data.Question3);
      setImg('');
    }
    else if(data.Type4 ==="on")
    {
      setType("Image task")
      setQuestion(data.Question4);
      findImg(Title);
    }

    setCard( {
      Title:data.Title,
      Type:typeName,
    Question:question,
    Reward:data.Reward,
    Number:data.Number,
    }
     )

  }
  )
  .catch(err => {
      console.log("Error:" + err)
  })
 
  setInfo(1);
  }

  function compareDate(taskDate,searchDate)
  {
    let task1=""+taskDate
    let task2=""+searchDate
    let year1=Number(task1.slice(1,4));
    let year2=Number(task2.slice(1,4));
    let month1=Number(task1.slice(6,7));
    let month2=Number(task2.slice(6,7));
    let day1=Number(task1.slice(9,10));
    let day2=Number(task2.slice(9,10));
    if(year1>=year2)
    {
      if(month1>=month2)
      {
        if(day1>=day2)
        {
          return true;
        }
      }
    }

  }
  function writeList(){  
    const filteredTask = taskList.filter((task)=>{
      if(compareDate(task.Expiry,props.searchDate)){
      return (task.Title.toLowerCase().includes(props.searchTask.toLowerCase())
      )
    } 
 
      })
  return (<div className='column'>
  {filteredTask.map((task) => 
  <div className='row_card'><div>
 <Card 
  key = {task.key}
  Title = {task.Title}
  Description = {task.Description}
  Expiry = {(task.Expiry)}
/>
 <div className='row_card'>  <Button 
  type = ''
  text='MoreInfo'
  onClick= {() =>moreInfo(task.Title)}
/>  <Button 
  type = ''
  text='Delete'
  onClick= {() =>deleteTask(task.Title)}
/>  
</div>
</div>

</div>
 
)}
  </div>
  )}

  function Info()
  {   if(info ===1)
      {return (<div class="row_card"><div class="column">
          <div><h1>Detail:</h1></div> 
        <div><h1>Title: {card.Title}</h1></div>  
          <div><h1>Type: {typeName}</h1></div> 
        <div><h1>Question:{question}</h1></div> 
        <div><h1>Reward:{card.Reward}</h1></div> 
        <div><h1>Number:{card.Number}</h1></div> 
            <div> {putImage(img)}</div>  
            </div>
            </div>
      )
  }
  }

    return (<div class='row'>
      {writeList()}
      {Info()}
      </div>);

}

var taskList = [];

function findTask(){
    taskList = [];
    var Type="Type_All";
    fetch('http://localhost:5000/findTask', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify({
          Type:Type
        })
    })
    .then(response => response.json())
    .then(data =>  {
        for(var i=0;i<data.length;i++){
            taskList.push(
                {
                    "key":i,
                    "Title":data[i].Title,
                    "Description":data[i].Description,
                    "Expiry":data[i].Expiry
                }
            )
    } 
    }
    )
    .catch(err => {
        console.log("Error:" + err)
    })
}
findTask()
//setInterval(findTask(),1000)


export default CardList