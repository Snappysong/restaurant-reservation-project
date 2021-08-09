import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetail from "./ReservationDetail";
import TableDetail from "./TableDetail";

function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [viewDate, setViewDate] = useState(date);
  
  const history = useHistory();
  const location = useLocation();
  const searchedDate = location.search.slice(-10);

  useEffect(() => {
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
    }
    return () => abortController.abort();
  }, [date, viewDate, location.search, searchedDate]);

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables()
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }, [history]);

  const handlePreviousDay = (e) => {
    e.preventDefault();
    setViewDate(previous(viewDate));
  }
  const handleNextDay = (e) => {
    e.preventDefault();
    setViewDate(next(viewDate));
  }
  const handleTodayDay = (e) => {
    e.preventDefault();
    setViewDate(date);
  }

  if (reservations) {
    return (
      <main>

        <div className="d-flex mb-3 justify-content-center">
          <h1>Dashboard</h1>
        </div>  

        <div className="d-flex mb-3 justify-content-around">
          <button className="btn btn-info" onClick={handlePreviousDay}>Previous Day</button>
          <button className="btn btn-dark" onClick={handleTodayDay}>Today</button>
          <button className="btn btn-info" onClick={handleNextDay}>Next Day</button>
        </div>

        <div className="d-flex mb-3 justify-content-center">
          <h4>Date: {viewDate}</h4>
        </div>

        <ErrorAlert error={tablesError} />
        <ErrorAlert error={reservationsError} />

        <div>
            <ul className="list-group list-group-flush">
              {reservations && reservations.map((res) => (
                <li className="list-group-item list-background" key={res.reservation_id}>
                  <ReservationDetail reservation={res} />
                </li>
              ))}
            </ul>
        </div>

        <div>
          <h3 className="d-flex m-3 justify-content-center">Tables</h3>
            <ul className="list-group list-group-flush">
              {tables && tables.map((table) => (
                <li className="list-group-item list-background" key={table.table_id}>
                  <TableDetail table={table} reservations={reservations}/>
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
