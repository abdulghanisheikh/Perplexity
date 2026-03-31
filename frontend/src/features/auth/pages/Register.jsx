import { Link, useNavigate } from "react-router";
import InputField from "../components/InputField";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    const {handleRegister} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const {username, email, password} = data;

        const {success, message} = await handleRegister({username, email, password});

        if(success) {
            navigate("/login");
        }
        console.log(message);
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-zinc-900 p-5 rounded-xl">
            <h1 className="text-sky-400 text-3xl font-semibold mb-1">Create an account</h1>
            <p className="text-zinc-500 text-sm mb-8">Fill in the details below to get started.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                value={data.username}
                label="Username"
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                ></InputField>

                <InputField
                label="Email address"
                value={data.email}
                type="text"
                name="email"
                placeholder="Enter email address"
                onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                ></InputField>

                <InputField
                label="Password"
                value={data.password}
                type="password"
                name="password"
                placeholder="Set password"
                onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                ></InputField>

                <button
                    type="submit"
                    className="w-full bg-sky-400 text-black font-semibold text-sm rounded-lg py-2.5 mt-2 cursor-pointer"
                >
                    Create Account
                </button>
            </form>

            <p className="text-zinc-600 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-zinc-400 cursor-pointer hover:text-white transition-colors">
                Sign in
            </Link>
            </p>
        </div>
        </div>
    );
}

export default Register;