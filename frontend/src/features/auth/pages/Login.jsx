import { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
	const [data, setData] = useState({
		username: "",
		password: ""
	});

	const navigate = useNavigate();
	const { handleLogin } = useAuth();
	const user = useSelector(state => state.auth.user);
	const loading = useSelector(state => state.auth.loading);

	// User already loggedIn
	if(!loading && user) {
		navigate("/");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { username, password } = data;
		const { success, message } = await handleLogin({ username, password });

		if(success) navigate("/");
		console.log(message);
	}

	return (
		<div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
			<div className="w-full max-w-sm bg-zinc-900 p-5 rounded-xl">
				<h1 className="text-sky-400 text-3xl font-semibold mb-1">Welcome back</h1>
				<p className="text-zinc-500 text-sm mb-8">Sign in to your account to continue.</p>

				<form onSubmit={handleSubmit} className="space-y-4">

					<InputField
						type="text"
						name="username"
						placeholder="Enter username"
						label="Username"
						value={data.username}
						onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
					></InputField>

					<InputField
						type="password"
						label="password"
						placeholder="Enter password"
						name="password"
						value={data.password}
						onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
					></InputField>

					<button
						type="submit"
						className="w-full bg-sky-400 active:scale-95 duration-300 ease-in-out text-black font-semibold text-sm rounded-lg py-2.5 mt-2 cursor-pointer"
					>
						Login
					</button>
				</form>

				<p className="text-zinc-600 text-sm text-center mt-6">
					Don't have an account?{" "}
					<Link to="/register" className="text-zinc-400 cursor-pointer hover:text-white transition-colors">
						Create One
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;