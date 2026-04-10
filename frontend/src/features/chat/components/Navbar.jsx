const Navbar = ({click}) => {
    return (
        <nav className="nav flex justify-around items-center text-white">
            <h1 className="lg:text-3xl font-semibold text-sky-500">Perplexity</h1>
            <button onClick={click} className="px-5 py-0.5 rounded-sm lg:text-sm text-xs border border-red-400 bg-red-600/20 active:scale-90 duration-300 ease-in-out cursor-pointer">Logout</button>
        </nav>
    )
}

export default Navbar;