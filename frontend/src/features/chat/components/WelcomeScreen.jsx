const WelcomeScreen = ({username}) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <h2 className="text-xl self-start ml-26 font-semibold">Hi <span className="text-sky-500 text-2xl">{username}👋</span></h2>
        <h1 className="font-semibold text-6xl">Welcome to <span className="font-bold text-sky-500">Perplexity</span></h1>
    </div>
  )
}

export default WelcomeScreen;