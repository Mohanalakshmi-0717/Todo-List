import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function Todolist() {

    const [inputtodo, setinputtodo] = useState("")
    const [apidata, setapidata] = useState([])

    const handleinput = (e) => {
        setinputtodo(e.target.value)

    }

    useEffect(() => {
        handleapiget()
    }, [])

    const handleapiget = async () => {
        let apitodo = await axios.get("http://localhost:3000/todoList")
        setapidata(apitodo.data)

    }
    const handlesubmit = async () => {

        let body = {
            task: inputtodo
        }

        let postdata = await axios.post("http://localhost:3000/todoList", body)
        setinputtodo("")
        handleapiget()

    }

    const handledelete = async (id) => {
        console.log(id);
        let deletedata = await axios.delete("http://localhost:3000/todoList/" + id)
        handleapiget()
    }

    const handleedit = async (data) => {
        let promptdata = prompt("enter edit data", data.task)
        let body = {
            id: data.id,
            task: promptdata
        }
        let editdata = await axios.put("http://localhost:3000/todoList/" + data.id, body)
        handleapiget()

    }
    return (
        <div>

            <h1 className='header'>ToDo-List</h1>
            <div className='input-field'>
            <input className='input-button' value={inputtodo} onChange={handleinput} placeholder='Enter ToDo' />
            <button onClick={handlesubmit} className="btn btn-primary">Submit</button>
            </div>
            
            <div className='todo-wrapper'>
            <ol className='todo-list'>
                {apidata.map((da) => (
                    <li  className='todo-item'key={da.id}>
                        <span className='data'>{da.task}</span>
                        <div className='buttons'>
                        <button className='edit-button' onClick={() => handleedit(da)}>Edit</button>
                        <button className='delete-button' onClick={() => handledelete(da.id)}>Delete</button>
</div>
                    </li>
                ))}
            </ol>
            </div>
        
    
        </div>
    )
}
