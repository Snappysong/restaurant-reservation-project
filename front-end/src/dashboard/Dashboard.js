import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetail from "./ReservationDetail";
import TableDetail from "./TableDetail";

function Dashboard({ date }) {

  const [reservations, setReservations] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState(null);
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
          <h1>Your Dashboard</h1>
        </div>  

        <div className="d-flex mb-3 justify-content-around">
          <button className="btn btn-info" onClick={handlePreviousDay}>Previous Day</button>
          <button className="btn btn-dark" onClick={handleTodayDay}>Today</button>
          <button className="btn btn-info" onClick={handleNextDay}>Next Day</button>
        </div>

        <ErrorAlert error={tablesError} />
        <ErrorAlert error={reservationsError} />

        <div className="container">
          <div className="d-flex mb-3 justify-content-center">
            <h4>Date: {viewDate}</h4>
          </div>
          <div className="row">
            {reservations && reservations.map((res) => (
              <div className="col-md-6 mb-3" key={res.reservation_id}>
                <ReservationDetail reservation={res} />
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <h3 className="d-flex m-3 justify-content-center">Tables</h3>
          <div className="row">
              {tables && tables.map((table) => (
                <div className="col-md-6 mb-3" key={table.table_id}>
                  <TableDetail table={table} reservations={reservations}/>
                </div>
              ))}
          </div>
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
