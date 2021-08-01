import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { clearTable } from "../utils/api";

function TableDetail( {table} ) {
    const history = useHistory();
    const [currentTable, setCurrentTable] = useState(table);
    const [tableStatus, setTableStatus] = useState("Free");

    useEffect(() => {
        if (currentTable.reservation_id) {
            setTableStatus(`Occupied by reservation ID: ${currentTable.reservation_id}`)
        } else {
            setTableStatus("Free");
        }
    }, [currentTable])

    const handleFinish = (e) => {
        e.preventDefault();
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        )
        if (confirmBox === true) {
            //change res status to finished
            clearTable(currentTable)
            .then((response) => {
                console.log(response)
                setCurrentTable(response)
                history.go(0);
            })
        }
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