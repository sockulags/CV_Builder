import { useState } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>(); 
    const [newCollectionName, setNewCollectionName] = useState<string>("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            handleError(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
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

    auth.onAuthStateChanged((user) => {
        if (user) {
            createUserProfile(user);
        }
    });

    const createNewCollection = async () => {
        try {
            const generatedName = generateUniqueName(); 
            setNewCollectionName(generatedName);


            const stringList = ["String 1", "String 2", "String 3"];
    
            await addDoc(collection(db, generatedName), { strings: stringList });
        } catch (error) {
            handleError(error);
        }
    };

    const generateUniqueName = () => {       
        return `collection_${Date.now()}`;
    };

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

    return (
        <div>
            <input 
                placeholder="Email.."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="Password.."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={logout}>Logout</button>
            <button onClick={createNewCollection}>Create New Collection</button>
            {error && <p>{error}</p>}
            {newCollectionName && <p>New Collection Name: {newCollectionName}</p>}
        </div>
    );
};
