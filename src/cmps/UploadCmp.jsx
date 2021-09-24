

import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'


const UploadCmp = ({ firebase }) => {


    const [files, setFiles] = useState([])
    const [urls, setUrls] = useState([])
    const [progress, setProgress] = useState(0)

    const { getRootProps, getInputProps } = useDropzone({
        accept: "*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) => Object.assign(file,{
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });

    const db = firebase.firestore()

    // const onChange = (ev) => {
    //     const file = ev.target.files[0]
    //     setImg(file)
    // }
    useEffect(() => {
        const fetchfiles = async () => {
            const filesCollection = await db.collection('files').get()
            console.log('filesCollection', filesCollection);
            setFiles(filesCollection.docs.map(doc => {
                return doc.data()
            }))
            
        }
        fetchfiles()
    },[])
    

    const onChange = async (ev) => {
        const file = ev.target.files[0]
        const storageRef = firebase.storage().ref('imgs')
        const fileRef = storageRef.child(file.name)
         await fileRef.put(file)
        for (let i = 0 ; i < ev.target.files.length; i++) {
            const newFile = ev.target.files[i]
            newFile['id']= Math.random()
            setFiles((prevState) => [...prevState, newFile])
        }
         setFiles(file)
         setUrls(await fileRef.getDownloadURL())
        
        fileRef.put(file).on(
            "state_changed",
            snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            error => {
                console.log('this one', error)
            },
            () => {
                firebase.storage()
                    .ref('imgs')
                    .child(file.name)
                    .getDownloadURL()
                    .then(urls => {
                        setUrls(urls)
                    })

               
            }
        )
        
    }

    return (
        <div className="upload-container">
            <h1> UploadCmp</h1>
            <div className="upload-main">
                <input type="file" multiple onChange={onChange} />
                <br />
                <progress value={progress} max="100" />
                <br />
                {urls &&
                    <a href={urls} target="_blank">Link</a>
                }
                <br />
                {files?.name}
                <br />
                {new Date(files?.lastModifiedDate).toLocaleString()}
            </div>
        </div>

    )
}

export default UploadCmp

