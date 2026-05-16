import {useState} from "react";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";

const Sidebar = ({handleLogoutClick, chat, chatList, currentChatId, messagesObject, handleDeleteChatClick}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
    return <aside className="lg:max-w-[25%] w-full flex lg:flex-col flex-row gap-8 bg-black/10">
        {/* navbar */}
        <Navbar click={handleLogoutClick} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className={`lg:border-none lg:bg-black/10 bg-zinc-900 lg:flex flex-col lg:gap-8 lg:rounded-none lg:static lg:w-full lg:py-0 py-5 px-3 ${sidebarOpen ? 'fixed top-12 right-0 z-30 flex flex-col gap-8 w-[80%] h-full border-l-2 border-t-2 border-zinc-800 rounded-l-xl' : 'hidden'}`}>

            {/* new chat button */}
            <div
            onClick={chat.handleStartNewChat}
            className={`chat hover:scale-101 border border-white/50 flex lg:static justify-center items-center duration-300 ease-in-out cursor-pointer self-center text-xs lg:text-md lg:font-semibold rounded-xl hover:bg-neutral-800 lg:py-2 overflow-x-hidden gap-1 w-full lg:w-[80%] py-1.5`}>
                <p>New Chat</p>
                <IoMdAdd className="lg:text-lg lg:font-semibold" />
            </div>

            {/* chats */}
            <div className={`chats flex flex-col w-full lg:gap-1 gap-2 lg:px-4 px-1`}>

                <p className="lg:text-sm text-xs opacity-40">Recent Chats</p>

                {chatList && Object.keys(chatList).reverse().map((chatId) => {
                    return <div
                    key={chatId}
                    className="chat flex items-center lg:gap-3 gap-1">

                        <div
                        className={`hover:scale-101 duration-300 ease-in-out cursor-pointer w-[90%] rounded-lg flex items-center lg:px-2 p-1.5 truncate ${currentChatId === chatId ? 'bg-zinc-800' : 'bg-zinc-900'}`}
                        style={{
                            scrollbarWidth: "none"
                        }}
                        onClick={() => chat.handleOpenChat({activeChatId: chatId, message: messagesObject})}
                        >
                            <p className="text-xs">{chatList[chatId].title}</p>
                        </div>

                        <div
                        onClick={() => handleDeleteChatClick(chatId)}
                        className="hover:bg-neutral-800 active:scale-90 lg:p-2 p-1 cursor-pointer duration-300 ease-in-out rounded-full">
                            <MdDelete />
                        </div>
                    </div>
                })}
            </div>
        </div>
    </aside>
}

export default Sidebar;