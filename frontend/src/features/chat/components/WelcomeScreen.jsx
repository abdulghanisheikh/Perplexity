import { SiCodeforces } from "react-icons/si";
import { IoMdArrowRoundUp } from "react-icons/io";

const WelcomeScreen = ({ username, handleSendMessageClick, userMessage, setUserMessage, loading }) => {
	return (
	<main className="h-full w-full flex flex-col items-center pt-25">

		<div className="h-40 w-40 border-2 border-gray-200 hover:shadow-[0_2px_70px_rgba(30,120,255,0.5)] shadow-[0_2px_50px_rgba(30,100,255,0.5)] duration-300 ease-in-out text-white flex items-center justify-center rounded-3xl bg-zinc-900 mb-5">
			<SiCodeforces size={100} color="skyblue" />
		</div>

		<h2 className="text-xl font-semibold self-start ml-60">Hi <span className="text-sky-500 text-2xl">{username}👋</span></h2>

		<h1 className="font-semibold text-6xl">Welcome to <span className="font-bold text-sky-500">Perplexity</span></h1>

		<form onSubmit={handleSendMessageClick} className="userInput rounded-xl bg-neutral-950 border border-white/50 mt-8 flex items-center justify-between w-150 gap-2">
			<textarea type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="How can I help you today?" className="h-35 w-150 text-sm outline-none text-white/60 resize-none p-3" />
			
			<button disabled={!userMessage.trim() || loading} type="submit" className={`rounded-full p-2 bg-sky-600 self-start mt-2 mr-2
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