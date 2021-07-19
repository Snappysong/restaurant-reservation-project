import React from "react";

function ReservationDetail({reservation}) {

    return (
        <div>
            ID: {reservation.reservation_id}
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
    )
}

export default ReservationDetail;