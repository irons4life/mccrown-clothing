import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component"

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import "./sign-up-form.styles.scss"

const defaultFormFields={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    console.log("hit")
    
    const handleChange=(e)=>{
        const {name, value}= e.target
    setFormFields({...formFields, [name]: value})}

    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(formFields.password!==formFields.confirmPassword){
            alert("Passwords don't match...")
            return
        }
        try{
            const {user}= await createAuthUserWithEmailAndPassword(email,password)
            
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
        }
    
        catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('Cannot create user. Email already in use')
            }
            console.log(error.message, error)
        }    
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    />                
                <FormInput 
                    label="Email"
                    type="email" 
                    required
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                
                <FormInput
                    label="Password"
                    type="password" 
                    required
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                    />
                
                <FormInput 
                    label="Confirm passowrd"
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="confirmPassword" 
                    value={confirmPassword}
                    />

                <Button buttonType="default" type="submit" >Sign Up</Button>
    
            </form>
        </div>
        )
}
    
export default SignUpForm;