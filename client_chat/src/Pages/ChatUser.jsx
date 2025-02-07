import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
import { FaUserCircle, FaUsers, FaArrowLeft, FaSmile, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import styles from "../Styles/ChatUser.module.css";
import CreateGroupModal from "../Components/CreateGroup";
import socket from './../Components/Socket/Socket';
import { useAuth } from "../Contexts/AuthContext";
import { useChat } from "../Contexts/ChatContext";
const ChatUser = () => {
    const { messages, fetchMessages,handleSendMessage } = useChat();
    const { isAuthenticated, users } = useAuth();
    const [activeTab, setActiveTab] = useState("users");
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);


var UserId=JSON.parse(localStorage.getItem('user'))._id;


    const groups = ["React Devs", "Node Enthusiasts", "MERN Stack"];

    const handleChatSelect = (user) => {
        setSelectedChat(user);
    };





    return (
        <>
            <Container fluid className={styles.chatApp}>
                <Row className={styles.chatRow}>
                    {/* Sidebar */}
                    <Col
                        lg={selectedChat ? 3 : 4}
                        className={`${styles.sidebar} ${selectedChat ? styles.collapsed : ""}`}
                    >
                        <Button variant="primary" className="mb-3 w-100" onClick={() => setShowCreateGroupModal(true)}>
                            Create Group
                        </Button>
                        <CreateGroupModal
                            show={showCreateGroupModal}
                            setShow={setShowCreateGroupModal}
                        />
                        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                            <Nav variant="tabs" className="mb-3">
                                <Nav.Item>
                                    <Nav.Link eventKey="users">Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="groups">Groups</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="users">
                                    <ul className="list-unstyled">
                                        {users.map((user, index) => (
                                            <li
                                                key={index}
                                                className={styles.userItem}
                                                onClick={() => {
                                                    handleChatSelect(user);
                                                    fetchMessages(user._id);
                                                }}
                                            >
                                                <img
                                                    src={user.image}
                                                    class="img-fluid rounded-top p-2 m-2"
                                                    alt="user"
                                                    style={{ width: "40px", height: "40px" }}
                                                />

                                                <FaUserCircle className="me-2" />
                                                {user.name}
                                            </li>
                                        ))}
                                    </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="groups">
                                    <ul className="list-unstyled">
                                        {groups.map((group, index) => (
                                            <li
                                                key={index}
                                                className={styles.userItem}
                                                onClick={() => handleChatSelect(group)}
                                            >
                                                <FaUsers className="me-2" />
                                                {group}
                                            </li>
                                        ))}
                                    </ul>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>

                    {/* Chat Screen */}
                    <Col lg={selectedChat ? 9 : 8} className={`${styles.chatScreen} ${selectedChat ? styles.fullWidth : ""}`}>
                        {selectedChat ? (
                            <>
                                <div className={styles.chatHeader}>
                                    <FaArrowLeft
                                        className={`${styles.backButton} `}
                                        onClick={() => setSelectedChat(null)}
                                    />
                                    <h5>{selectedChat.name}</h5>
                                    <span className={styles.onlineStatus}>{selectedChat?.is_online}</span>
                                </div>
                                <div className={styles.chatBody}>
                                    {
                                        messages?.length > 0 ?
                                            messages.map((message, index) => (
                                                <p key={index} className={`${styles.message} ${message.sender === selectedChat._id ? styles.received : styles.sent}`}>{message.message}</p>
                                            )) :
                                            <p className={`${styles.message} ${styles.received}`}>No messages yet.</p>
                                    }
                                </div>
                                <div className={styles.chatFooter}>
                                    <Form className="d-flex align-items-center w-100">
                                        <FaSmile size={24} className={styles.icon} />
                                        <FaPaperclip size={24} className={styles.icon} />
                                        <Form.Control
                                            type="text"
                                            placeholder="Type a message"
                                            value={message}
                                            required
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="mx-2"
                                        />
                                        <Button variant="primary" disabled={!message.length>0} onClick={() => {handleSendMessage(UserId, selectedChat._id, message); setMessage('');}}>
                                            <FaPaperPlane />
                                        </Button>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            <div className={styles.placeholder}>
                                <h5>Select a user or group to start chatting</h5>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatUser;
