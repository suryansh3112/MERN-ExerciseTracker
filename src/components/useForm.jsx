import { useState, useEffect } from "react";
import axios from "axios";
import validate from "./validate";

const useForm = (submit) => {
  const [info, setInfo] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/")
      .then((response) => {
        if (response.data.length > 0) {
          setInfo({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submit();
    }
  }, [errors]);

  function handleChange(event) {
    const { name, value } = event.target;

    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleDate(d) {
    setInfo((prev) => {
      return {
        ...prev,
        date: d,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();

    setErrors(validate(info));
    setSubmitting(true);
  }

  return {
    info,
    errors,
    setInfo,
    handleChange,
    handleDate,
    handleClick,
  };
};

export default useForm;
