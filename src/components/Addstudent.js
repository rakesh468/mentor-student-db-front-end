import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";

// validating form using yup //

 const formValidationSchema=yup.object({
    student_name:yup.string().required(),
    student_email:yup.string().required(),
    student_DOB:yup.date().required(),
    course:yup.string().required()
})


 export function Addstudent(){
    const [mentors,setMentors]=useState("")
    const URL="https://jgvv-database.herokuapp.com"
    const history=useHistory();
    const{handleChange,handleBlur,handleSubmit,errors,values,touched}=useFormik({
        initialValues:{
            student_name:"",
            student_email:"",
            student_DOB:"",
            course:""},
            validationSchema:formValidationSchema,
            onSubmit:(newstudent)=> addstudent(newstudent)
 });

    useEffect(() => {
        fetch(`${URL}/mentors`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((mentor) => setMentors(mentor));
         
      }, []);
 // adding students using post method //
 const addstudent=(newstudent)=>{
        fetch("https://jgvv-database.herokuapp.com/create_student",{
            method:"POST",
            body:JSON.stringify(newstudent),
            headers:{"Content-Type":"application/json"}
        }).then(()=>history.push("/students"))
    }
    return(
        <div className="main-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <TextField
                    id="student_name"
                    name="student_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.student_name && touched.student_name}
                    helperText={errors.student_name && touched.student_name && errors.student_name}
                    value={values.student_name}
                    variant="standard"
                    label="Student Name"/>
                    <TextField
                    id="student_email"
                    type="text"
                    name="student_email"
                    value={values.student_email}
                    error={errors.student_email && touched.student_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    label=" Student Email Id"/>

                    <TextField
                    type="date"
                    id="student_DOB"
                    name="student_DOB"
                    value={values.student_DOB}
                    error={errors.student_DOB && touched.student_DOB}
                    variant="standard"
                    helperText={errors.student_DOB && touched.student_DOB && errors.student_DOB}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    <InputLabel>Course :
                    <Select
                     value={values.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.course && touched.course}
                    helperText={errors.course && touched.course && errors.course}
                    variant="standard" required
                    style={{width:"200px"}} 
                    label="course">
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="MERN">MERN</MenuItem>
                    <MenuItem value="Data Science">Data Science</MenuItem>
                    <MenuItem value="AI">AI</MenuItem>
                    </Select></InputLabel>
                    <InputLabel>Mentor:
                    <Select
         
         
          label="mentor"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="standard"
          style={{width:"200px"}}
          required
          
        >
          {mentors.length > 0 &&
            mentors.map((mentor, index) => {
              return (
                <MenuItem key={index} value={mentor.mentor_name}>
                  {mentor.mentor_name}
                </MenuItem>
              );
            })}
        </Select></InputLabel>
                   
                    <Button variant="contained" type="submit" color="success">Add Student</Button>
                    
                </form>
            </div>

        </div>
    )
}