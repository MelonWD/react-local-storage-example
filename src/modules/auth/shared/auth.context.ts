// Import third party dependencies
import axios from "axios";
import createPersistedState from "use-persisted-state";

/** Create persisted state to store auth state */
export const AuthState = createPersistedState("hasAuth");

/** Create context to store and manipulate auth state */
export const AuthContext = () => {
  // Create auth state hook
  const [hasAuth, setAuth] = AuthState(false);

  // Build object to return
  return {
    // Current state of user's auth boolean
    hasAuth,
    // Function to process login with state hook
    login: async auth => {
      // Attempt to login
      const loginValue = await processLogin(auth);
      // Update auth state based on API response
      setAuth(loginValue);
      // Return login response
      return loginValue;
    },
    // Function to process logout with state hook
    logout: () => setAuth(false)
  };
};

/**
 * Process login request from API
 * @returns promise from api request to login endpoint
 */
export async function processLogin(auth) {
  // Create api request to login endpoint with auth object
  return axios.post("https://reqres.in/api/login", auth).then(
    res => {
      // If we got a user token
      if (res["data"]["token"]) {
        return true;
      }
      return false;
    },
    error => {
      console.log("error", error);
      return false;
    }
  );
}

export default AuthContext;
