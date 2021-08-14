import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

function NewReservation() {
    const history = useHistory();

    // const initialFormData = {
    //     first_name: "",
    //     last_name: "",
    //     mobile_number: "",
    //     reservation_date: "",
    //     reservation_time: "",
    //     people: "",
    // }

    // const [formData, setFormData] = useState(initialFormData);
    //change to formData obj so it is easily passable
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile_number, setMobile_number] = useState("");
    const [reservation_date, setReservation_date] = useState("");
    const [reservation_time, setReservation_time] = useState("");
    const [people, setPeople] = useState(1);

    const [error, setError] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const reservation = {
            first_name, 
            last_name, 
            mobile_number, 
            reservation_date,
            reservation_time,
            people,
            status: "booked",
        };
        createReservation(reservation)
        .then(() => {
            history.push(`/dashboard?date=${reservation_date}`);
        })
        .catch(setError);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>
            <ErrorAlert error={error} />

            <h3 className="d-flex m-3 justify-content-center">New Reservation Form</h3>

            <div>
                <form className="form-group" onSubmit={handleSubmit} >
                    <label>First Name:</label>
                    <br />
                        <input
                        name="first_name"
                        type="text"
                        required
                        onChange={(e) => setFirst_name(e.target.value)}
                        value={first_name}
                        className="form-control"
                        />
                    <br />
                    <label>Last Name:</label>
                    <br />
                        <input
                        name="last_name"
                        type="text"
                        required
                        onChange={(e) => setLast_name(e.target.value)}
                        value={last_name}
                        className="form-control"
                        />
                    <br />
                    <label>Mobile Number:</label>
                    <br />
                        <input
                        name="mobile_number"
                        type="text"
                        required
                        onChange={(e) => setMobile_number(e.target.value)}
                        value={mobile_number}
                        className="form-control"
                        />
                    <br />
                    <label>Reservation Date:</label>
                    <br />
                        <input
                        name="reservation_date"
                        type="date"
                        required
                        onChange={(e) => setReservation_date(e.target.value)}
                        value={reservation_date}
                        className="form-control"
                        />
                    <br />
                    <label>Reservation Time:</label>
                    <br />
                        <input
                        name="reservation_time"
                        type="time"
                        required
                        onChange={(e) => setReservation_time(e.target.value)}
                        value={reservation_time}
                        className="form-control"
                        />
                    <br />
                    <label>Amount of People:</label>
                    <br />
                        <input
                        name="people"
                        type="number"
                        required
                        onChange={(e) => setPeople(e.target.valueAsNumber)}
                        value={people}
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
    );
};

export default NewReservation;