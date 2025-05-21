import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
import { FaUserCircle, FaUsers, FaArrowLeft, FaSmile, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import styles from "../Styles/ChatUser.module.css";
import CreateGroupModal from "../Components/CreateGroup";
import { socket } from './../Components/Socket/Socket';
import { useAuth } from "../Contexts/AuthContext";
import { useChat } from "../Contexts/ChatContext";
import { useGroup } from "../Contexts/GroupChatContext";
import { Link } from "react-router-dom";

const ChatUser = () => {
    const { groups } = useGroup();
    const { messages, fetchMessages, handleSendMessage, fetchGroupMessages, addMessage, joinGroup } = useChat();
    const { isAuthenticated, users } = useAuth();
    const [activeTab, setActiveTab] = useState("users");
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

    const chatBodyRef = useRef(null);

    var UserId = JSON.parse(localStorage.getItem('user')).userData?._id;

    // Update selectedChat with latest online status from users list
    useEffect(() => {
        if (selectedChat && !selectedChat.isGroup) {
            const updatedUser = users.find(user => user._id === selectedChat._id);
            if (updatedUser && updatedUser.is_online !== selectedChat.is_online) {
                setSelectedChat(prev => ({ ...prev, is_online: updatedUser.is_online }));
            }
        }
    }, [users, selectedChat]);

    useEffect(() => {
        socket.on('message', (newMessage) => {
            if (!selectedChat) return;
            // Check if newMessage belongs to selectedChat
            if (selectedChat.isGroup) {
                if (newMessage.groupId === selectedChat._id) {
                    addMessage(newMessage);
                }
            } else {
                // Direct message: check sender and receiver
                if (
                    (newMessage.sender === UserId && newMessage.receiver === selectedChat._id) ||
                    (newMessage.receiver === UserId && newMessage.sender === selectedChat._id)
                ) {
                    addMessage(newMessage);
                }
            }
        }); 
        
        // add the function to the socket event listener

        return () => {
            socket.off('message');
        };
    }, [selectedChat, UserId, addMessage]);

    useEffect(() => {
        if (selectedChat) {
            if (selectedChat.isGroup) {
                fetchGroupMessages(selectedChat._id);
            } else {
                fetchMessages(selectedChat._id);
            }
        }
    }, [selectedChat]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    // New useEffect to join all group rooms on initial load or when groups change
    useEffect(() => {
        if (groups && groups.length > 0) {
            groups.forEach(group => {
                joinGroup(group._id);
            });
        }
    }, [groups, joinGroup]);

    const handleChatSelect = (user) => {
        setSelectedChat({ ...user, isGroup: false });
        fetchMessages(user._id);
    };

    const handleGroupSelect = (group) => {
        setSelectedChat({ ...group, isGroup: true });
        fetchGroupMessages(group._id);
        joinGroup(group._id);
    };


    const handleSend = () => {
        if (selectedChat) {
            handleSendMessage(UserId, selectedChat._id, message, selectedChat.isGroup);
            setMessage('');
        }
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
                                                    className="img-fluid rounded-top p-2 m-2"
                                                    alt="user"
                                                    style={{ width: "40px", height: "40px", borderRadius: '50%' }}
                                                />
                                                {user.name}
                                            </li>
                                        ))}
                                    </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="groups">
                                    <ul className="list-unstyled">
                                        {groups?.map((group, index) => (
                                            <li as={Link}
                                                key={index}
                                                className={styles.userItem}
                                                onClick={() => handleGroupSelect(group)}
                                            >
                                                <img
                                                    src={group?.image}
                                                    className="img-fluid  m-2"
                                                    alt="group"
                                                    style={{ width: "40px", height: "40px", borderRadius: '50%' }}
                                                />
                                                {group?.name}
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
                                <div className={styles.chatBody} ref={chatBodyRef}>
                                    {
                                        Array.isArray(messages) && messages.length > 0 ? (
                                            selectedChat?.isGroup ? (
                                                messages.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.message} ${message.senderId === UserId ? styles.sent : styles.received}`}
                                                    >
                                                        <div className={styles.messageContent}>
                                                            <p>{message.message}</p>
                                                            <small className={styles.timestamp}>
                                                                {message.timestamp ? new Date(message.timestamp).toLocaleString() : ''}
                                                            </small>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                messages.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.message} ${message.sender === UserId ? styles.sent : styles.received}`}
                                                    >
                                                        <div className={styles.messageContent}>
                                                            <p>{message.message}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        ) : (
                                            <p className={`${styles.message} ${styles.received}`}>No messages yet.</p>
                                        )
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
                                            className="mx-2" />
                                        <Button variant="primary" disabled={!message.length > 0} onClick={handleSend}>
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
