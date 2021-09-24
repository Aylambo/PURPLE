import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'


const UploadCmp = ({ firebase }) => {


    const [files, setFiles] = useState([])
    const [url, setUrl] = useState(null)
    const [more, setMore] = useState('')
    const [progress, setProgress] = useState(0)

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const db = firebase.firestore()

    // const files = acceptedFiles.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));

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
    const onSubmit =(ev) => {
        ev.preventDefault()
        const filename = ev.target.filename.value
        if (!filename) {
            return
        }
        console.log('filename', filename);
        db.collection('files').doc(filename).set({
            name: filename,
            link: url
        })

    }

    const onChange = async (ev) => {
        // firebase.firestore().collection("files").add({link: 'upload worked'})
        const file = ev.target.files[0]
        const storageRef = firebase.storage().ref('imgs')
        const fileRef = storageRef.child(file.name)
         await fileRef.put(file)

         setUrl(await fileRef.getDownloadURL())
        
        // fileRef.put(file).on(
        //     "state_changed",
        //     snapshot => {
        //         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        //         setProgress(progress)
        //     },
        //     error => {
        //         console.log('this one', error)
        //     },
        //     () => {
        //         firebase.storage()
        //             .ref('imgs')
        //             .child(file.name)
        //             .getDownloadURL()
        //             .then(url => {
        //                 setUrl(url)
        //             })

        //         console.log(file);
        //         setMore(file)
        //     }
        // )
    }

    return (
        <div className="upload-container">
            <h1> UploadCmp</h1>
            <div className="upload-main">
                <form onSubmit={onSubmit}>
                <input type="file" onChange={onChange} />
                <input type="text" name='filename' placeholder='File name' />
                <button>Upload</button>
                </form>
                <br />

                <ul>
                    {files.map(file => {
                        return <li>{file.name}
                        </li>


                    })}
                    <li></li>
                </ul>
                {/* <progress value={progress} max="100" />
                <br />
                {url &&
                    <a href={url} target="_blank">Link</a>
                }
                <br />
                {more?.name}
                <br />
                {new Date(more?.lastModifiedDate).toLocaleString()} */}
            </div>
        </div>

    )
}

export default UploadCmp



// const storageRef = firebase.storage().ref(`imgs/${image.name}`)
// const fileRef = storageRef.child(file.name)
// fileRef.put(file).then(() => {
//     console.log('Updated file ')
// })



import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadCmp = ({ firebase }) => {

    const [img, setImg] = useState(null)
    const [url, setUrl] = useState('')
    const [more, setMore] = useState([])
    const [progress, setProgress] = useState(0)

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    // const db = firebase.firestore()

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const onChange = (ev) => {
        const file = ev.target.files[0]
        setImg(file)
    }

    const handleUpload = () => {
        const storageRef = firebase.storage().ref(`imgs/${img.name}`).put(img)
        storageRef.on(
            "state_changed",
            snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            error => {
                console.log(error)
            },
            () => {
                firebase.storage()
                    .ref('imgs')
                    .child(img.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url)
                    })

                console.log('lala', img);
                setMore(img)
            }
        )
    }
    console.log(more);
    return (
        <div className="upload-container">
            <h1> UploadCmp</h1>
            <div className="upload-main">

                <input type="file" onChange={onChange} />
                <button onClick={handleUpload}>Upload</button>
                <br />
                <progress value={progress} max="100" />
                <br />

                <ul>
                    {more.map(file => {
                        return <li>{file.name}, {<a href={url} target="_blank">Link</a>}, {new Date(file?.lastModifiedDate).toLocaleString()} </li>


                    })}
                    <li></li>
                </ul>

                {/* {url &&
                    <a href={url} target="_blank">Link</a>
                }
                <br />
                {more?.name}
                <br />
                {new Date(more?.lastModifiedDate).toLocaleString()} */}
            </div>
        </div>

    )
}

export default UploadCmp



// const storageRef = firebase.storage().ref(`imgs/${image.name}`)
// const fileRef = storageRef.child(file.name)
// fileRef.put(file).then(() => {
//     console.log('Updated file ')
// })

import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'


const UploadCmp = ({ firebase }) => {


    const [files, setFiles] = useState([])
    const [url, setUrl] = useState(null)
    const [more, setMore] = useState('')
    const [progress, setProgress] = useState(0)

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const db = firebase.firestore()

    // const files = acceptedFiles.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));

    // const onChange = (ev) => {
    //     const file = ev.target.files[0]
    //     setImg(file)
    // }
    useEffect(() => {
        const fetchfiles = async () => {
            const filesCollection = await db.collection('files').get()
            setFiles(filesCollection.docs.map(doc => {
                console.log('doc.data', doc.data);
                return doc.data()
            }))
            
        }
        fetchfiles()
    },[])

    const onSubmit =(ev) => {
        ev.preventDefault()
        const filename = ev.target.filename.value
        if (!filename) {
            return
        }
        console.log('filename', filename);
        db.collection('files').doc(filename).set({
            name: filename,
            link: url
        })

    }

    const onChange = async (ev) => {
        const file = ev.target.files[0]
        const storageRef = firebase.storage().ref('imgs')
        const fileRef = storageRef.child(file.name)
         await fileRef.put(file)

         setUrl(await fileRef.getDownloadURL())
        
       
    }

    return (
        <div className="upload-container">
            <h1> UploadCmp</h1>
            <div className="upload-main">
                <form onSubmit={onSubmit}>
                <input type="file" onChange={onChange} />
                <input type="text" name='filename' placeholder='File name' />
                <button>Upload</button>
                </form>
                <br />

                <ul>
                    {files.map(file => {
                        return <li>{file.name}
                        </li>


                    })}
                    <li></li>
                </ul>
                {/* <progress value={progress} max="100" />
                <br />
                {url &&
                    <a href={url} target="_blank">Link</a>
                }
                <br />
                {more?.name}
                <br />
                {new Date(more?.lastModifiedDate).toLocaleString()} */}
            </div>
        </div>

    )
}

export default UploadCmp
