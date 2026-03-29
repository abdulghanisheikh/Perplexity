import { useState } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router";

const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-3xl font-semibold mb-1">Welcome back</h1>
        <p className="text-zinc-500 text-sm mb-8">Sign in to your account to continue.</p>

        <form className="space-y-4">

          <InputField
          type="text"
          name="username"
          placeholder="Enter username"
          label="Username"
          value={data.username}
          onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
          ></InputField>

          <InputField
          type="password"
          label="password"
          placeholder="Enter password"
          name="password"
          value={data.password}
          onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
          ></InputField>

          <button
            type="submit"
            className="w-full bg-white/60 text-zinc-950 font-medium text-sm rounded-lg py-2.5 hover:bg-zinc-200 transition-colors mt-2 cursor-pointer"
          >
            Sign in
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