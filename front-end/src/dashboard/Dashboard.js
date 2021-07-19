import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationDetail from "./ReservationDetail";
import { useLocation, useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [viewDate, setViewDate] = useState(date);

  const history = useHistory();
  const location = useLocation();
  const searchedDate = location.search.slice(-10);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    if (viewDate === date) {
      listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    } else {
      listReservations({ viewDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    }
    if (searchedDate && searchedDate !== "") {
      setViewDate(searchedDate);
    };
    return () => abortController.abort();
  }

  useEffect(loadDashboard, [date, viewDate, location.search, searchedDate]);


//functions for buttons for changing days
  const handlePreviousDay = (e) => {
    e.preventDefault();
    history.push(`/dashboard`)
    const prevDay = previous(viewDate);
    setViewDate(prevDay);
  }
  const handleNextDay = (e) => {
    e.preventDefault();
    history.push(`/dashboard`)
    const nextDay = next(viewDate);
    setViewDate(nextDay);
  }
  const handleTodayDay = (e) => {
    e.preventDefault();
    history.push(`/dashboard`)
    setViewDate(date);
  }

  if (reservations) {
    return (
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
          <h3>{viewDate}</h3>
          <button onClick={handleTodayDay}>Today</button>
          <br />
          <button onClick={handlePreviousDay}>Previous Day</button>
          <button onClick={handleNextDay}>Next Day</button>
        </div>
        <ErrorAlert error={reservationsError} />
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
      </main>
    ); 
  } else {
    return (
      <div>
        <p>
          This is Loading...
        </p>
      </div>
    )
  }
}

export default Dashboard;
