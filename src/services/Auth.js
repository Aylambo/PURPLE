import React from 'react'
import firebase from '../config/Firebase-config'

const SocialMediaAuth = (provider) => {
    return firebase 
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
            return res.user;
        })
        .catch ((err) => {
            return res
        })
}

export default SocialMediaAuth
