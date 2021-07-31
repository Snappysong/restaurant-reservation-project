import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listAllTables, listReservations, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function SeatReservation() {
    const history = useHistory();
    const params = useParams();

    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState("");
    const [res, setRes] = useState([]);
    const [resError, setResError] = useState("");
    const [currentRes, setCurrentRes] = useState({});
    const [formValue, setFormValue] = useState({});
    const [showAlert, setShowAlert] = useState("");

    function loadTables() {
        const abortController = new AbortController();
        setTablesError(null);
        listAllTables()
        .then(setTables)
        .catch(setTablesError);
        return () => abortController.abort();
    }

    function loadReservations() {
        const abortController = new AbortController();
        setResError(null);
        listReservations({ }, abortController.signal)
        .then(setRes)
        .catch(setResError);
        return () => abortController.abort();
    }

    function assignResToCurrent() {
        const current = res.find((obj) => obj.reservation_id === Number(params.reservation_id))
        setCurrentRes(current)
    }

    useEffect(loadTables, []);
    useEffect(loadReservations, []);
    useEffect(assignResToCurrent, [res, params.reservation_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert("");
        let valid = true;
        const tableObj = JSON.parse(formValue);
        if (currentRes.people > tableObj.capacity) {
            setShowAlert("This table is too small for this reservation!");
            valid = false;
        }
        if (valid === true) {
            const updatedTable = {
                ...tableObj,
                reservation_id: Number(params.reservation_id),
            };
            updateTable(updatedTable)
            .then((response) => {
                const newTables = tables.map((table) => {
                    return table.table_id === response.table_id ? response : table
                })
                setTables(newTables);
                history.push(`/dashboard`)
            })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    if (tables) {
        return (
            <div>
                <ErrorAlert error={tablesError} />
                <ErrorAlert error={resError} />
                {showAlert && (
                        <p className="alert alert-danger">
                            {showAlert}
                        </p>
                    )}
                <h3>Reservation Seating for reservation ID: {params.reservation_id}</h3>
                <form onSubmit={handleSubmit} >
                    <label>Table Number:</label>
                    <br />
                    <select name="table_id" onChange={(e) => setFormValue(e.target.value)}>
                        <option value="">--Please Choose a Table--</option>
                        {tables && tables.map((table) => (
                            <option key={table.table_id}
                                    value={JSON.stringify(table)}
                                    required
                                    >
                                {table.table_name} - {table.capacity}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">SUBMIT</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default SeatReservation;