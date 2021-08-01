import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservation } from "../utils/api";

function ReservationDetail({reservation}) {
    const history = useHistory();

    const [currentReservation, setCurrentReservation] = useState(reservation);
    const [showSeat, setShowSeat] = useState(false);

    useEffect(() => {
        if (currentReservation.status === "booked" || currentReservation.status === null) {
            setShowSeat(true);
        }
    }, [currentReservation])

    const handleClick = (e) => {
        e.preventDefault();
        setShowSeat(false);
        const updatedReservation = {
            ...currentReservation,
            status: "seated",
        };
        updateReservation(updatedReservation)
        .then((response) => {
            console.log(response)
            setCurrentReservation(response)
            history.push(`/reservations/${currentReservation.reservation_id}/seat`)
        })
    }

    return (
        <div>
            <div>
                ID: {currentReservation.reservation_id}
                <br />
                FIRST NAME: {currentReservation.first_name}
                <br />
                LAST NAME: {currentReservation.last_name}
                <br />
                PHONE NUMBER: {currentReservation.mobile_number}
                <br />
                DATE: {currentReservation.reservation_date}
                <br />
                TIME: {currentReservation.reservation_time}
                <br />
                #PEOPLE: {currentReservation.people}
                <br />
                This Table is...
                <p data-reservation-id-status={currentReservation.reservation_id}>{currentReservation.status ? currentReservation.status : "booked"}</p>
            </div>
            <div>
                {showSeat ? <a 
                            href={`/reservations/${currentReservation.reservation_id}/seat`}
                            onClick={handleClick}
                            >
                        "Seat"
                            </a> : <div></div>}
                
            </div>
        </div>
    )
}

export default ReservationDetail;