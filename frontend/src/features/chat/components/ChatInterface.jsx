import LoadingAIMessage from "./LoadingAIMessage";
import ReactMarkdown from "react-markdown";
import WelcomeScreen from "../components/WelcomeScreen.jsx";
import InputBox from "../components/InputBox.jsx";

const ChatInterface = ({messages, handleSendMessageClick, userMessage, setUserMessage, loading}) => {

    return (
    <section style={{
            scrollbarWidth: 'none'
        }} className="chatting min-h-screen lg:w-[75%] w-full overflow-y-auto relative flex flex-col items-center lg:px-40 lg:py-5 py-2 gap-2 lg:pb-30 pb-25 px-5">

        {messages.map((msg, index) => {
            return <div key={index} className={`user p-2 rounded-lg lg:text-sm text-xs
            ${msg.role === "ai" ? "w-[80%] self-start" : "w-fit bg-neutral-900 self-end shadow-sm shadow-black/50 rounded-br-none lg:mt-5 mt-3"}`}>

                {msg.role === "ai" ? (
                    msg.content === "LOADING" ?
                    <LoadingAIMessage /> :
                    <ReactMarkdown
                    components={{
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({children}) => <p className="mb-2 list-disc pl-5">{children}</p>,
                        ol: ({children}) => <p className="mb-2 list-decimal pl-5">{children}</p>,
                        code: ({children}) => <code className="rounded bg-white/10 px-1 py-0.5">{children}</code>,
                        pre: ({children}) => <pre className="mb-4 overflow-x-auto rounded-xl bg-black/30 p-3">{children}</pre>
                    }}
                    >
                        {msg.content}
                    </ReactMarkdown>
                ) : (
                    <p>{msg.content}</p>
                )}
            </div>
        })}

        {/* fixed user input box */}
        <InputBox
        handleSendMessage={handleSendMessageClick}
        userMessage={userMessage} 
        setUserMessage={setUserMessage}
        loading={loading} />

    </section>
    )
}

export default ChatInterface;