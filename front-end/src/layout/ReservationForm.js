
//MUST USE FORM COMPONENT.
function ReservationForm({ reservation }) {


    return (
        <form className="form-group" onSubmit={handleSubmit} >
            <label>First Name:</label>
            <br />
                <input
                name="first_name"
                type="text"
                required
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
                className="form-control"
                />
            <br />
            <label>Last Name:</label>
            <br />
                <input
                name="last_name"
                type="text"
                required
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
                className="form-control"
                />
            <br />
            <label>Mobile Number:</label>
            <br />
                <input
                name="mobile_number"
                type="text"
                required
                onChange={(e) => setMobile_number(e.target.value)}
                value={mobile_number}
                className="form-control"
                />
            <br />
            <label>Reservation Date:</label>
            <br />
                <input
                name="reservation_date"
                type="date"
                required
                onChange={(e) => setReservation_date(e.target.value)}
                value={reservation_date}
                className="form-control"
                />
            <br />
            <label>Reservation Time:</label>
            <br />
                <input
                name="reservation_time"
                type="time"
                required
                onChange={(e) => setReservation_time(e.target.value)}
                value={reservation_time}
                className="form-control"
                />
            <br />
            <label>Amount of People:</label>
            <br />
                <input
                name="people"
                type="number"
                required
                onChange={(e) => setPeople(e.target.valueAsNumber)}
                value={people}
                className="form-control"
                />
            <br />

            <div className="d-flex justify-content-around">
                <button className="btn btn-primary" type="submit">submit</button>
                <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button>
            </div>
        </form>
    )
}

export default ReservationForm;