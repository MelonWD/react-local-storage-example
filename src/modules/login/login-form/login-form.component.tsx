// Import react dependencies
import * as React from "react";

/** Renders and handles logic for login form */
function LoginForm(props: any) {
  // Get authContext from props
  const authContext = props.authContext;

  // Create form state on component
  const [form, setForm] = React.useState({
    // Successful login credentials
    email: "eve.holt@reqres.in",
    password: "cityslicka",
    error: ""
  });

  /** Handles login form submission */
  const handleSubmit = event => {
    event.preventDefault();

    authContext
      .login({
        email: form.email,
        password: form.password
      })
      .then(response => {
        // If login failed
        if (!response) {
          // Update error on form state
          setForm({
            ...form,
            error: "Login failed, please try again"
          });
        }
      });
  };

  /** Handles email field changes */
  const handleEmailChange = event => {
    // Updates form state
    setForm({
      ...form,
      email: event.target.value
    });
  };

  /** Handles password field changes */
  const handlePasswordChange = event => {
    // Updates form state
    setForm({
      ...form,
      password: event.target.value
    });
  };

  // Renders login form component
  return (
    <div>
      <h2>Login</h2>
      Default credentials:
      <ul>
        <li>email: "eve.holt@reqres.in"</li>
        <li>password: "cityslicka"</li>
      </ul>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "red" }}>{form.error}</p>
    </div>
  );
}

export default LoginForm;
