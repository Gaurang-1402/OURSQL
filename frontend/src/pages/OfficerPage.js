import React, { useState, useEffect } from 'react';
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
  const { id:officerId } = useParams();

  const [officerDetails, setOfficerDetails] = useState({
    last: '',
    first: '',
    precinct: '',
    badge: '',
    phone: '',
    status: 'A' // default status
  });

  const [isUpdate, setIsUpdate] = useState(false);

  // get officer data
  const getOfficer = async () => {
    if (officerId) { // Use officerId instead of appealId
      try {
        const response = await axios.get(`${BASE_URL}/api/officer/${officerId}`, {
          withCredentials: true
        });
        const officer = response.data.data.data[0];
        console.log(officer);

        setIsUpdate(true);
        setOfficerDetails({
          last: officer.last,
          first: officer.first,
          precinct: officer.precinct,
          badge: officer.badge,
          phone: officer.phone,
          status: officer.status
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getOfficer();
  }, [officerId]); // Added officerId as a dependency

  const handleChange = (e) => {
    setOfficerDetails({ ...officerDetails, [e.target.name]: e.target.value });
  };

  // Function to add or update officer details
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = officerId ? `${BASE_URL}/api/officer/${officerId}` : `${BASE_URL}/api/officer`;
      const method = officerId ? 'put' : 'post';

      await axios[method](url, officerDetails, {
        withCredentials: true
      });

      toast.success(`Officer ${officerId ? 'updated' : 'added'} successfully`);
      navigate('/');
    } catch (error) {
      toast.error(`Officer was not ${officerId ? 'updated' : 'added'} successfully`);
      console.error(error);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{officerId ? 'Edit Officer' : 'Add Officer'}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
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
