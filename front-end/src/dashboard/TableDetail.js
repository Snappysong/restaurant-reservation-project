import React, { useEffect, useState } from "react";

function TableDetail( {table} ) {
    const [tableStatus, setTableStatus] = useState("Free");

    useEffect(() => {
        if (table.reservation_id) {
            setTableStatus(`Occupied by reservation ID: ${table.reservation_id}`)
        } else {
            setTableStatus("Free");
        }
    }, [table.reservation_id])
    //need table to change State when a table gets booked, solved. withRouter in App

    const handleFinish = (e) => {
        e.preventDefault();
        //display "Is this table ready to seat new guests? This cannot be undone."
        //users can choose "OK" to delete to tables/:table_id/seat
    }

    const handleCancel = (e) => {
        e.preventDefault();

    }

    return (
        <div>
            ID: {table.table_id}
            <br />
            Name: {table.table_name}
            <br />
            Capacity: {table.capacity}
            <br />
            <p data-table-id-status={`${table.table_id}`}>
            {tableStatus}
            </p>   
            {tableStatus === "Free" ? (<div></div>) : (<div><button data-table-id-finish={table.table_id} onClick={handleFinish}>FINISH</button> <br /> <button onClick={handleCancel}>CANCEL</button></div>)}      
        </div>
    )
}

export default TableDetail;