// Import react dependencies
import * as React from "react";

/** Create auth component */
const AuthComponent = (props: any) => {
  // Get instance of auth context
  const authContext = props.authContext;

  // Store for logout button element
  let button;
  // if user has auth
  if (authContext.hasAuth) {
    // Button to show logout + process logout on click
    button = <button onClick={authContext.logout}>Logout</button>;
  }

  // Render component
  return (
    <div>
      <h2>State: {authContext.hasAuth ? "Logged in" : "Logged out"}</h2>
      {button}
    </div>
  );
};

export default AuthComponent;
