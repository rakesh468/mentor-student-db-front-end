import {useState,useEffect} from "react"
import * as React from "react";

 export function Studentlist(){
    const [student,setstudent]=useState()
    const getstudent=()=>{
        fetch("https://jgvv-database.herokuapp.com/students",{method:"GET"})
        .then((stu)=>stu.json())
        .then((data)=>setstudent(data))
    }

    useEffect(getstudent,[])
    return student ? <Student student={student}/>:"";
}

function Student({student}){
    return(
        <section className="main-container">
            <table border="2px" >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Student Name</th>
                        <th>Student Email Id</th>
                        <th>Student DOB</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map(({student_name,student_email,student_DOB,course},index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{student_name}</td>
                                <td>{student_email}</td>
                                <td>{student_DOB}</td>
                                <td>{course}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </section>

    )
}