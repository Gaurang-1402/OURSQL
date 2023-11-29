import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CriminalPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id:criminalId } = useParams();

  const [criminalDetails, setCriminalDetails] = useState({
    last: '',
    first: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    v_status: 'Y',
    p_status: 'Y' // default status
  });

  const [isUpdate, setIsUpdate] = useState(false);

  // get prob officer data
  const getCriminal = async () => {
    if (criminalId) { // Use officerId instead of appealId
      try {
        const response = await axios.get(`${BASE_URL}/api/criminal/${criminalId}`, {
          withCredentials: true
        });
        const criminal = response.data.data.data[0];
        console.log(criminal);

        setIsUpdate(true);
        setCriminalDetails({
          last: criminal.last,
          first: criminal.first,
          zip: criminal.zip,
          phone: criminal.phone,
          v_status: criminal.v_status,
          p_status: criminal.p_status
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCriminal();
  }, [criminalId]); // Added officerId as a dependency

  const handleChange = (e) => {
    setCriminalDetails({ ...criminalDetails, [e.target.name]: e.target.value });
  };

  // Function to add or update officer details
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = criminalId ? `${BASE_URL}/api/criminal/${criminalId}` : `${BASE_URL}/api/criminal`;
      const method = criminalId ? 'put' : 'post';

      await axios[method](url, criminalDetails, {
        withCredentials: true
      });

      toast.success(`Criminal ${criminalId ? 'updated' : 'added'} successfully`);
      navigate('/');
    } catch (error) {
      toast.error(`Criminal was not ${criminalId ? 'updated' : 'added'} successfully`);
      console.error(error);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{criminalId ? 'Edit Criminal' : 'Add Criminal'}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last"
                value={criminalDetails.last}
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
                value={criminalDetails.first}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={criminalDetails.zip}
                onChange={handleChange}
                placeholder="Enter Zip Code"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={criminalDetails.phone}
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
                value={criminalDetails.v_status}
                onChange={handleChange}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={criminalDetails.p_status}
                onChange={handleChange}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {criminalId ? 'Update Criminal' : 'Add Criminal'}
        </Button>
      </Form>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default CriminalPage