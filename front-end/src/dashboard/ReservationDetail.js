import React, { useEffect, useState } from "react";
import { updateReservation } from "../utils/api";

function ReservationDetail({reservation}) {
    const { reservation_id } = reservation;

    const [showSeat, setShowSeat] = useState(false);

    useEffect(() => {
        if (reservation.status === "booked") {
            setShowSeat(true);
        }
    }, [reservation])

    const handleClick = (e) => {
        e.preventDefault();
        setShowSeat(false);
        const updatedReservation = {
            ...reservation,
            status: "seated",
        };
        updateReservation(updatedReservation)
        .then((response) => {
            console.log(response);
        })
    }

    return (
        <div>
            <div>
                ID: {reservation_id}
                <br />
                FIRST NAME: {reservation.first_name}
                <br />
                LAST NAME: {reservation.last_name}
                <br />
                PHONE NUMBER: {reservation.mobile_number}
                <br />
                DATE: {reservation.reservation_date}
                <br />
                TIME: {reservation.reservation_time}
                <br />
                #PEOPLE: {reservation.people}
                <br />
                This Table is...
                <p data-reservation-id-status={reservation_id}> {reservation.status} </p>
            </div>
            <div>
                {showSeat ? <a 
                            href={`/reservations/${reservation_id}/seat`}
                            onClick={handleClick}
                            >
                        "Seat"
                            </a> : <div></div>}
                
            </div>
        </div>
    )
}

export default ReservationDetail;