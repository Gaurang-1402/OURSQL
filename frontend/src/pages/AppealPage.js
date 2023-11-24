import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';

const AppealPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [statusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'P (Pending)', value: 'P' },
    { id: 2, label: 'A (Approved)', value: 'A' },
    { id: 3, label: 'D (Disapproved)', value: 'D' },
  ]);

  const [startHearingDate, setHearingStartDate] = useState(new Date('2022-04-25'));
  const [startFilingDate, setFilingStartDate] = useState(new Date('2022-04-25'));
  const [selectedStatus, setSelectedStatus] = useState({});
  const [crimeIDs, setCrimeIDs] = useState([]); // [{}]

  const [selectedCrimeID, setSelectedCrimeID] = useState({});
  // get all crime IDs
  const getCrimeIDs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/crime', {
        withCredentials: true
      });
      setCrimeIDs(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCrimeIDs();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      console.log(startHearingDate, startFilingDate, selectedStatus.value, selectedCrimeID.crimeID)

      const response = await axios.post(BASE_URL + '/api/appeal', {
        startHearingDate: new Date(startHearingDate).toISOString().split('T')[0],
        startFilingDate: new Date(startFilingDate).toISOString().split('T')[0],
        selectedStatus: selectedStatus.value,
        selectedCrimeID: selectedCrimeID.crimeID
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
      <h1>Appeal Create</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={9}>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Crime IDs</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedCrimeID.crimeID || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {crimeIDs.map(option => (
                      <Dropdown.Item key={option.crimeID} onClick={() => setSelectedCrimeID(option)}>
                        {option.crimeID}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

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
              {
                userInfo && userInfo.isAdmin && (

                  <Button type="submit" variant="secondary" disabled={!startHearingDate || !startFilingDate || !selectedStatus || !selectedCrimeID} className="m-5" >Add new Appeal</Button>
                )
              }
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

export default AppealPage