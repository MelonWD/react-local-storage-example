// Import react dependencies
import * as React from "react";

function LoginForm(props: any) {
  const authContext = props.authContext;

  const [form, setForm] = React.useState({
    // Successful login credentials
    email: "eve.holt@reqres.in",
    password: "cityslicka",
    error: ""
  });

  const handleSubmit = event => {
    event.preventDefault();

    authContext
      .login({
        email: form.email,
        password: form.password
      })
      .then(response => {
        if (!response) {
          setForm({ ...form, error: "Login failed, please try again" });
        }
      });
  };

  const handleEmailChange = event => {
    setForm({
      ...form,
      email: event.target.value
    });
  };

  const handlePasswordChange = event => {
    setForm({
      ...form,
      password: event.target.value
    });
  };

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
