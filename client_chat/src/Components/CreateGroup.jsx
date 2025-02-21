import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
import { BsFillGearFill } from 'react-icons/bs';
import { BsPersonAdd, BsTrash } from 'react-icons/bs';
import styles from '../Styles/CreateGroup.module.css'
import { useAuth } from '../Contexts/AuthContext';
import { useGroup } from '../Contexts/GroupChatContext';
import toast from 'react-hot-toast';
import axios from 'axios';


const CreateGroupModal = ({ show, setShow }) => {
  const [groupName, setGroupName] = useState('');
  const { users, getAllUsers } = useAuth();
  const { setGroups, groups } = useGroup();
const [loading, setLoading] = useState(false);
  const [groupImages, setGroupImages] = useState(null);
  const [groupImage, setGroupImage] = useState(null);
  const [userLimit, setUserLimit] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // User Group Context

  const handleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
    } else {
      if (selectedUsers.length < userLimit) {
        setSelectedUsers([...selectedUsers, user]);
      } else {
        alert('User limit reached');
      }
    }
  };

  const handleGroupImageChange = (e) => {
    setGroupImages(URL.createObjectURL(e.target.files[0]));
    setGroupImage(e.target.files[0]);
  };

  const handleSubmit = async () => {

    if (!groupName || !groupImage || !userLimit || selectedUsers.length === 0) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const GroupData = {
        groupName,
        userLimit,
        selectedUsers: selectedUsers.map((user) => user._id)
      };

      if (groupImage) {
        GroupData.groupImage = groupImage;
      }
      const formdata = new FormData();
      formdata.append('groupName', groupName);
      formdata.append('userLimit', userLimit);
      formdata.append('groupImage', groupImage);
      formdata.append('selectedUsers', selectedUsers.map((user) => user._id));

      const userId = JSON.parse(localStorage.getItem('user')).userData._id;

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/create/${userId}`, GroupData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setGroups([...groups, response.data.group]);
        toast.success(response.data.message);
        getAllUsers(userId);
        setLoading(false);
        setShow(false); // Close modal after submission

        setGroupName('');
        setUserLimit(10);
        setSelectedUsers([]);
        setGroupImages(null);
        setGroupImage(null);
      } 
      else {
        setLoading(false);
        toast.error('Failed to create group.');
      }

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      toast.error('Error creating group. Please try again.');
    }
    finally{
      setLoading(false)
    }

  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <div className={styles.modalIcon}>
          <BsFillGearFill />
        </div>
        <Modal.Title className={styles.modalTitle}>Create Group</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalContent}>
        <Form>
          <Form.Group className={styles.formGroup} controlId="formGroupName">
            <Form.Label className={styles.formLabel}>Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.formControl}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup} controlId="formGroupImage">
            <Form.Label className={styles.formLabel}>Group Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleGroupImageChange}
              accept="image/*"
              className={styles.formControl}
            />
            {groupImages && (
              <div className="mt-3">
                <img src={groupImages} alt="Group Preview" name='image' className={styles.imagePreview} />
              </div>
            )}
          </Form.Group>

          <Form.Group className={styles.formGroup} controlId="formUserLimit">
            <Form.Label className={styles.formLabel}>User Limit</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="50"
              value={userLimit}
              onChange={(e) => setUserLimit(e.target.value)}
              className={styles.formControl}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup} controlId="formUserSelection">
            <Form.Label className={styles.formLabel}>Select Users</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select Users"
              variant="secondary"
              className={styles.dropdownButton}
            >
              {users.map((user) => (
                <Dropdown.Item key={user._id} onClick={() => handleUserSelection(user)}>
                  {user.name}
                  {selectedUsers.includes(user) && <span className="ml-2"><BsPersonAdd /></span>}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>

          <ListGroup className={styles.selectedUsersList}>
            {selectedUsers.map((user, index) => (
              <ListGroup.Item key={index} className={styles.selectedUserItem}>
                <span>{user.name}</span>
                <BsTrash
                  className={styles.iconRemove}
                  onClick={() => handleUserSelection(user)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={() => setShow(false)} className="btnSecondary">
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading || !groupName || !groupImage || !userLimit || selectedUsers.length === 0} className="btnPrimary">
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
