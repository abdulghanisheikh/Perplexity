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

		<form onSubmit={handleSendMessageClick} className="userInput mt-8 flex items-center justify-center w-180 gap-4">
			<textarea type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="How can I help you today?" className="py-3 h-35 w-150 text-sm bg-neutral-950 border border-white/50 outline-none hover:bg-neutral-900 duration-300 text-white/60 ease-in-out px-4 resize-none rounded-2xl" />
			
			<button disabled={!userMessage.trim() || loading} type="submit" className={`border border-white/50 rounded-full p-2.5 text-sky-500 bg-neutral-950 self-start
			${!userMessage.trim() || loading ?
			'opacity-50' : 
			'cursor-pointer active:scale-90 duration-300 ease-in-out'}`}>
				<IoMdArrowRoundUp size={30}/>
			</button>
		</form>
	</main>
	)
}

export default WelcomeScreen;