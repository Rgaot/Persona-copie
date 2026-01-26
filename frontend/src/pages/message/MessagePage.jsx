import "./MessagesPage.css";

import Header from "../../components/header/Header";
import NavMenu from "../../components/navMenu/NavMenu.jsx";

import { useNavMenuStore } from "../../store/navMenuStore.js";
import { useAuthStore } from "../../store/authStore.js";
import { useChatStore } from "../../store/chatStore.js";
import { useEffect, useState, useRef } from "react";

function MessagesPage() {
  const { isNavMenuOpen } = useNavMenuStore();
  const {
    messages,
    getMessages,
    sendMessage,
    listenToMessages,
    stopListenToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    getMessages();
    listenToMessages();
    console.log(authUser);
    return () => stopListenToMessages();
  }, [getMessages, listenToMessages, stopListenToMessages]);

  useEffect(() => {
    if (lastMessageRef.current && messages) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [text, setText] = useState("");

  const handleSendMessage = async () => {
    if (!text.trim()) {
      return;
    }
    await sendMessage(text);
    setText("");
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main
        id="messages-page-main-container"
        style={
          isNavMenuOpen
            ? { gridTemplateColumns: "170px 1fr" }
            : { gridTemplateColumns: "1fr" }
        }
      >
        {isNavMenuOpen && <NavMenu />}
        <div id="messages-page-main-content">
          <div id="messages-page-component">
            <div id="messages-page-messages-container">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className="messages-page-message-container"
                    ref={lastMessageRef}
                  >
                    <div className="messages-page-message-text-container">
                      <p className="messages-page-message-text">
                        {message?.text}
                      </p>
                    </div>
                    <div className="messages-page-message-user-container" style={authUser?._id === message?.senderId ? {borderColor: "white"} : {}}>
                      <p className="messages-page-message-username">
                        {message?.sender?.username}
                      </p>
                      <img
                        src={message?.sender?.profileImage || "avatar.png"}
                        alt="Profile image"
                        className="messages-page-message-profile-picture"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="messages-page-send-input-button-container">
              <input
                id="messages-page-send-input"
                type="text"
                placeholder="Entrer un message"
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleSendMessage() : ""
                }
              />
              <button
                id="messages-page-send-button"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MessagesPage;
