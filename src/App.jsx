import React from 'react'
import './App.css';
import { StyledFirebaseAuth } from 'react-firebaseui'

import firebase from "./config/Firebase-config"
import { Home } from './pages/Home'



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
    return firebase.auth().signOut()
  }

  render() {

    return (
      <div className="App">

        <section>
          {this.state.isLoggedIn ?
            (<Home signOut={this.signOut} firebase={firebase} user={this.state.user}/>)
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

