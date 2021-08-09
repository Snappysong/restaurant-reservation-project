import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable() {
    const history = useHistory();
    const [table_name, setTable_name] = useState("");
    const [capacity, setCapacity] = useState("");
    const [showAlert, setShowAlert] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert("");
        let valid = true;
        if (table_name.length < 2) {
            setShowAlert("Table name needs to be longer!");
            valid = false;
        }
        if (isNaN(capacity)) {
            setShowAlert("Capacity needs to be a valid number!");
            valid = false;
        }        
        if (capacity < 1) {
            setShowAlert("This table needs more seats/capacity!");
            valid = false;
        }
        if (valid === true) {
            const table = {
                table_name,
                capacity,
            };
            createTable(table)
            .then(() => {
                history.push("/dashboard");
            });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>
            <div>
                {showAlert && (
                    <p className="alert alert-danger">
                        {showAlert}
                    </p>
                )}
            </div>

            <h3 className="d-flex m-3 justify-content-center">New Table Form</h3>

            <div>
                <form className="form-group" onSubmit={handleSubmit}>
                    <label>Table Name:</label>
                    <br />
                        <input 
                        name="table_name"
                        type="text"
                        required
                        onChange={(e) => setTable_name(e.target.value)}
                        value={table_name}
                        className="form-control"
                        />
                    <br />
                    <label>Table Capacity:</label>
                    <br />
                        <input 
                        name="capacity"
                        type="number"
                        required
                        onChange={(e) => setCapacity(e.target.valueAsNumber)}
                        value={capacity}
                        className="form-control"
                        />
                    <br />

                    <div className="d-flex justify-content-around">
                        <button className="btn btn-primary" type="submit">SUBMIT</button>
                        <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTable;