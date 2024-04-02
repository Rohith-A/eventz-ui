import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";


const Form = () => {
    const [formValues, setFormValues] = useState({});
    const [displayMessage, setDisplayMessage] = useState(false);
    const [errorObject, setErrorObject] = useState({});
    
    const validate = () => {
        const errorObj = {};
        errorObj.userName = !formValues.userName ? true : false;
        errorObj.email = !formValues.email ? true : false;
        errorObj.message = !formValues.message ? true : false;
        setErrorObject(errorObj);
    }
    const erroStyle = {
        color: 'red',
        'font-size': '12px'
    }

    const fieldStyles = {
        display: 'grid',
        'grid-template-columns': '1fr 1fr'
      
        }

    const childStyles = {
            width: '500px',
    }
    return (<>
        <div>
        <div style={{...fieldStyles}}>
        <p style={{...childStyles}}>
        User Name
        </p>
        <input style={{...childStyles}} required type="text" onChange={(e) => {
            setFormValues({...formValues, userName: e.target.value})
        }} /> 
        </div>
        <div>
        {errorObject.userName  && (<p style={{...erroStyle}}>Please fill this field</p>)}
        </div>
        <div style={{...fieldStyles}}>
        <p style={{...childStyles}}>
        Email
        </p>
        <input style={{...childStyles}} required type="text" onChange={(e) => {
            setFormValues({...formValues, email: e.target.value})
        }} /> 
        </div>
        <div>
        
        {errorObject.email && (<p style={{...erroStyle}}>Please fill this field</p>)}

        </div>
        <div style={{...fieldStyles}}>
        <p style={{...childStyles}}>
        Message
        </p>
        <input style={{...childStyles}} required type="text" onChange={(e) => {
            setFormValues({...formValues, message: e.target.value})
        }} />
        </div>
        <div>
       
        {errorObject.message && (<p style={{...erroStyle}}>Please fill this field</p>)}

        </div>
        <button onClick={() => validate()}>Submit</button>
        {(formValues?.message) && (<p>{formValues.message}</p>)}
        </div>
        </>)
}

export default Form;