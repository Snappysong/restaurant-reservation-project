import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

function ReservationDetail({reservation}) {
    const history = useHistory();

    const [currentReservation, setCurrentReservation] = useState(reservation);
    const [showSeat, setShowSeat] = useState(false);

    useEffect(() => {
        if (currentReservation.status === "booked" || currentReservation.status === null) {
            setShowSeat(true);
        }
    }, [currentReservation]);

    const handleSeat = (e) => {
        e.preventDefault();
        setShowSeat(false);
        updateReservationStatus({ status: "seated" }, currentReservation.reservation_id)
        .then((response) => {
            setCurrentReservation(response);
            history.push(`/reservations/${currentReservation.reservation_id}/seat`);
        });
    }

    const handleCancelRes = (e) => {
        e.preventDefault();
        const confirmBox = window.confirm(
            "Do you want to cancel this reservation? This cannot be undone."
        );
        if (confirmBox === true) {
            updateReservationStatus({ status: "cancelled" }, currentReservation.reservation_id)
            .then((response) => {
                setCurrentReservation(response);
                history.go(0);
            });
        }
    }

    return (
        <div>
            <div>
                <p>ID: {currentReservation.reservation_id}</p>
                <p>FIRST NAME: {currentReservation.first_name}</p>
                <p>LAST NAME: {currentReservation.last_name}</p>
                <p>PHONE NUMBER: {currentReservation.mobile_number}</p>
                <p>DATE: {currentReservation.reservation_date}</p>
                <p>TIME: {currentReservation.reservation_time}</p>
                <p>#PEOPLE: {currentReservation.people}</p>
                <p data-reservation-id-status={currentReservation.reservation_id}>This Table is... {currentReservation.status ? currentReservation.status : "booked"}</p>
            </div>
            <div>
                {showSeat ? <a 
                            href={`/reservations/${currentReservation.reservation_id}/seat`}
                            onClick={handleSeat}
                            >
                        Seat
                            </a> : <div></div>}
                
            </div>
            <div>
                <a href={`/reservations/${currentReservation.reservation_id}/edit`}>
                    EDIT
                </a>
            </div>
            <div>
                <button data-reservation-id-cancel={currentReservation.reservation_id}
                        onClick={handleCancelRes}>
                    Cancel Reservation
                </button>
            </div>
        </div>
    )
}

export default ReservationDetail;