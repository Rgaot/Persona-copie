import "./MessagesPage.css";

import Header from "../../components/header/Header";
import NavMenu from "../../components/navMenu/NavMenu.jsx";

import { useNavMenuStore } from "../../store/navMenuStore.js";
import { useAuthStore } from "../../store/authStore.js";
import { useChatStore } from "../../store/chatStore.js";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

function MessagesPage() {
  const { isNavMenuOpen } = useNavMenuStore();
  const {
    messages,
    getMessages,
    sendMessage,
    listenToMessages,
    stopListenToMessages,
    selectedUser,
    showInfos,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages();
    listenToMessages();
    return () => stopListenToMessages();
  }, [getMessages, listenToMessages, stopListenToMessages]);

  useEffect(() => {
    if (lastMessageRef.current && messages) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [text, setText] = useState("");
  const lastMessageRef = useRef(null);

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
                    <div
                      className="messages-page-message-user-container"
                      style={
                        authUser?._id === message?.senderId
                          ? { borderColor: "white" }
                          : {}
                      }
                      onClick={() => showInfos(message.senderId, message._id)}
                    >
                      {selectedUser.senderId === message.senderId &&
                        selectedUser.messageId === message._id && (
                          <div id="messages-page-selected-user-info-container">
                            <div id="messages-page-selected-user-info-username-profile-image-container">
                              <img
                                src={
                                  message?.sender?.profileImage || "avatar.png"
                                }
                                id="messages-page-selected-user-info-profile-image"
                              />
                              <p id="messages-page-selected-user-info-username">
                                {message?.sender?.username}
                              </p>
                            </div>
                            <div>
                              <p id="messages-page-selected-user-social-link">
                                Messages envoyés : {message?.sender?.messagesSent}
                              </p>
                              <p id="messages-page-selected-user-createdAt">
                                Compte crée le : { message.sender.createdAt.split("T")[0]}
                              </p>
                            </div>
                          </div>
                        )}
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
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MessagesPage;
