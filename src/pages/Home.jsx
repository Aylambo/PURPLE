import React, { useState } from 'react'
import Currency from '../cmps/Currency'
import UploadCmp from '../cmps/UploadCmp'
import Table from '../cmps/Table/Table'

export function Home({ signOut, firebase, user}) {

    const [component, setComponent] = useState('')
    const handleChange = ({ target }) => {
        const { value } = target
        setComponent(value)
    }
    return (
        <main>
            <header className="App-header">
                <button onClick={signOut}>Log Out</button>

                <h1>Hello {user?.displayName}</h1>

            </header>
            <div className="main-content">
                <button value="Currency" onClick={handleChange}>Currency Convertor</button>
                <button value="UploadCmp" onClick={handleChange}>Upload Files</button>
                <button value="Ftable" onClick={handleChange}>Table</button>
            </div>

            {component === "Currency" && <Currency className="currency-conv" firebase={firebase} />}
            {component === "UploadCmp" && <UploadCmp className="upload" firebase={firebase} />}
            {component === "Ftable" && <Table className="filtered-table" />}
        </main>
    )
}
