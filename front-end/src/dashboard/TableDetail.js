import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { clearTable, updateReservation } from "../utils/api";

function TableDetail( {table, reservations} ) {
    const history = useHistory();
    const [currentTable, setCurrentTable] = useState(table);
    const [tableStatus, setTableStatus] = useState("Free");
    const [currentReservation, setCurrentReservation] = useState({});

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
            setCurrentReservation(reservations.find((res) => res.reservation_id === currentTable.reservation_id))
            //make updated reservation
            //update the reservation
            //set response as the new current res
            const updatedReservation = {
                ...currentReservation,
                status: "finished",
            };
            updateReservation(updatedReservation)
            .then((response) => {
                console.log(response)
                setCurrentReservation(response)
            })
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
            ID: {currentTable.table_id}
            <br />
            Name: {currentTable.table_name}
            <br />
            Capacity: {currentTable.capacity}
            <br />
            <p data-table-id-status={`${currentTable.table_id}`}>
            {tableStatus}
            </p>   
            <div>
                {tableStatus === "Free" ? (<div></div>) : (<div><button data-table-id-finish={table.table_id} onClick={handleFinish}>FINISH</button> <br /> <button onClick={handleCancel}>CANCEL</button></div>)} 
            </div>
        </div>
    )
}

export default TableDetail;