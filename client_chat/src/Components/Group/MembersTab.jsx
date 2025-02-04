import React, { useState } from 'react';
import { Form, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { BsSearch, BsPersonPlus, BsPersonDash } from 'react-icons/bs';

const ManageMembersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);

  const [newMembers, setNewMembers] = useState([]);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleAddMember = (member) => {
    setNewMembers([...newMembers, member]);
    setMembers(members.filter((m) => m.id !== member.id));
  };

  const handleRemoveMember = (member) => {
    setMembers([...members, member]);
    setNewMembers(newMembers.filter((m) => m.id !== member.id));
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
              <Button variant="success" size="sm" onClick={() => handleAddMember(member)}>
                <BsPersonPlus /> Add
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>

      {/* Added Members */}
      <h5 className="mt-4">Added Members</h5>
      <ListGroup>
        {newMembers.map((member) => (
          <ListGroup.Item key={member.id} className="d-flex justify-content-between align-items-center">
            {member.name}
            <Button variant="danger" size="sm" onClick={() => handleRemoveMember(member)}>
              <BsPersonDash /> Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ManageMembersTab;
