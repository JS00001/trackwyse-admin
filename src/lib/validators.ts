/*
  Validate Login Form

  Required fields: email, password
  Email must be valid
  Password must be valid
*/
const validateLoginInput = (input: LoginInput) => {
  const errors: LoginInput = {
    email: "",
    password: "",
  };

  if (!input.email) {
    errors.email = "Email field is required";
  }

  if (!input.password) {
    errors.password = "Password field is required";
  }

  // Test if the email is valid
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(input.email)) {
    errors.email = "Invalid email";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

export { validateLoginInput };
