import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteReservationId, updateReservationStatus } from "../utils/api";

function TableDetail( {table, reservations} ) {
    const history = useHistory();
    const [currentTable, setCurrentTable] = useState(table);
    const [tableStatus, setTableStatus] = useState("Free");
    const [currentReservation, setCurrentReservation] = useState({});

    useEffect(() => {
        if (currentTable.reservation_id) {
            setTableStatus(`Occupied by reservation ID: ${currentTable.reservation_id}`);
            setCurrentReservation(reservations.find((res) => res.reservation_id === currentTable.reservation_id));
        } else {
            setTableStatus("Free");
        }
    }, [currentTable, reservations]);

    const handleFinish = (e) => {
        e.preventDefault();
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        );
        if (confirmBox === true) {
            updateReservationStatus({ status: "finished" }, currentReservation.reservation_id)
            .then((response) => {
                setCurrentReservation(response)
            })
            deleteReservationId(currentTable.table_id)
            .then((response) => {
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
            <p>ID: {currentTable.table_id}</p>
            <p>Name: {currentTable.table_name}</p>
            <p>Capacity: {currentTable.capacity}</p>
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