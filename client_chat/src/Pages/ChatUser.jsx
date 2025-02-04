            import React, { useState } from "react";
            import { Container, Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
            import { FaUserCircle, FaUsers, FaArrowLeft, FaSmile, FaPaperclip, FaPaperPlane } from "react-icons/fa";
            import styles from "../Styles/ChatUser.module.css";

            const ChatUser = () => {
            const [activeTab, setActiveTab] = useState("users");
            const [selectedChat, setSelectedChat] = useState(null);

            const users = ["Rahul", "Aman", "Gungun"];
            const groups = ["React Devs", "Node Enthusiasts", "MERN Stack"];

            const handleChatSelect = (name) => {
            setSelectedChat(name);
            };

            return (
            <Container fluid className={styles.chatApp}>
            <Row className={styles.chatRow}>
            {/* Sidebar */}
            <Col
                lg={selectedChat ? 3 : 4}
                className={`${styles.sidebar} ${selectedChat ? styles.collapsed : ""}`}
            >
                <Button variant="primary" className="mb-3 w-100">
                Create Group
                </Button>
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
                            onClick={() => handleChatSelect(user)}
                        >
                            <FaUserCircle className="me-2" />
                            {user}
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
                    <h5>{selectedChat}</h5>
                    <span className={styles.onlineStatus}>Online</span>
                    </div>
                    <div className={styles.chatBody}>
                    <p className={`${styles.message} ${styles.received}`}>Hello!</p>
                    <p className={`${styles.message} ${styles.sent}`}>Hi, how are you?</p>
                    </div>
                    <div className={styles.chatFooter}>
                    <Form className="d-flex align-items-center w-100">
                        <FaSmile size={24} className={styles.icon} />
                        <FaPaperclip size={24} className={styles.icon} />
                        <Form.Control
                        type="text"
                        placeholder="Type a message"
                        className="mx-2"
                        />
                        <Button variant="primary">
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
            );
            };

            export default ChatUser;
