import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component"

import {
        createUserDocumentFromAuth, 
        signInAuthUserWithEmailAndPassword,
        signInWithGoogle,signInWithGooglePopup 
        }
        from "../../utils/firebase/firebase.utils";
        
import "./sign-in-form.styles.scss"

const defaultFormFields={
    email:"",
    password:"",
}

const SignInForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
       
        }
    
    const handleSubmit= async (e)=>{
        e.preventDefault()
        
        try{
            const {user}= await signInAuthUserWithEmailAndPassword(email,password)
            resetFormFields()
        }
        
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error)        
            }
            if(error.code==="auth/wrong-password"){
                alert("Incorrect password")
            }
            console.log(error.message)
        }
}
    const handleChange=(e)=>{
        const {name, value}= e.target
        setFormFields({...formFields, [name]: value})  
    }
    return(
        <div className="sign-in-container">
            
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                        
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
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button buttonType="google" type="button" onClick={signInWithGoogle}>sign in with google</Button>
                </div>
                 
            </form>
        </div>
        )
    }

export default SignInForm;
