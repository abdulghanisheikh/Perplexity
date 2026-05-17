import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = ({click, sidebarOpen, setSidebarOpen}) => {
    return (
        <nav className="nav lg:static bg-zinc-900 fixed top-0 z-30 flex w-full py-3 px-5 justify-between items-center text-white">

            <button onClick={click} className="lg:px-3 px-2 py-0.5 rounded-md text-xs border border-red-400 bg-red-600/20 hover:bg-red-600/30 active:scale-90 duration-300 ease-in-out cursor-pointer">Logout</button>

            <h1 className="lg:text-3xl text-2xl font-semibold text-sky-500">Perplexity</h1>
            
            <div 
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <IoCloseSharp size={22} /> : <IoMenu size={22} />}
            </div>
        </nav>
    )
}

export default Navbar;