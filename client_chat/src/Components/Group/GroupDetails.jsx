import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const GroupDetailsTab = () => {
  const [groupName, setGroupName] = useState('');

  const handleGroupNameChange = (e) => setGroupName(e.target.value);

  return (
    <Form>
      <Form.Group controlId="formGroupName">
        <Form.Label>Group Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={handleGroupNameChange}
        />
      </Form.Group>
    </Form>
  );
};

export default GroupDetailsTab;
