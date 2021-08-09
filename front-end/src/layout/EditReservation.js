import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listReservations, updateReservation } from "../utils/api";

function EditReservation() {
    const history = useHistory();
    const params = useParams();
    const [reservations, setReservations] = useState([]);
    const [currentReservation, setCurrentReservation] = useState({});
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile_number, setMobile_number] = useState("");
    const [reservation_date, setReservation_date] = useState("");
    const [reservation_time, setReservation_time] = useState("");
    const [people, setPeople] = useState(1);
    
    useEffect(() => {
        listReservations({})
        .then((response) => {
            setReservations(response);
        });
    }, [params]);

    useEffect(() => {
        if (reservations.length !== 0) {
            const current = reservations.find((res) => res.reservation_id === Number(params.reservation_id));
            setCurrentReservation(current);
        }
    }, [reservations, params]);

    useEffect(() => {
        if (Object.keys(currentReservation).length !== 0) {
            setFirst_name(currentReservation.first_name);
            setLast_name(currentReservation.last_name);
            setMobile_number(currentReservation.mobile_number);
            setReservation_date(currentReservation.reservation_date);
            setReservation_time(currentReservation.reservation_time);
            setPeople(currentReservation.people);
        };
    }, [currentReservation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReservation = {
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people,
        };
        updateReservation(updatedReservation, currentReservation.reservation_id)
        .then(() => {
            history.push(`/dashboard?date=${reservation_date}`);
        });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>

            <h3 className="d-flex m-3 justify-content-center">Edit Reservation Form</h3>
      
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
                        <button className="btn btn-primary" type="submit">submit</button>
                        <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditReservation;