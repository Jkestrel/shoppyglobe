import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // auto-login after register
      dispatch(
        loginSuccess({
          user: { id: data._id, email: data.email },
          token: data.token,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>

      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
