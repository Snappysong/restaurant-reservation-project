import React, { useState } from "react";

function TableDetail( {table} ) {
    const [tableStatus, setTableStatus] = useState("Free");

    if (table.reservation_id) {
        setTableStatus(`Occupied by ${table.reservation_id}`)
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
        </div>
    )
}

export default TableDetail;