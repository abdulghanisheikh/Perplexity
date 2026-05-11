import { SiCodeforces } from "react-icons/si";

const WelcomeScreen = ({username}) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
		<div className="h-40 w-40 border-2 border-gray-200 hover:shadow-[0_2px_70px_rgba(30,120,255,0.5)] shadow-[0_2px_50px_rgba(30,100,255,0.5)] duration-300 ease-in-out text-white flex items-center justify-center rounded-3xl bg-zinc-900">
			<SiCodeforces size={100} />
		</div>
        <h2 className="text-xl self-start ml-26 font-semibold">Hi <span className="text-sky-500 text-2xl">{username}👋</span></h2>
        <h1 className="font-semibold text-6xl">Welcome to <span className="font-bold text-sky-500">Perplexity</span></h1>
    </div>
	)
}

export default WelcomeScreen;