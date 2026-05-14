import { SiCodeforces } from "react-icons/si";
import { IoMdArrowRoundUp } from "react-icons/io";

const WelcomeScreen = ({ username, handleSendMessageClick, userMessage, setUserMessage, loading }) => {
	return (
	<main className="flex flex-col items-center justify-center h-full lg:w-[75%] w-full">

		<div className="lg:h-40 lg:w-40 p-3 w-25 h-25 rounded-2xl border-2 border-gray-200 hover:shadow-[0_2px_70px_rgba(30,120,255,0.5)] shadow-[0_2px_50px_rgba(30,100,255,0.5)] duration-300 ease-in-out text-white flex items-center justify-center lg:rounded-3xl bg-zinc-900 lg:mb-5 mb-10">
			<SiCodeforces size={100} color="skyblue" />
		</div>

		<h2 className="lg:text-xl text-lg font-semibold self-start ml-13 lg:ml-60">Hi <span className="text-sky-500 text-xl lg:text-2xl">{username}👋</span></h2>

		<h1 className="font-semibold lg:text-6xl text-2xl">Welcome to <span className="font-bold text-sky-500">Perplexity</span></h1>

		<form onSubmit={handleSendMessageClick} className="userInput rounded-xl border border-white/50 lg:mt-8 mt-4 flex items-center justify-center lg:w-150 w-[90%] gap-2">
			<textarea type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="How can I help you today?" className="h-35 w-full text-sm outline-none text-white resize-none p-3" />
			
			<button disabled={!userMessage.trim() || loading} type="submit" className={`self-end rounded-full p-1.5 bg-sky-600 mb-3 mr-3
			${!userMessage.trim() || loading ?
			'opacity-50' : 
			'cursor-pointer active:scale-90 duration-300 ease-in-out'}`}>
				<IoMdArrowRoundUp color="white" size={30}/>
			</button>
		</form>
	</main>
	)
}

export default WelcomeScreen;