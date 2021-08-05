import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationDetail from "../dashboard/ReservationDetail";

function SearchPhone() {
    const [mobile_number, setMobile_number] = useState("")
    const [reservations, setReservations] = useState(null)
    const [showError, setShowError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataParams = {
            mobile_number,
        };
        listReservations(dataParams)
        .then((response) => {
            setReservations(response);
        })
    }

    useEffect(() => {
        if (reservations && reservations.length === 0) {
            setShowError(true);
        }
    }, [reservations])

    return (
        <div>
            {showError && (
                <p className="alert alert-danger">
                    No reservations found.
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <label>Search By Phone Number!</label>
                <br />
                    <input
                    name="mobile_number"
                    type="text"
                    placeholder="Enter a customer's phone number"
                    required
                    onChange={(e) => setMobile_number(e.target.value)}
                    value={mobile_number}
                    />
                <br />
                <button type="submit">FIND</button>
            </form>
            <div>
                <h4>Reservations!</h4>
                <ul>
                    {reservations && reservations.map((res) => (
                        <li key={res.reservation_id}>
                            <ReservationDetail reservation={res} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchPhone;