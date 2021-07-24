import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { today } from "../utils/date-time";

function NewReservation() {
    const history = useHistory();

    const date = new Date();
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    const currentTime = 
        hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
        minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const currentDay = today();

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile_number, setMobile_number] = useState("");
    const [reservation_date, setReservation_date] = useState(`${currentDay}`);
    const [reservation_time, setReservation_time] = useState(`${currentTime}`)
    const [people, setPeople] = useState(1);
    const [showAlertForTuesdays, setShowAlertForTuesdays] = useState("");
    const [showAlertForPast, setShowAlertForPast] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlertForPast("");
        setShowAlertForTuesdays("");

        let reservationDate = new Date(reservation_date);
        if (reservationDate.getDay() === 1) {
            setShowAlertForTuesdays("We are closed on Tuesdays!");
        }
        let currentDate = new Date(currentDay)
        if (reservationDate < currentDate) {
            setShowAlertForPast("This date is in the past!");
        } 
        if ((reservationDate.getDay() !== 1) && (reservationDate > currentDate)) {
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
                history.push(`/dashboard?date=${reservation_date}`)
            })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }


        return (
            <div>
                <div>
                    {showAlertForTuesdays && (
                        <p className="alert alert-danger">
                            {showAlertForTuesdays}
                        </p>
                    )}
                    {showAlertForPast && (
                        <p className="alert alert-danger">
                            {showAlertForPast}
                        </p>
                    )}
                </div>
                <div>
                    <form onSubmit={handleSubmit} >
                        <label>First Name:</label>
                        <br />
                            <input
                            name="first_name"
                            type="text"
                            required
                            onChange={(e) => setFirst_name(e.target.value)}
                            value={first_name}
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
                            />
                        <br />
                        <button type="submit">SUBMIT</button>
                        <button onClick={handleCancel}>CANCEL</button>
                    </form>
                </div>
            </div>
        );
};

export default NewReservation;