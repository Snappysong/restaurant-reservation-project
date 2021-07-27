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
    //need table to change State when a table gets booked

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
        </div>
    )
}

export default TableDetail;