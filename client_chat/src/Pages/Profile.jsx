
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";
import {
  BsFillPersonFill,
  BsGearFill,
  BsTrash,
  BsPlus,
  BsFillPencilFill,
} from "react-icons/bs";
import styles from "../Styles/Profile.module.css";
import GroupModal from "../Components/Group/GroupModel";

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    bio: "Lorem ipsum dolor sit amet.",
    groupsJoined: 5,
  });

  const [groups, setGroups] = useState([
    { id: 1, name: "React Developers" },
    { id: 2, name: "Node.js Enthusiasts" },
  ]);

  const [ownGroups, setOwnGroups] = useState([
    { id: 3, name: "MERN Stack Wizards" },
  ]);

  const handleEditProfile = () => {
    setShowEditModal(false);
  };

  const handleLeaveGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const handleAddGroupMember = () => {
    setShowGroupModal(false);
  };

  return (
    <Container fluid className={styles.profilePage}>
      <Row className="mt-4">
        {/* User Information Section */}
        <Col md={4} className="mb-4">
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-3">
                <BsFillPersonFill size={64} />
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-2"
                >
                  Change Avatar
                </Button>
              </div>
              <h4 className="text-center">{profileData.name}</h4>
              <p className="text-center text-muted">{profileData.email}</p>
              <p className="text-center text-muted">{profileData.phone}</p>
              <p className="text-center">{profileData.bio}</p>
              <Button
                variant="primary"
                onClick={() => setShowEditModal(true)}
                className="w-100"
              >
                Edit Profile
              </Button>
              <hr />
              <div className="text-center">
                <p>
                  <strong>{profileData.groupsJoined}</strong> Groups Joined
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Groups Management Section */}
        <Col md={8}>
          <Card className="shadow mb-4">
            <Card.Header>Joined Groups</Card.Header>
            <ListGroup variant="flush">
              {groups.map((group) => (
                <ListGroup.Item key={group.id} className="d-flex justify-content-between">
                  <span>{group.name}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleLeaveGroup(group.id)}
                  >
                    <BsTrash /> Leave
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card className="shadow">
            <Card.Header>My Groups</Card.Header>
            <ListGroup variant="flush">
              {ownGroups.map((group) => (
                <ListGroup.Item key={group.id} className="d-flex justify-content-between">
                  <span>{group.name}</span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowGroupModal(true)}
                  >
                    <BsGearFill /> Manage
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter bio" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Group Management Modal */}
      
      <GroupModal show={{showGroupModal,setShowGroupModal}}/>
    </Container>
  );
};

export default ProfilePage;
