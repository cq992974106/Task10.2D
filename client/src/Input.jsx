import React from 'react'

const Input = (props)=>{
    return <div>
       <input id={props.id} name={props.name} type={props.type} placeholder={props.placeholder} onChange = {props.onChange} required/>
    </div>

}
export default Input