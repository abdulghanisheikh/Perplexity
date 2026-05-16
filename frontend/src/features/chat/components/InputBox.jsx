import { IoMdArrowRoundUp } from "react-icons/io";

const InputBox = ({handleSendMessage, userMessage, setUserMessage, loading}) => {
  return (
    <footer>
        <form onSubmit={handleSendMessage} className="fixed -translate-x-[50%] -translate-y-[50%] bottom-0 userInput bg-zinc-900 border border-white/50 lg:w-[60%] w-[90%] flex items-center justify-between gap-5 lg:px-5 lg:py-2 py-1.5 px-3 rounded-full text-xs">
            <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Type your message here..." className="w-[85%] text-sm outline-none" />
            
            <button disabled={!userMessage.trim() || loading} type="submit" className={`rounded-full p-1 text-sky-500 bg-sky-600
            ${!userMessage.trim() || loading ?
            'opacity-50' :
            'cursor-pointer active:scale-90 duration-300 ease-in-out'}`}>
                <IoMdArrowRoundUp color="white" size={30}/>
            </button>
        </form>
    </footer>
  )
}

export default InputBox;