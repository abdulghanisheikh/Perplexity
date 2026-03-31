import { useSelector } from "react-redux";

const Dashboard = () => {
    const {user} = useSelector(state => state.auth);

    console.log("user:", user);

    return <main className="bg-black h-screen w-screen">
        <h1 className="text-4xl text-white font-semibold">Dashboard</h1>
    </main>
}

export default Dashboard;