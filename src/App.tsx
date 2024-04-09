import { Auth } from "./components/auth";
import { auth, db } from "./config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ContactInfoComponent } from "./components/contactInfo";

export function App() {
  const [categories, setCategories] = useState([{}])
  const [category, setCategory] = useState("")
  const categoriesRef = collection(db, "categories")

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getDocs(categoriesRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        console.log(filteredData)
        setCategories(filteredData);
      } catch (err) {
        console.error(err);
      }
    }

    getCategories();
  }, [])

  const onSubmitCategory = async () => {
    await addDoc(categoriesRef, { category: category })
  }

  const getUserContactInfo = async () => {
    try {
      // Get the authenticated user
      const user = auth.currentUser;
      if (user) {
        // Get the user's document from Firestore
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          // Access the contactInfo field from the user's document
          const contactInfo = docSnap.data().contactInfo;
          console.log("User's contactInfo:", contactInfo);
        } else {
          console.log("User document does not exist");
        }
      } else {
        console.log("User not signed in");
      }
    } catch (error) {
      console.error("Error fetching user contact info:", error);
    }
  };

  return (
    <div className="App">
      <Auth />
      <ContactInfoComponent/>
      <div>
        <input onChange={(e) => setCategory(e.target.value)} placeholder="category" type="text" />
        <button onClick={onSubmitCategory}>Submit</button>
      </div>
      <div>
        {
          categories.map((category) => (
            <h3>{category.profile}</h3>
          ))
        }
      </div>
      <button onClick={getUserContactInfo}>Get User Contact Info</button>
    </div>
  );
}
