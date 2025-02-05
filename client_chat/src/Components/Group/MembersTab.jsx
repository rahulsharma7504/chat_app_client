import React, { useState } from 'react';
import { Form, Button, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { BsSearch, BsPersonPlus, BsPersonDash, BsShieldLock } from 'react-icons/bs';

const ManageMembersTab = () => {
  const MAX_MEMBERS = 5; // Set the maximum number of members allowed
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', isAdmin: false },
    { id: 2, name: 'Jane Smith', isAdmin: false },
    { id: 3, name: 'Alice Johnson', isAdmin: false },
    { id: 4, name: 'Bob Brown', isAdmin: false },
    { id: 5, name: 'Charlie White', isAdmin: false },
    { id: 6, name: 'David Black', isAdmin: false }, // Extra member to show when limit is reached
  ]);
  const [newMembers, setNewMembers] = useState([]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleAddMember = (member) => {
    if (newMembers.length >= MAX_MEMBERS) {
      alert(`You can only add up to ${MAX_MEMBERS} members.`);
      return;
    }
    setNewMembers([...newMembers, member]);
    setMembers(members.filter((m) => m.id !== member.id));
  };

  const handleRemoveMember = (member) => {
    setMembers([...members, member]);
    setNewMembers(newMembers.filter((m) => m.id !== member.id));
  };

  const handleAssignAdmin = (member) => {
    setNewMembers(
      newMembers.map((m) =>
        m.id === member.id ? { ...m, isAdmin: !m.isAdmin } : m
      )
    );
  };

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
        {members
          .filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((member) => (
            <ListGroup.Item key={member.id} className="d-flex justify-content-between align-items-center">
              {member.name}
              <Button
                variant="success"
                size="sm"
                onClick={() => handleAddMember(member)}
                disabled={newMembers.length >= MAX_MEMBERS}
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
            <div>
              {member.isAdmin && (
                <Badge pill variant="primary" className="mr-2">
                  Admin
                </Badge>
              )}
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleAssignAdmin(member)}
                className="mr-2"
              >
                <BsShieldLock /> {member.isAdmin ? 'Remove Admin' : 'Assign Admin'}
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleRemoveMember(member)}>
                <BsPersonDash /> Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Limit Reached Message */}
      {newMembers.length >= MAX_MEMBERS && (
        <div className="mt-3 text-danger">
          <strong>Maximum number of members reached.</strong>
        </div>
      )}
    </>
  );
};

export default ManageMembersTab;
