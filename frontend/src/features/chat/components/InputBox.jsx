import { IoMdArrowRoundUp } from "react-icons/io";

const InputBox = ({handleSendMessage, userMessage, setUserMessage, loading}) => {
  return (
    <footer>
        <form onSubmit={handleSendMessage} className="userInput w-2/3 flex gap-3 justify-center rounded-lg fixed bottom-5 right-15 px-3">
            <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Type your message here..." className="w-[85%] py-3 text-sm bg-neutral-950 border border-white/50 outline-none hover:bg-neutral-900 duration-300 ease-in-out px-2 rounded-lg" />
            
            <button disabled={!userMessage.trim() || loading} type="submit" className={`border border-white/50 rounded-full p-2.5 text-sky-500 bg-neutral-950
            ${!userMessage.trim() || loading ?
            'opacity-50' : 
            'cursor-pointer active:scale-90 duration-300 ease-in-out'}`}>
                <IoMdArrowRoundUp size={30}/>
            </button>
        </form>
    </footer>
  )
}

export default InputBox;