import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";

const Sidebar = ({handleLogoutClick, chat, chatList, currentChatId, messagesObject, handleDeleteChatClick}) => {

    return <aside className="min-w-[25%] flex flex-col gap-8 bg-black/10">
        {/* navbar */}
        <Navbar click={handleLogoutClick} />

        {/* new chat button */}
        <div
        onClick={chat.handleStartNewChat}
        className="chat hover:scale-101 border border-white/50 flex justify-center items-center duration-300 ease-in-out cursor-pointer w-[80%] self-center rounded-xl hover:bg-neutral-800 py-1.5 overflow-x-hidden gap-1">
            <p>New Chat</p>
            <IoMdAdd />
        </div>

        {/* chats */}
        <div className="chats flex flex-col w-full gap-2 px-5">

            <p className="text-sm opacity-40">Recent Chats</p>

            {chatList && Object.keys(chatList).reverse().map((chatId) => {
                return <div
                key={chatId}
                className="chat flex items-center gap-3">

                    <div
                    className={`hover:scale-101 duration-300 ease-in-out cursor-pointer w-[90%] h-8 rounded-lg flex items-center px-2 py-0.5 truncate ${currentChatId === chatId ? 'bg-neutral-800' : 'bg-neutral-900'}`}
                    style={{
                        scrollbarWidth: "none"
                    }}
                    onClick={() => chat.handleOpenChat({activeChatId: chatId, message: messagesObject})}
                    >
                        <p className="text-xs">{chatList[chatId].title}</p>
                    </div>

                    <div 
                    onClick={() => handleDeleteChatClick(chatId)}
                    className="hover:bg-neutral-800 active:scale-90 p-2 cursor-pointer duration-300 ease-in-out rounded-full">
                        <MdDelete />
                    </div>
            </div>
            })}
        </div>
    </aside>
}

export default Sidebar;