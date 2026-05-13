import { IoMdArrowRoundUp } from "react-icons/io";

const InputBox = ({handleSendMessage, userMessage, setUserMessage, loading}) => {
  return (
    <footer>
        <form onSubmit={handleSendMessage} className="userInput bg-neutral-950 border border-white/50 w-2/3 flex items-center justify-between px-5 py-2 rounded-full fixed bottom-5 right-15">
            <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Type your message here..." className="w-[85%] text-sm outline-none" />
            
            <button disabled={!userMessage.trim() || loading} type="submit" className={`rounded-full p-1.5 text-sky-500 bg-sky-600
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