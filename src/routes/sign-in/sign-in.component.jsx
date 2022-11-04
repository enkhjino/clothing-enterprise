import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, singInWithGoogleRedirect } from '../../utilities/firebase/firebase.utilities';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {
 
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        createUserDocumentFromAuth(user);
    }
    const logGoogleRedirectUser = async () => {
        const { user } = await singInWithGoogleRedirect();
        console.log({ user })
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with google popup
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;