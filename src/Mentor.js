import * as React from "react";
import {useState,useEffect} from "react"

 export function Mentorlist(){
    const [mentor,setmentor]=useState()
    const getmentor=()=>{
        fetch("https://jgvv-database.herokuapp.com/mentors",{method:"GET"})
        .then((res)=>res.json())
        .then((data)=>setmentor(data))
    }

useEffect(getmentor,[])
return mentor ? <Mentor mentor={mentor}/> : ""
}

function Mentor({mentor}){
    return(
        <section className="main-container" >
            <table border="5px">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Mentor Name</th>
                        <th>Email Id</th>
                        <th>Contact No</th>
                    </tr>

                </thead>
                <tbody>
                    {mentor.map(({mentor_name,mentor_email,contact_no},index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{mentor_name}</td>
                                <td>{mentor_email}</td>
                                <td>{contact_no}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )

}