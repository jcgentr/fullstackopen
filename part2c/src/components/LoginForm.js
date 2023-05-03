import { useState } from "react";
import { loginService } from "../services/login";
import { notesService } from "../services/notes";
import PropTypes from "prop-types";

export const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInNoteAppUser", JSON.stringify(user));
      notesService.setToken(user.token);
      props.setUser(user);
      props.setToastMessage({
        type: "success",
        message: `Welcome back ${user.name}!`,
      });
      setTimeout(() => props.setToastMessage(null), 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      props.setToastMessage({
        type: "error",
        message: "Wrong username or password",
      });
      setTimeout(() => props.setToastMessage(null), 5000);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToastMessage: PropTypes.func.isRequired,
};
