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
        <div className="card">
            <div className="card-body ">
                <h6 className="card-title text-center">ID: {currentReservation.reservation_id}</h6>
                <p className="card-text text-right">FIRST NAME: {currentReservation.first_name}</p>
                <p className="card-text text-right">LAST NAME: {currentReservation.last_name}</p>
                <p className="card-text text-right">PHONE NUMBER: {currentReservation.mobile_number}</p>
                <p className="card-text text-right">DATE: {currentReservation.reservation_date}</p>
                <p className="card-text text-right">TIME: {currentReservation.reservation_time}</p>
                <p className="card-text text-right">#PEOPLE: {currentReservation.people}</p>
                <p className="card-text text-right" data-reservation-id-status={currentReservation.reservation_id}>This Table is... {currentReservation.status ? currentReservation.status : "booked"}</p>

                <div className="d-flex justify-content-around">
                    {showSeat ? <a 
                                href={`/reservations/${currentReservation.reservation_id}/seat`}
                                onClick={handleSeat}
                                className="card-link"
                                >
                            Seat
                                </a> : <div></div>}
                    
                    <a 
                        href={`/reservations/${currentReservation.reservation_id}/edit`}
                        className="card-link"
                    >
                        EDIT
                    </a>
                    <button data-reservation-id-cancel={currentReservation.reservation_id}
                            onClick={handleCancelRes}
                            className="btn btn-danger">
                        Cancel Reservation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReservationDetail;