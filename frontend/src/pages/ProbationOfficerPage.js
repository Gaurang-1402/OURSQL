
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';

const ProbationOfficerPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [statusOptions] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'Active', value: 'A' },
    { id: 2, label: 'Inactive', value: 'I' },
  ]);

  const [startHearingDate, setHearingStartDate] = useState(new Date('2022-04-25'));
  const [startFilingDate, setFilingStartDate] = useState(new Date('2022-04-25'));
  const [selectedStatus, setSelectedStatus] = useState({});
  
  const [probationOfficerID, setProbationOfficerID] = useState('');
  const [probationOfficers, setProbationOfficers] = useState([]); 

  const [isUpdate, setIsUpdate] = useState(false);

  const { id: probationOfficerId } = useParams();

  const getProbationOfficers = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/prob_officer', {
        withCredentials: true
      });
      setProbationOfficers(response.data.data.data);
      getProbationOfficer(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // get probation officer data
  const getProbationOfficer = async () => {
    if (probationOfficerId) {
      try {
        const response = await axios.get(BASE_URL + '/api/prob_officer/' + probationOfficerId, {
          withCredentials: true
        });
        const probationOfficer = response.data.data.data[0];

        setIsUpdate(true);
        setProbationOfficerID(probationOfficer.Prob_ID)
        setHearingStartDate(new Date(probationOfficer.hearing_date));
        setFilingStartDate(new Date(probationOfficer.filing_date));
        setSelectedStatus(statusOptions.find(option => option.value === probationOfficer.status));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProbationOfficers();
  }, []);

  // CREATE
  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/prob_officer', {
        startHearingDate: new Date(startHearingDate).toISOString().split('T')[0],
        startFilingDate: new Date(startFilingDate).toISOString().split('T')[0],
        selectedStatus: selectedStatus.value
      }, {
        withCredentials: true
      });

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };

  // UPDATE
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(BASE_URL + '/api/prob_officer/' + probationOfficerID, {
        startHearingDate: new Date(startHearingDate).toISOString().split('T')[0],
        startFilingDate: new Date(startFilingDate).toISOString().split('T')[0],
        selectedStatus: selectedStatus.value
      }, {
        withCredentials: true
      });

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{isUpdate ? 'Probation Officer Update' : 'Probation Officer Create'}</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={9}>
            <Form onSubmit={isUpdate ? handleUpdateSubmit : handleCreateSubmit}>
              <Form.Group className="mb-5">
                <Form.Label className="m-3">Hearing Date</Form.Label>
                <DatePicker
                  selected={startHearingDate}
                  onChange={(date) => setHearingStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label className="m-3">Filing Date</Form.Label>
                <DatePicker
                  selected={startFilingDate}
                  onChange={(date) => setFilingStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Status</Form.Label>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedStatus.label || "Select Option"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {statusOptions.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => setSelectedStatus(option)}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Button
                type="submit"
                variant="secondary"
                disabled={!startHearingDate || !startFilingDate || !selectedStatus}
                className="m-5"
              >
                {isUpdate ? 'Update Probation Officer' : 'Create New Probation Officer'}
              </Button>
            </Form>
          </Col>
          <Col md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
            {/* Placeholder for image */}
            <img src="path_to_your_image.jpg" alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Navigate to='/' replace />
  );
}

export default ProbationOfficerPage;