import React from 'react'
import './App.css';
import { StyledFirebaseAuth } from 'react-firebaseui'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from './routes.js'
import { Home } from './pages/Home'


import firebase from 'firebase/app'
import firebase from "firebase"
import "firebase/storage"

var admin = require('firebase-admin');

// GOOGLE_APPLICATION_CREDENTIALS='./data/fir-proj-firebase-adminsdk.json'
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://Firebase-proj.firebaseio.com'
});

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyApt0-rwOF8jjSGi-0X-vTjHE9dCRMqLp4",
  authDomain: "fir-proj-79548.firebaseapp.com",
  projectId: "fir-proj-79548",
  storageBucket: "fir-proj-79548.appspot.com",
  messagingSenderId: "567378914024",
  appId: "1:567378914024:web:903eeced487316534e375d",
  measurementId: "G-0GQPMNRSMD",
  display: 'popup'
});

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const auth = firebaseConfig.auth()
// const storage = firebase.storage();




class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null
  }

  uiConfiguration = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,

    ],
    callbacks: {
      SuccessedSignedIn: () => false
    }
  }

  componentDidMount = () => {


    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user })
      this.setState({ user })
    })

  }

  signOut() {
    return auth.signOut()
  }

  render() {

    return (
      <div className="App">

        <section>
          {this.state.isLoggedIn ?
            (<Home signOut={this.signOut} firebaseConfig={firebaseConfig} user={this.state.user}/>)
            :
            (<div className="signin-header"><h1>Hello! Please Login</h1><StyledFirebaseAuth uiConfig={this.uiConfiguration} firebaseAuth={firebase.auth()} />

            </div>
            )}
        </section>


      </div>
    )
  }
}

export default App

