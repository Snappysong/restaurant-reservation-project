import { useState } from "react";
import { useHistory } from "react-router-dom";

function NewTable() {
    const history = useHistory();
    const [table_name, setTable_name] = useState("");
    const [capacity, setCapacity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        //if table_name length is over 2
        //create new table
        //displays dashboard
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Table Name:</label>
                    <br />
                        <input 
                        name="table_name"
                        type="text"
                        required
                        onChange={(e) => setTable_name(e.target.value)}
                        value={table_name}
                        />
                    <br />
                    <label>Capacity:</label>
                    <br />
                        <input 
                        name="capacity"
                        type="number"
                        required
                        onChange={(e) => setCapacity(e.target.valueAsNumber)}
                        value={capacity}
                        />
                    <br />
                    <button type="submit">SUBMIT</button>
                    <button onClick={handleCancel}>CANCEL</button>
                </form>
            </div>
        </div>
    )
}

export default NewTable;