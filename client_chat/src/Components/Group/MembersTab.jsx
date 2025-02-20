import React, { useState } from 'react';
import { Form, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { BsSearch, BsPersonPlus, BsPersonDash, BsPlus, BsDash } from 'react-icons/bs';
import { useAuth } from '../../Contexts/AuthContext';
import { useProfile } from '../../Contexts/ProfileContext';

const ManageMembersTab = ({ groupDetails, increaseGroupLimit, decreaseGroupLimit }) => {
  const { users } = useAuth();

  const MAX_MEMBERS = groupDetails.groupDetails.userLimit;  // Set the maximum number of members allowed
  const [searchTerm, setSearchTerm] = useState('');
  const {newMembers, setNewMembers} = useProfile();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleAddMember = (member) => {
    if (newMembers.length + groupDetails.groupDetails.users.length >= MAX_MEMBERS) {
      alert(`You can only add up to ${MAX_MEMBERS} members.`);
      return;
    }
    setNewMembers([...newMembers, member]);
  };

  const handleRemoveMember = (member) => {
    setNewMembers(newMembers.filter((m) => m.id !== member.id));
  };

  const totalMembers = newMembers.length + groupDetails.groupDetails.users.length;

  return (
    <>
      {/* Search Bar */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search members"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
      </InputGroup>

      {/* Members List */}
      <h5>Available Members</h5>
      <ListGroup>
        {users
          .filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((member) => (
            <ListGroup.Item key={member.id} className="d-flex justify-content-between align-items-center">
              {member.name}
              <Button
                variant="success"
                size="sm"
                onClick={() => handleAddMember(member)}
                disabled={totalMembers >= MAX_MEMBERS || groupDetails.groupDetails.users.includes(member._id) || newMembers.includes(member)}
              >
                <BsPersonPlus /> Add
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>

      {/* Added Members */}
      <h5 className="mt-4">Added Members</h5>
      <ListGroup>
        {newMembers.map((member) => (
          <ListGroup.Item
            key={member.id}
            className="d-flex justify-content-between align-items-center"
          >
            {member.name}
            <Button variant="danger" size="sm" onClick={() => handleRemoveMember(member)}>
              <BsPersonDash /> Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Limit Reached Message */}
      {totalMembers >= MAX_MEMBERS && (
        <div className="mt-3 text-danger">
          <strong>Maximum number of members reached.</strong>
        </div>
      )}

      {/* Increase/Decrease Group Limit Buttons */}
      <div className="mt-3 text-center">
        <Button variant="primary" onClick={groupDetails.decreaseGroupLimit} className="mx-2">
          <BsDash />  Group Limit
        </Button> {groupDetails.groupDetails.userLimit}
        <span>{groupDetails.userLimit}</span>
        <Button variant="primary" onClick={groupDetails.increaseGroupLimit} className="mx-2">
          <BsPlus />  Group Limit
        </Button>
      </div>
    </>
  );
};

export default ManageMembersTab;