import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OfficerPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { officerId } = useParams();

  const [officerDetails, setOfficerDetails] = useState({
    officer_id: '',
    last: '',
    first: '',
    precinct: '',
    badge: '',
    phone: '',
    status: 'A' // default status
  });

  const handleChange = (e) => {
    setOfficerDetails({ ...officerDetails, [e.target.name]: e.target.value });
  };

  // Function to add or update officer details
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = officerId ? `${BASE_URL}/api/officer/${officerId}` : `${BASE_URL}/api/officer`;
      const method = officerId ? 'put' : 'post';

      const response = await axios[method](url, officerDetails, {
        withCredentials: true
      });

      toast.success(`Officer ${officerId ? 'updated' : 'added'} successfully`);
      navigate('/officers');
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{officerId ? 'Edit Officer' : 'Add Officer'}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          { !officerId && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Officer ID</Form.Label>
                <Form.Control
                  type="number"
                  name="officer_id"
                  value={officerDetails.officer_id}
                  onChange={handleChange}
                  placeholder="Enter Officer ID"
                />
              </Form.Group>
            </Col>
          )}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last"
                value={officerDetails.last}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first"
                value={officerDetails.first}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Precinct</Form.Label>
              <Form.Control
                type="text"
                name="precinct"
                value={officerDetails.precinct}
                onChange={handleChange}
                placeholder="Enter Precinct"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Badge Number</Form.Label>
              <Form.Control
                type="text"
                name="badge"
                value={officerDetails.badge}
                onChange={handleChange}
                placeholder="Enter Badge Number"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={officerDetails.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={officerDetails.status}
                onChange={handleChange}
              >
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {officerId ? 'Update Officer' : 'Add Officer'}
        </Button>
      </Form>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default OfficerPage;
