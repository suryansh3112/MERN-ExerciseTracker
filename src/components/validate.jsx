function validate(info) {
  let errors = {};

  if (!info.description) {
    errors.description = "Please enter the description.";
  }

  if (!info.duration) {
    errors.duration = "Please enter the duration.";
  }

  if (!info.date) {
    errors.date = "Please enter the date.";
  }

  return errors;
}

export default validate;
