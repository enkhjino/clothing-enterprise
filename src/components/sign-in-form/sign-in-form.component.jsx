import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utilities/firebase/firebase.utilities';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const defaultFormFields = {
    email: '',
    password: ''
}


const SignInForm = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

     
    const signInWithGoogle = async () => {
        // console.log("clicked google sign in");
        const { user } = await signInWithGooglePopup();
        navigate('/');
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            navigate('/');
            resetFormFields();
        } catch(error){
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                default:
                    console.log(error)
            }
        }
    };

    const handleChange = (event) => {
        console.log("clicked handlechange");
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label = 'Email' type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label= 'Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google' >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;