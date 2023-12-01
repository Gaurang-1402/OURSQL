import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import probOfficerImage from '../images/probation-officer.jpeg';

const ProbationOfficerPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id:probOfficerId } = useParams();

  const [probOfficerDetails, setProbOfficerDetails] = useState({
    last: '',
    first: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    status: 'A' // default status
  });

  const [isUpdate, setIsUpdate] = useState(false);

  // get prob officer data
  const getProbOfficer = async () => {
    if (probOfficerId) { // Use officerId instead of appealId
      try {
        const response = await axios.get(`${BASE_URL}/api/probation-officer/${probOfficerId}`, {
          withCredentials: true
        });
        const probOfficer = response.data.data.data[0];
        console.log(probOfficer);

        setIsUpdate(true);
        setProbOfficerDetails({
          last: probOfficer.last,
          first: probOfficer.first,
          zip: probOfficer.zip,
          phone: probOfficer.phone,
          email: probOfficer.email,
          status: probOfficer.status
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProbOfficer();
  }, [probOfficerId]); // Added officerId as a dependency

  const handleChange = (e) => {
    setProbOfficerDetails({ ...probOfficerDetails, [e.target.name]: e.target.value });
  };

  // Function to add or update officer details
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = probOfficerId ? `${BASE_URL}/api/probation-officer/${probOfficerId}` : `${BASE_URL}/api/probation-officer`;
      const method = probOfficerId ? 'put' : 'post';

      await axios[method](url, probOfficerDetails, {
        withCredentials: true
      });

      toast.success(`Probation Officer ${probOfficerId ? 'updated' : 'added'} successfully`);
      navigate('/');
    } catch (error) {
      toast.error(`Probation Officer was not ${probOfficerId ? 'updated' : 'added'} successfully`);
      console.error(error);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{probOfficerId ? 'Edit Probation Officer' : 'Add Probation Officer'}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last"
                value={probOfficerDetails.last}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first"
                value={probOfficerDetails.first}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={probOfficerDetails.zip}
                onChange={handleChange}
                placeholder="Enter Zip Code"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={probOfficerDetails.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={probOfficerDetails.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={probOfficerDetails.status}
                onChange={handleChange}
              >
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={7}>
          <img className='icon-image' src={probOfficerImage} alt="Description" style={{ width: '100%' }} />

          </Col>

        </Row>
        <Button variant="primary" type="submit">
          {probOfficerId ? 'Update Probation Officer' : 'Add Probation Officer'}
        </Button>
      </Form>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProbationOfficerPage