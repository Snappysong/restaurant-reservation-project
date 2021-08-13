import { useHistory } from "react-router-dom";

//MUST USE FORM COMPONENT.
function ReservationForm({ handleSubmit, formData, setFormData }) {

    const history = useHistory();
    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <form className="form-group" onSubmit={handleSubmit} >
            <label className="form-label">First Name:</label>
            <br />
                <input
                name="first_name"
                type="text"
                required
                onChange={(e) => setFormData({
                    // will this work?
                    first_name: e.target.value,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.first_name}
                className="form-control"
                />
            <br />
            <label className="form-label">Last Name:</label>
            <br />
                <input
                name="last_name"
                type="text"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: e.target.value,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={last_name}
                className="form-control"
                />
            <br />
            <label className="form-label">Mobile Number:</label>
            <br />
                <input
                name="mobile_number"
                type="text"
                required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: e.target.value,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
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