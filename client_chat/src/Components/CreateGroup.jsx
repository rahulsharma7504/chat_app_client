import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
import { BsFillGearFill } from 'react-icons/bs';
import { BsPersonAdd, BsTrash } from 'react-icons/bs';
import styles from '../Styles/CreateGroup.module.css'


const CreateGroupModal = ({ show, setShow, users }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [userLimit, setUserLimit] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);

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
    setGroupImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    // Handle group creation logic here
    console.log({
      groupName,
      groupImage,
      userLimit,
      selectedUsers,
    });
    setShow(false); // Close modal after submission
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
            {groupImage && (
              <div className="mt-3">
                <img src={groupImage} alt="Group Preview" className={styles.imagePreview} />
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
                <Dropdown.Item key={user.id} onClick={() => handleUserSelection(user)}>
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
        <Button variant="primary" onClick={handleSubmit} className="btnPrimary">
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
