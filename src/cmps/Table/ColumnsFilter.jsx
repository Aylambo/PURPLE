import React from 'react'

const ColumnsFilter = ({column}) => {
    const {filterValue, setFilter} = column
    
    return (
        <div className="col-filter">
            <input value={filterValue || ''} onChange={(ev) => setFilter(ev.target.value)}/>
        </div>
    )
}

export default ColumnsFilter
