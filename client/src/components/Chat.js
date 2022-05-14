import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "../styles.css";

export function Chat({ socket, room, username }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const messageData = {
      room,
      author: username,
      message,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };

    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <ScrollToBottom className="message-wrapper">
        <div className="chat-body">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={messageContent.author === username ? "you" : "other"}
              >
                <p>{messageContent.message}</p>
                <span>
                  {messageContent.author} - {messageContent.time}
                </span>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Digite aqui =D"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
