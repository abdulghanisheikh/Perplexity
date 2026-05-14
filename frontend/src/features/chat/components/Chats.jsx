import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Chats = ({chat, chatList, currentChatId, messagesObject, handleDeleteChatClick, setSidebarOpen}) => {
  return (
    <section className="flex flex-col gap-4">

        <div
            onClick={() => { chat.handleStartNewChat(); setSidebarOpen(false); }}
            className="border border-white/50 flex justify-center items-center duration-300 ease-in-out cursor-pointer w-[80%] self-center rounded-xl hover:bg-neutral-800 py-1.5 gap-1 hover:scale-[1.01] transition-transform"
        >
            <p>New Chat</p>
            <IoMdAdd />
        </div>

        <div className="flex flex-col w-full gap-2 px-5">
            <p className="text-sm opacity-40">Recent Chats</p>

            {chatList && Object.keys(chatList).reverse().map((chatId) => (
                <div key={chatId} className="flex items-center gap-3">

                    <div
                        className={`transition-transform duration-300 ease-in-out cursor-pointer w-[90%] h-8 rounded-lg flex items-center px-2 py-0.5 truncate hover:scale-[1.01] ${currentChatId === chatId ? 'bg-neutral-800' : 'bg-neutral-900'}`}
                        style={{ scrollbarWidth: "none" }}
                        onClick={() => {
                            chat.handleOpenChat({activeChatId: chatId, message: messagesObject});
                            setSidebarOpen(false); // 👈 close sidebar on mobile after opening chat
                        }}
                    >
                        <p className="text-xs">{chatList[chatId].title}</p>
                    </div>

                    <div
                        onClick={() => handleDeleteChatClick(chatId)}
                        className="hover:bg-neutral-800 active:scale-90 p-2 cursor-pointer duration-300 ease-in-out rounded-full"
                    >
                        <MdDelete />
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Chats;