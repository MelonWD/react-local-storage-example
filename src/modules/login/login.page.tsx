// Import react dependencies
import * as React from "react";
// Import app dependencies
import AuthComponent from "../auth/auth.component";
import AuthContext from "../auth/shared/auth.context";
import LoginFormComponent from "./login-form/login-form.component";

/** Create login component */
const LoginPage: React.FC = () => {
  // Get instance of auth context
  const authContext = AuthContext();

  // Render component
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
};

export default LoginPage;
