import React from "react";
import useForm from "./useForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import qs from "qs";

function CreateExercise() {
  const { info, errors, handleChange, handleDate, handleClick } = useForm(
    submit
  );

  function submit() {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post("http://localhost:5000/exercise/add", qs.stringify(info), config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  return (
    <div>
      <h1>Create New Exercise Log</h1>
      <form>
        <div className="form-group">
          <label>Username: </label>
          <select
            name="username"
            className="form-control"
            value={info.username}
            onChange={handleChange}
          >
            {info.users &&
              info.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            value={info.description}
            className="form-control"
            onChange={handleChange}
            required
          />
          {errors.description && <p className="errors">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Duration(in minutes):</label>
          <input
            required
            name="duration"
            type="number"
            className="form-control"
            onChange={handleChange}
            value={info.duration}
          />
          {errors.duration && <p className="errors">{errors.duration}</p>}
        </div>

        <div className="form-group">
          <label>Date:</label>
          <br />
          <DatePicker selected={info.date} onChange={handleDate} required />
          {errors.date && <p className="errors">{errors.date}</p>}
        </div>

        <button className="btn btn-lg btn-primary" onClick={handleClick}>
          Create Exercise log
        </button>
      </form>
    </div>
  );
}

export default CreateExercise;
