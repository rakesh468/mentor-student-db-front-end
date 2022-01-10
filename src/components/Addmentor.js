import * as React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// validating form using yup //
const formValidationSchema=yup.object({
    mentor_name:yup.string().required("Mentor Name Required"),
    mentor_email:yup.string().required("Email Id Required"),
    contact_no:yup.number().required(),
})

 export function Addmentor(){
   const history=useHistory();
const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
     initialValues:{
         mentor_name:"",
         mentor_email:"",
     },
     validationSchema:formValidationSchema,
     onSubmit:(newmentor)=>{
         console.log("onsubmit",values)
         Addmentor(newmentor)
     }
})

// adding mentor using post method //
const Addmentor=(newmentor)=>{
    fetch(`https://jgvv-database.herokuapp.com/create_mentor`,{
        method:"POST",
        body:JSON.stringify(newmentor),
        headers:{"Content-Type":"application/json"},
    }).then(()=>history.push("/mentors"))
}
    return(
        <div className="main-container">
            <div className="form-container">
            <form onSubmit={handleSubmit}>
               <TextField  
               id="mentor_name"
               name="mentor_name"
               values={values.mentor_name}
               label="Mentor Name"
               onChange={handleChange}
               onBlur={handleBlur}
               type="text"
               variant="standard"
               error={errors.mentor_name && touched.mentor_name}
             helperText= {errors.mentor_name && touched.mentor_name && errors.mentor_name }/>
             <TextField
             id="mentor_email"
             name="mentor_email"
             value={values.mentor_email}
             label="Mentor Email Id"
             onChange={handleChange}
             onBlur={handleBlur}
             type="text"
             variant="standard"
             error={errors.mentor_email && touched.mentor_email}
             helperText={errors.mentor_email && touched.mentor_email && errors.mentor_email}/>
             <TextField
             id="contact_no"
             name="contact_no"
             value={values.contact_no}
             label="Contact Number"
             error={errors.contact_no && touched.contact_no}
             variant="standard"
             onBlur={handleBlur}
             onChange={handleChange}
             helperText={errors.contact_no && touched.contact_no && errors.contact_no}
             />
             <Button type="submit" variant="contained" color="success" > Add Mentor</Button>
               </form>
            </div>
        </div>
    )
}