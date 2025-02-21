import React, { useState, useEffect } from "react";
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
import { useProfile } from "../Contexts/ProfileContext";
import toast from "react-hot-toast";
import { useAuth } from "../Contexts/AuthContext";
import { useGroup } from "../Contexts/GroupChatContext";
import socket from "../Components/Socket/Socket";

const ProfilePage = () => {
  const { handleLeaveGroup } = useGroup();
  const { profileData, setProfileData, updateProfile } = useProfile();
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const { groups, setGroups } = useAuth();
  const UserInfo = JSON.parse(localStorage.getItem('user'))?.userData;

  const [joinedGroups, setJoinedGroups] = useState([]);
  const [ownGroups, setOwnGroups] = useState([]);

  useEffect(() => {
    // Filter joined groups and own groups
    const userJoinedGroups = groups.filter(group => group.users.includes(UserInfo?._id));
    const userOwnGroups = groups.filter(group => group.createdBy === UserInfo?._id);

    setJoinedGroups(userJoinedGroups);
    setOwnGroups(userOwnGroups);
  }, [groups, UserInfo?._id]);

  const handleEditProfile = async () => {
    const result = await updateProfile(profileData);
    if (result.success) {
      setShowEditModal(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGroupManage = (groupDetails) => {
    setGroupDetails(groupDetails);
    setShowGroupModal(true);
  };

  const increaseGroupLimit = () => {
    setGroupDetails((prevDetails) => ({
      ...prevDetails,
      userLimit: prevDetails.userLimit + 1,
    }));
  };

  const decreaseGroupLimit = () => {
    setGroupDetails((prevDetails) => ({
      ...prevDetails,
      userLimit: prevDetails.userLimit - 1,
    }));
  };

  return (
    <Container fluid className={styles.profilePage}>
      <Row className="mt-4">
        {/* User Information Section */}
        <Col md={4} className="mb-4">
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-3">
                <img src={profileData?.image} alt="avatar" className="img-fluid rounded mx-auto d-block" />
                <br />
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
              <p className="text-center text-muted">{profileData.status}</p>
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
                  <strong>{joinedGroups.length}</strong> Groups Joined
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
              {joinedGroups.map((group) => (
                <ListGroup.Item key={group._id} className="d-flex justify-content-between">
                  <span>{group.name}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleLeaveGroup(group._id, UserInfo)}
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
                    onClick={() => handleGroupManage(group)}
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
              <Form.Control
                type="text"
                value={profileData?.name}
                name="name"
                placeholder="Enter name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profileData?.email}
                name="email"
                placeholder="Enter email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={profileData?.bio}
                name="bio"
                placeholder="Enter bio"
                onChange={handleInputChange}
              />
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
      {groupDetails && (
        <GroupModal
          increaseGroupLimit={increaseGroupLimit}
          decreaseGroupLimit={decreaseGroupLimit}
          groupDetails={groupDetails}
          showGroupModal={showGroupModal}
          setShowGroupModal={setShowGroupModal}
        />
      )}
    </Container>
  );
};

export default ProfilePage;