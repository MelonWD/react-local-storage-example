# Local storage example

## Overview
Following this example, you can see how to handle input changes, form submissions, api requests, parent to child data sharing (through component input props) and state persistence using local storage (through a 3rd party library `use-persisted-state`).

## Sample code
Code for this example can be found below:

 - [Code sandbox](https://codesandbox.io/s/github/jcjmcclean/react-local-storage-example)
 - [Github repo](https://github.com/jcjmcclean/react-local-storage-example)

## Files
This example contains an auth module, within which we have an auth component, login page, login form component and auth module.

### auth.context.ts `AuthContext`
This provides context (data/state/functions) to components (or pages) within the auth module.

Create auth context function and export it.
```js
export const AuthContext = () => {
	...
}
```
Create a store for auth state (`hasAuth`), a way to set it (`setAuth`)  and set it's default state to false.
```js
const  [hasAuth, setAuth] =  AuthState(false);
```

Define an object to return from the context function. This contains the `hasAuth` state, a `login` function and a `logout` function.
```js
return {
	hasAuth,
	login: ...,
	logout: ...
};
```

The `login` function calls another function (`processLogin`) with the `auth` object which was passed to the `login` function. It then waits for a response and sets the auth state to the response value (`loginValue`).
```js
login: async auth => {
	// Attempt to login
	const loginValue = await processLogin(auth);
	// Update auth state based on API response
	setAuth(loginValue);
	// Return login response
	return loginValue;
}
```

The `logout` function simply sets the `hasAuth` state on `AuthContext` to `false`.
```js
logout:  ()  =>  setAuth(false)
```

### auth.context.ts `processLogin`
The `auth.context.ts` file also contains another exported function `processLogin`. This accepts an `auth` argument and returns a callback to an API request handler using the `axios` library.

```js
export async function processLogin(auth) {
	...
}
```

Create a `POST` request to the login endpoint, sending the `auth` object which was provided to the `processLogin` function, handle and return the response.
```js
return axios.post("https://reqres.in/api/login", auth).then(
  res => {
    // If we got a user token
    return !!res["data"]["token"];
  },
  error => {
    console.log("error", error);
    return false;
  }
);
```

### login.page.tsx `LoginPage`
This is the outer template, which is included in the main app component. The location of this page is definitely not ideal - I couldn't decide if it should live in `modules/auth` or `modules/login`.

Create the login page function component.
```js
const LoginPage: React.FC = () => {
	 ...
};
```

Call the `AuthContext` function and make it accessible within this component.
```js
const authContext = AuthContext();
```

Render the component. If the user is logged in, `AuthComponent` will be rendered. If the user is not logged in `LoginFormComponent` will be rendered.
```js
return (
  <div>
    {/* If user is logged in */}
    {authContext.hasAuth ? (
      <AuthComponent authContext={authContext} />
    ) : (
      <LoginFormComponent authContext={authContext} />
    )}
  </div>
);
```

### auth.component.tsx `AuthComponent`
This component displays the current login state and a logout button. To be honest, this could probably be called `LogoutComponent`.

Create the functional component, with a props argument.
```js
const AuthComponent = (props: any) => {
	...
};
```

Get auth context from the component's input props.
```js
const authContext = props.authContext;
```

Create a store for a button element, if logged in - set it to a logout button.
```js
// Store for logout button element
let button;
// if user has auth
if (authContext.hasAuth) {
  // Button to show logout + process logout on click
  button = <button onClick={authContext.logout}>Logout</button>;
}
```

Render the component, showing the login state and logout button (if set).
```js
return (
  <div>
    <h2>State: {authContext.hasAuth ? "Logged in" : "Logged out"}</h2>
    {button}
  </div>
);
```

### login-form.component.tsx `LoginFormComponent`
This is the login form function component, it renders the login form and handles input change and form submission events.

Create the login form function component, with and argument for input props. Access auth context from the component's props.
```js
function LoginForm(props: any) {
	// Get authContext from props
	const authContext = props.authContext;
	...
}
```

Create a component state to store the state of the login form.
```js
// Create form state on component
const [form, setForm] = React.useState({
  // Successful login credentials
  email: "eve.holt@reqres.in",
  password: "cityslicka",
  error: ""
});
```

Handle login form submission - call the login function with the form state's email and password fields, then wait for the promise to resolve. If `authContext.login` returns `false` an error will be set on the login form's state.
```js
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
```

When the email or password fields change, update the form state on the component with the new value of the changed field.
```js
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
```
