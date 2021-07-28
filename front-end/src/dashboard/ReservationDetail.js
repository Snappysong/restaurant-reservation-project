import React from "react";
import { Link } from "react-router-dom";

function ReservationDetail({reservation}) {
    const { reservation_id } = reservation;
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
            </div>
            <div>
                <Link to={`/reservations/${reservation_id}/seat`}>
                        "Seat"
                </Link>
            </div>
        </div>
    )
}

export default ReservationDetail;