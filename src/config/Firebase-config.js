import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyApt0-rwOF8jjSGi-0X-vTjHE9dCRMqLp4",
  authDomain: "fir-proj-79548.firebaseapp.com",
  projectId: "fir-proj-79548",
  storageBucket: "fir-proj-79548.appspot.com",
  messagingSenderId: "567378914024",
  appId: "1:567378914024:web:903eeced487316534e375d",
  measurementId: "G-0GQPMNRSMD"
};

  firebase.initializeApp(firebaseConfig);

  
  
  export default firebase
