import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const CrimeSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [criminalIDs, setCriminalIDs] = useState([]); // [{ id: 0, label: 'Select Option', value: '' }]
  const [selectedCriminalID, setSelectedCriminalID] = useState({});
  
  const [classification, setClassification] = useState('');
  const [chargeDate, setChargeDate] = useState(null);

  const [status, setStatus] = useState('');

  const [hearingDate, setHearingDate] = useState(null);
  const [appealCutoffDate, setAppealCutoffDate] = useState(null);

  const [crimes, setCrimes] = useState([]);

  const getCriminalIDs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/criminal', {
        withCredentials: true
      });
      setCriminalIDs(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getCriminalIDs();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/search/crime', {
        criminal_id: selectedCriminalID.id,
        classification: classification,
        date_charged: chargeDate ? chargeDate.toISOString().split('T')[0] : null,
        status: status,
        hearing_date: hearingDate ? hearingDate.toISOString().split('T')[0] : null,
        appeal_cut_date: appealCutoffDate ? appealCutoffDate.toISOString().split('T')[0] : null
      }, {
        withCredentials: true
      });
      toast.success('Crime search successful');
      setCrimes(response.data.data.results);
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };


  // Handle delete success and error (similar to SentenceSearchPage)
  const handleDeleteSuccess = (deletedId) => {
    console.log(deletedId);
    setCrimes(crimes.filter(crime => crime.crime_id !== deletedId));
    toast.success('Crime deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };

  return (
    <>
      <h1>Crime Search</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              {/* Form fields */}
              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Crime IDs</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedCriminalID.id || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {criminalIDs.map(option => (
                      <>
                        <Dropdown.Item key={option.id} onClick={() => setSelectedCriminalID(option)}>
                          {option.id}
                        </Dropdown.Item>
                      </>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label >Classification</Form.Label>
                <Form.Select
                  className='input-box'
                  name="classification"
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <option value="">Please Select an Option</option>
                  <option value="F">F (Felony)</option>
                  <option value="M">M (Misdemeanor)</option>
                  <option value="O">O (Other)</option>
                  <option value="U">U (Undefined)</option>

                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-5 ">
                <Form.Label className="m-3" >Date Charged</Form.Label>
                <DatePicker selected={chargeDate} onChange={date => setChargeDate(date)} />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label >Status</Form.Label>
                <Form.Select
                  className='input-box'
                  name="Charge Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Please Select an Option</option>
                  <option value="CL">CL (Closed)</option>
                  <option value="CA">CA (Can Appeal)</option>
                  <option value="IA">IA (In Appeal)</option>

                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-5 ">
                <Form.Label className="m-3" >Hearing Date</Form.Label>
                <DatePicker selected={hearingDate} onChange={date => setHearingDate(date)} />
              </Form.Group>

              <Form.Group className="mb-5 ">
                <Form.Label className="m-3" >Appeal Cutoff Date</Form.Label>
                <DatePicker selected={appealCutoffDate} onChange={date => setAppealCutoffDate(date)} />
              </Form.Group>

              <Button type="submit" className="m-5" variant="primary">Search</Button>
              {userInfo && userInfo.isAdmin && (
                <Link variant="secondary" to="/login?redirect=/crime">
                  <Button variant="secondary">Add new Crime</Button>
                </Link>
              )}
            </Form>
          </Col>
          <Col md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
            {/* Placeholder for additional content or images */}
          </Col>
        </Row>
      </div>

      {crimes.length > 0 && (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Crime ID</th>
              <th>Criminal ID</th>
              <th>Classification</th>
              <th>Date Charged</th>
              <th>Status</th>
              <th>Hearing Date</th>
              <th>Appeal Cut Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crimes.map((crime) => (
              <tr key={crime.crime_id}>
                <td>{crime.crime_id}</td>
                <td>{crime.criminal_id}</td>
                <td>{crime.classification}</td>
                <td>{crime.date_charged}</td>
                <td>{crime.status}</td>
                <td>{crime.hearing_date}</td>
                <td>{crime.appeal_cut_date}</td>
                <td>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <Link to={`/login?redirect=/crime/${crime.crime_id}`}>
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </Link>
                      <DeleteModal
                        id={crime.crime_id}
                        entity="crime"
                        onDeleteSuccess={handleDeleteSuccess}
                        onDeleteError={handleDeleteError}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}



    </>
  );
};

export default CrimeSearchPage