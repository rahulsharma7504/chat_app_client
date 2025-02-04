import React, { useState } from 'react';
import { Modal, Tab, Nav, Button, Form, InputGroup } from 'react-bootstrap';
import { BsSearch, BsPersonPlus, BsPersonDash } from 'react-icons/bs';
import GroupDetailsTab from './GroupDetails';
import ManageMembersTab from './MembersTab';

const GroupModal = ({ show, showGroupModal, setShowGroupModal, handleAddGroupMember }) => {
  const [activeTab, setActiveTab] = useState('details'); // Track active tab

  return (
    <Modal show={show.showGroupModal} onHide={()=>show.setShowGroupModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Manage Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="details">Group Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="members">Add/Remove Members</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="details">
              <GroupDetailsTab />
            </Tab.Pane>
            <Tab.Pane eventKey="members">
              <ManageMembersTab />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>show.setShowGroupModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddGroupMember}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupModal;
