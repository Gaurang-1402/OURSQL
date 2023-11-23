import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'
import { BASE_URL } from '../constants';

const DeleteModal = ({ id, onDeleteSuccess, entity, onDeleteError }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/${entity}/${id}`, { withCredentials: true }); setShowModal(false);
      if (onDeleteSuccess) {
        onDeleteSuccess(id);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setShowModal(false);
      if (onDeleteError) {
        onDeleteError(error);
      }
    }
  };

  return (
    <>
      <Button variant="danger" className="btn-sm" onClick={() => setShowModal(true)}>
        <FaTrash />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this entry?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
