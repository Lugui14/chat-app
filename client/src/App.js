import { useState } from "react";

import "./styles.css";
import { Chat } from "./components/Chat";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (!username || !roomId) return;
    socket.emit("join_room", roomId);
    setShowChat(true);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="form">
          <h3>Join a Chat!</h3>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            placeholder="Room"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />

          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <div>
          <Chat socket={socket} room={roomId} username={username} />
        </div>
      )}
    </div>
  );
}
