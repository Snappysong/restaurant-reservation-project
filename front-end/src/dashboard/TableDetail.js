import React, { useEffect, useState } from "react";
import { clearTable } from "../utils/api";

function TableDetail( {table} ) {
    const [tableStatus, setTableStatus] = useState("Free");

    useEffect(() => {
        if (table.reservation_id) {
            setTableStatus(`Occupied by reservation ID: ${table.reservation_id}`)
        } else {
            setTableStatus("Free");
        }
    }, [table.reservation_id])

    const handleFinish = (e) => {
        e.preventDefault();
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        )
        if (confirmBox === true) {
            //do the delete call
            const table_id = table.table_id;
            console.log(table_id)
            clearTable(Number(table_id))
        }
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
            <div>
                {tableStatus === "Free" ? (<div></div>) : (<div><button data-table-id-finish={table.table_id} onClick={handleFinish}>FINISH</button> <br /> <button onClick={handleCancel}>CANCEL</button></div>)} 
            </div>
        </div>
    )
}

export default TableDetail;