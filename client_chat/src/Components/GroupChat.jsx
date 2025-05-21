import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { socket } from "../Components/Socket/Socket";
import EmojiPicker from "emoji-picker-react"; // This is correct for the package 'emoji-picker-react'
import { FaSmile } from "react-icons/fa";
import axios from "axios";

const GroupChat = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (groupId) {
      socket.emit("joinGroup", groupId);
    }
    socket.on("groupMessage", (message) => {
      if (message.groupId === groupId) {
        setMessages((prev) => [...prev, message]);
      }
    });
    return () => {
      socket.off("groupMessage");
    };
  }, [groupId]);

  // Close emoji picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const uploadFileAndSend = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("groupId", groupId);

    try {
      // Replace with your backend upload endpoint
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data && res.data.fileUrl) {
        const messageData = {
          groupId,
          file: {
            name: file.name,
            type: file.type,
            url: res.data.fileUrl,
          },
          type: "file",
          sender: JSON.parse(localStorage.getItem("user"))?.userData?._id,
          createdAt: new Date(),
        };
        socket.emit("groupMessage", messageData);
        setMessages((prev) => [...prev, messageData]);
        setFile(null);
      }
    } catch (err) {
      alert("File upload failed");
    }
  };

  const sendMessage = () => {
    if (!input.trim() && !file) return;
    if (file) {
      uploadFileAndSend();
    }
    if (input.trim()) {
      const messageData = {
        groupId,
        text: input,
        type: "text",
        sender: JSON.parse(localStorage.getItem("user"))?.userData?._id,
        createdAt: new Date(),
      };
      socket.emit("groupMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setInput("");
    }
  };

  const onEmojiClick = (emojiData, event) => {
    setInput(
      (prev) => prev + (emojiData.emoji || event?.target?.innerText || "")
    );
    setShowEmojiPicker(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #eee",
          marginBottom: 10,
          padding: 10,
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.type === "file" && msg.file ? (
              <a
                href={msg.file.data}
                download={msg.file.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {msg.file.type.startsWith("image") ? (
                  <img
                    src={msg.file.data}
                    alt={msg.file.name}
                    style={{ maxWidth: 150, maxHeight: 150 }}
                  />
                ) : (
                  <span>📎 {msg.file.name}</span>
                )}
              </a>
            ) : (
              <span style={{ fontSize: msg.type === "emoji" ? 24 : 16 }}>
                {msg.text}
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <div
          style={{ marginRight: 8, cursor: "pointer", position: "relative" }}
        >
          <FaSmile size={24} onClick={() => setShowEmojiPicker((v) => !v)} />
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              style={{
                position: "absolute",
                bottom: 40,
                left: 0,
                zIndex: 9999,
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <input
          type="file"
          style={{ marginRight: 8 }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default GroupChat;
