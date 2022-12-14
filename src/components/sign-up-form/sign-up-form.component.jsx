import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utilities/firebase/firebase.utilities';
import './sign-up-form.styles.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const navigate = useNavigate();

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("Your Password Don't Match");
            return;
        }

        try {
            const { user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            navigate('/');
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){;
                alert('Already in use')
            }else{
            console.log('user creation encountered an error', error)
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <div className="sign-up-container">
            <h2>I Don't Have an Account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label = 'Display Name' type="text"required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label = 'Email' type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label= 'Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label= 'Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button buttonType='default' type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;