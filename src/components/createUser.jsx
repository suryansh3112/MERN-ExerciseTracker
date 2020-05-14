import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

function CreateUser() {
  const [user, setUser] = useState({ username: "" });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    console.log(event.target);
    setUser({ username: event.target.value });
  }

  function submit() {
    const a = {
      username: user.username,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post("http://localhost:5000/user/add", qs.stringify(a), config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setUser({ username: "" });
  }

  function validate() {
    let err = {};
    if (!user.username) {
      err.username = "Please enter the username";
      setErrors(err);
      return false;
    } else if (user.username.length < 3) {
      err.username = "Username must consist atleast 3 characters";
      setErrors(err);
      return false;
    }
    return true;
  }

  function handleClick(event) {
    event.preventDefault();

    if (validate()) {
      submit();
    }
  }

  return (
    <div>
      <h1>Create New User</h1>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={user.username}
            name="username"
          />
          {errors.username && <p className="errors">{errors.username}</p>}
        </div>

        <button className="btn btn-lg btn-primary" onClick={handleClick}>
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
