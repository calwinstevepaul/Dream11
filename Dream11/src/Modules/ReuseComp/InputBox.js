import React from 'react'

export default function InputBox({placeholder,value,name,onChange,type}) {
    return (
       <input className="inputbox-1" type={type} placeholder={placeholder} name={name}  value={value} onChange={(e)=>onChange(e)} />
    )
}
