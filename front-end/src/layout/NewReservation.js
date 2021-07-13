import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function NewReservation() {
    const history = useHistory();
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile_number, setMobile_number] = useState("");
    const [reservation_date, setReservation_date] = useState("");
    const [reservation_time, setReservation_time] = useState("");
    const [people, setPeople] = useState(1);



    const handleSubmit = (e) => {
        e.preventDefault();
        const reservation = {
            first_name, 
            last_name, 
            mobile_number, 
            reservation_date,
            reservation_time,
            people,
        }
        createReservation(reservation)
        .then((response) => {
            console.log(response)
            history.push('/dashboard')
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <label>First Name:</label>
                    <br />
                        <input
                        type="text"
                        required
                        onChange={(e) => setFirst_name(e.target.value)}
                        value={first_name}
                        />
                    <br />
                    <label>Last Name:</label>
                    <br />
                        <input
                        type="text"
                        required
                        onChange={(e) => setLast_name(e.target.value)}
                        value={last_name}
                        />
                    <br />
                    <label>Mobile Number:</label>
                    <br />
                        <input
                        type="text"
                        required
                        onChange={(e) => setMobile_number(e.target.value)}
                        value={mobile_number}
                        />
                    <br />
                    <label>Reservation Date:</label>
                    <br />
                        <input
                        type="date"
                        required
                        onChange={(e) => setReservation_date(e.target.value)}
                        value={reservation_date}
                        />
                    <br />
                    <label>Reservation Time:</label>
                    <br />
                        <input
                        type="time"
                        required
                        onChange={(e) => setReservation_time(e.target.value)}
                        value={reservation_time}
                        />
                    <br />
                    <label>Amount of People:</label>
                    <br />
                        <input
                        type="integer"
                        required
                        onChange={(e) => setPeople(e.target.value)}
                        value={people}
                        />
                    <br />
                    <button type="submit">SUBMIT</button>
                    <button onClick={handleCancel}>CANCEL</button>
                </form>
            </div>
        </div>
    )
}

export default NewReservation;