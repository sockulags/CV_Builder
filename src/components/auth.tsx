import { useEffect, useState } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>(); 
    const [currentUser, setCurrentUser] = useState<any>(null);
    
    const signIn = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if(result){
                closeLogin();
            }
        } catch (error) {
            handleError(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if(result){      
                closeLogin();
            }
        } catch (error) {
            handleError(error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            handleError(error);
        }
    };

    const createUserProfile = async (user) => { 
        try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
    
            if (docSnap.exists()) {
                console.log("User profile already exists for", user.email);               
            } else {
                console.log("Creating user profile for", user.email);
                const contactInfo = {
                    email: user.email,
                }

                await setDoc(userRef, {
                    contactInfo: contactInfo,                              
                });
            }
        } catch (error) {
            console.error("Error creating user profile:", error);
            handleError(error);
        }
    };

    useEffect(() => {
        // Set up the authentication state listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If a user is signed in, update the currentUser state
                setCurrentUser(user);
                createUserProfile(user);
            } else {
                // If no user is signed in, set currentUser state to null
                setCurrentUser(null);
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    const handleError = (error) => {
        let errorMessage = "An error occurred. Please try again later.";
        if (error instanceof FirebaseError) {      
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "Email is already in use. Please use a different email.";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password is too weak. Please use a stronger password.";
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    errorMessage = "Invalid email or password. Please check your credentials and try again.";
                    break;
            }
        }
        setError(errorMessage);
    };

    const closeLogin = () => {
        document.querySelector(".login-popup")?.classList.add("hider");
        document.querySelector(".bg-blur")?.classList.add("hider");
    }

    const handleLoginClick = () => {
        if(auth.currentUser){
            logout();
        } else{
            document.querySelector(".login-popup")?.classList.remove("hider");
            document.querySelector(".bg-blur")?.classList.remove("hider");
        }
    }

    return (
        <>
        <button className="login-in-btn" onClick={handleLoginClick}>{currentUser ? "Logout" : "Login"}</button>
        <div className="login-popup hider">
            <span onClick={closeLogin}>X</span>
            <h1>Login</h1>
            <div className="sign-in-group">

            <label>Email</label>
            <input 
            className="login-input"
            placeholder="Enter email.."
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
            className="login-input" 
                placeholder="Enter password.."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="sign-in-btn" onClick={signIn}>Sign In</button>
            <div className="divider">----</div>
            <p>Or sign in with:</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
          
        </div>
          <div className="bg-blur hider"></div>
          </>
    );
};
