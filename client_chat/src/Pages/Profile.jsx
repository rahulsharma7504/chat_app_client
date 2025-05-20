import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useGroup } from "../Contexts/GroupChatContext";
import socket from "../Components/Socket/Socket";

const ProfilePage = () => {
  const { handleLeaveGroup } = useGroup();
  const { profileData, setProfileData, updateProfile } = useProfile();
  const [showEditModal, setShowEditModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const { groups, setGroups } = useAuth(); // groups context might need update if user's own group avatar changes, but not directly relevant for user avatar
  const UserInfo = JSON.parse(localStorage.getItem('user'))?.userData;
  const avatarInputRef = useRef(null);

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

    const handleAvatarChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/avatar/${UserInfo?._id}`,formData,);

      if (response.status === 200) {
        const updatedUser = response.data.user;
        // Update profile context
        setProfileData((prevData) => ({
          ...prevData,
          image: updatedUser.image,
        }));
        // Update localStorage if user data is stored there comprehensively
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            storedUser.userData.image = updatedUser.image;
            localStorage.setItem('user', JSON.stringify(storedUser));
        }
        toast.success(response.data.message || "Avatar updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update avatar.");
      }
    } catch (error) {
      console.error("Avatar update error:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating avatar.");
    }
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
                <img src={profileData?.image ? profileData.image + '?t=' + new Date().getTime() : ''} alt="avatar" className="img-fluid rounded mx-auto d-block" style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }} onClick={() => avatarInputRef.current && avatarInputRef.current.click()} />
                <input
                  type="file"
                  ref={avatarInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleAvatarChange} // We will define this function
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-2"
                  onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
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