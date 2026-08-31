import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Login.css";

function Login() {
	const [username, setUsername] = useState("");
	const [, setCookie] = useCookies(["user-id"]);
	const navigate = useNavigate();

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const response = await fetch(
			`http://localhost:8000/login?username=${encodeURIComponent(username)}`,
			{
				method: "POST",
				credentials: "include",
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		const data = await response.json();

		setCookie("user-id", data.user_id);
		navigate("/accounts");
	}

	return (
		<div className="login-page">
			<div className="login-card">
				<div className="login-header">
					<div className="login-brand">
						<div className="login-brand-mark">B</div>
						Bank App
					</div>

					<h1>Welcome Back</h1>
					<p className="login-subtitle">Log in to your account</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your username"
							required
						/>
					</div>
					<div className="login-options">
						<label className="remember-me">
							<input type="checkbox" /> <span>Remember me</span>
						</label>
					</div>
					<button type="submit" className="login-button">
						Log In
					</button>
				</form>
				<p className="signup-text">
					Don't have an account? <a href="/register">Sign up</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
