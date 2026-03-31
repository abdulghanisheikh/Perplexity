import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);

    return <main className="bg-black h-screen w-screen">

        <div className="nav flex justify-around items-center p-2 text-white bg-zinc-900">
            <h1 className="lg:text-3xl font-semibold">Welcome to {user.username}</h1>
            <button className="px-5 py-1 rounded-lg lg:text-sm text-xs border border-red-400 bg-red-600/20 active:scale-90 duration-300 ease-in-out cursor-pointer">Logout</button>
        </div>
    </main>
}

export default Dashboard;