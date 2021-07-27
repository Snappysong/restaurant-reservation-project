import React from "react";
import { useHistory } from "react-router-dom";

function ReservationDetail({reservation}) {
    const history = useHistory();
    const { reservation_id } = reservation;
    return (
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

            <button 
            href={`/reservations/${reservation_id}/seat`}
            onClick={(e) => history.push(`/reservations/${reservation_id}/seat`)}
            >
                Seat
            </button>
        </div>
    )
}

export default ReservationDetail;