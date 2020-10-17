import React,{useState} from 'react'
import Input from './Input'
import Button from './Button'
import './App.css'

import Tip from './Tip'

import File_upload from './File_upload'

//
const Requester = (props)=>{
  

    const [contact, setContact] = useState({
        Type1:'',
        Type2:'',
        Type3:'',
        Type4:'',
        Title: '',
        Description: '',
        Expiry: '',
        Question1:'', //1,2,3,4 mean the type of the question
        Question2:'',
        Question3:'',
        Question4:'',
        Answer1:'',  //1,2,3 mean the option answer for the question type1
        Answer2:'',
        Answer3:'',
        MasterYes:'',
        MasterNo:'on',
        Reward:'',
        Number:''
    })
    const handleChange = (event)=>{
        const {id, value} = event.target
        setContact ((preValue)=>{  
            if(id ==='Type1' ||id ==='Type2'||id ==='Type3'||id ==='Type4')
        return {
        ...preValue,
        Type1:'',
        Type2:'',
        Type3:'',
        Type4:'',
        [id]: value
        }
        else if (id ==='MasterYes'||id ==='MasterNo')
        return{
            ...preValue,
            MasterYes:'',
            MasterNo:'',
            [id]: value
        }
        else 
        return{
            ...preValue,
            [id]: value
        }
        })
    }

    function typeSet(Type1, Type2,Type3,Type4)
    {
        if (Type1 ==="on")
        return ( <div>
            <div class='row'><label>Question:</label> <Input 
             id='Question1'
             name= 'Question1'
             type= 'text'
             placeholder ='Enter task Question'
             onChange = {handleChange}
             value = {contact.Question1}
            /></div>
            <div class='row'><label>Answer1:</label> <Input 
             id='Answer1'
             name= 'Answer1'
             type= 'text'
             placeholder ='Enter task Answer1'
             onChange = {handleChange}
             value = {contact.Answer1}
            /></div>
             <div class='row'><label>Answer2:</label> <Input 
             id= 'Answer2'
             name= 'Answer2'
             type= 'text'
             placeholder ='Enter task Answer2'
             onChange = {handleChange}
             value = {contact.Answer2}
            /></div>
             <div class='row'><label>Answer3:</label> <Input 
             id= 'Answer3'
             name= 'Answer3'
             type= 'text'
             placeholder ='Enter task Answer3'
             onChange = {handleChange}
             value = {contact.Answer3}
            /></div>
            </div>
        )
        else if (Type2 ==="on")
        return (<div>
            <div class='row'><label>Question(Ture or False?):</label> <Input 
             id='Question2'
             name= 'Question2'
             type= 'text'
             placeholder ='Enter task Question'
             onChange = {handleChange}
             value = {contact.Question2}
            /></div>
            </div>
        )
        else if (Type3 ==="on")
        return (<div>
            <div class='row'><label>Question(sentences answer):</label> <Input 
             id='Question3'
             name= 'Question3'
             type= 'text'
             placeholder ='Enter task Question'
             onChange = {handleChange}
             value = {contact.Question3}
            /></div>
            </div>
        )
        else if (Type4 ==="on")
        return (<div>
             <div class='row'><label>Question(for image):</label> <Input 
             id='Question4'
             name= 'Question4'
             type= 'text'
             placeholder ='Enter task Question'
             onChange = {handleChange}
             value = {contact.Question4}
            /></div>
             <File_upload Title={contact.Title}/>
            </div>
        )
        else
        {
            return (<div>
                <p>Select the type</p>
            </div>
            )
        }
    }

    
    const handleSubmit = ()=>{
        fetch('http://localhost:5000/submit', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                Type1 : contact.Type1,
                Type2: contact.Type2,
                Type3: contact.Type3,
                Type4: contact.Type4,
                Title: contact.Title,
                Description: contact.Description,
                Expiry: contact.Expiry,
                Question1: contact.Question1,
                Question2: contact.Question2,
                Question3: contact.Question3,
                Question4: contact.Question4,
                Answer1: contact.Answer1,
                Answer2: contact.Answer2,
                Answer3: contact.Answer3,
                MasterYes: contact.MasterYes,
                MasterNo: contact.MasterNo,
                Reward: contact.Reward,
                Number: contact.Number,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log("Error:" + err)
        })
    }


    
return (<div >
 

    
    <div class="row"><label>Select Task Type:</label>
        <div  class="row"><Input 
       id ='Type1'
       name= 'Type'
       type= 'radio'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Type1}
       />Choice task
        <Input 
        id ='Type2'
       name= 'Type'
       type= 'radio'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Type2}
       />Decision-making task
        <Input 
        id ='Type3'
       name= 'Type'
       type= 'radio'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Type3}
       />Sentence-level task
          <Input 
        id ='Type4'
       name= 'Type'
       type= 'radio'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Type4}
       />Image task
        </div>
        </div>
    <Tip text='Describe your task to Workers'/>
    <div class='row'><label>Title:</label> <Input 
       id ='Title'
       name= 'Title'
       type= 'text'
       placeholder ='Enter task title'
       onChange = {handleChange}
       value = {contact.Title}
       /></div>
    <div class='row'><label>Description:</label> <Input 
        id ='Description'
       name= 'Description'
       type= 'text'
       placeholder ='Enter task Description'
       onChange = {handleChange}
       value = {contact.Description}
       /></div>
    <div class='row'><label>Expiry Data:</label> <Input 
        id ='Expiry'
       name= 'Expiry'
       type= 'date'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Expiry}
       /></div>
     
    <Tip text='Setting up your Task'/>
    {typeSet(contact.Type1,contact.Type2,contact.Type3,contact.Type4)}
    

    <Tip text='Worker requirement'/>
    <div class="row">
    <label>Require Master Workers (default No):</label>
    <div class="row">
    <Input 
      id ='MasterYes'
       name= 'Master'
       type= 'radio'
       placeholder =''
       onChange = {handleChange}
       value = {contact.MasterYes}
       />Yes
        <Input 
          id ='MasterYes'
       name= 'Master'
       type= 'radio'
       placeholder =''
       onChange = {handleChange}
       value = {contact.MasterNo}
       />No
        </div>
        </div>
        <div class="row">
        <label>Reward per response:</label>
        <Input 
          id ='Reward'
       name= 'Reward'
       type= 'text'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Reward}
       />
            </div>
        <div class="row">
        <label>Number of workers:</label>
        <Input 
        id ='Number'
       name= 'Number'
       type= 'text'
       placeholder =''
       onChange = {handleChange}
       value = {contact.Number}
       />
            </div>    
            <Button 
           type = 'submit'
           text='Save'
           onClick= {handleSubmit}
       />   
    </div>
)
}

export default Requester