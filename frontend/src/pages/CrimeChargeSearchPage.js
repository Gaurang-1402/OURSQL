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
import sCrimeChargeImage from '../images/s-crime-charges.jpg';

const CrimeChargeSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [crimeIDs, setCrimeIDs] = useState([]); // [{ id: 0, label: 'Select Option', value: '' }]
  const [selectedCrimeID, setSelectedCrimeID] = useState({});
  const [selectedCrimeCode, setSelectedCrimeCode] = useState({});
  const [crimeCodeIDs, setCrimeCodeIDs] = useState([]); // [{ id: 0, label: 'Select Option', value: '' }

  const [crimeCode, setCrimeCode] = useState('');
  const [chargeStatus, setChargeStatus] = useState('');
  const [paymentDueDate, setPaymentDueDate] = useState(null);

  const [crimeCharges, setCrimeCharges] = useState([]); // [{}]

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

  const getCrimeCodeIDs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/crime-code', {
        withCredentials: true
      });
      setCrimeCodeIDs(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCrimeIDs();
    getCrimeCodeIDs();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/search/crime-charge', {
        crime_id: selectedCrimeID.crimeID,
        crime_code: crimeCode,
        charge_status: chargeStatus,
        payment_due_date: paymentDueDate ? paymentDueDate.toISOString().split('T')[0] : null
      }, {
        withCredentials: true
      });
      toast.success('Crime charge search successful');
      setCrimeCharges(response.data.data.results);
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };


  // Handle delete success and error (similar to SentenceSearchPage)
  const handleDeleteSuccess = (deletedId) => {
    console.log(deletedId);
    setCrimeCharges(crimeCharges.filter(charge => charge.charge_id !== deletedId));
    toast.success('Crime charge deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };

  return (
    <>
      <h1>Crime Charge Search</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              {/* Form fields */}
              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Crime IDs</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedCrimeID.crimeID || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {crimeIDs.map(option => (
                      <>
                        <Dropdown.Item key={option.crimeID} onClick={() => setSelectedCrimeID(option)}>
                          {option.crimeID}
                        </Dropdown.Item>
                      </>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Crime Code IDs</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedCrimeCode.id || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {crimeCodeIDs.map(option => (
                      <>
                        <Dropdown.Item key={option.id} onClick={() => setSelectedCrimeCode(option)}>
                          {option.id}
                        </Dropdown.Item>
                      </>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label >Charge Status</Form.Label>
                <Form.Select
                  className='input-box'
                  name="Charge Status"
                  value={chargeStatus}
                  onChange={(e) => setChargeStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="PD">PD (Pending)</option>
                  <option value="PL">GL (Guilty)</option>
                  <option value="NG">NG (Not Guilty)</option>

                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-5 ">
                <Form.Label className="m-3" >Payment Due Date</Form.Label>
                <DatePicker selected={paymentDueDate} onChange={date => setPaymentDueDate(date)} />
              </Form.Group>

              <Button type="submit" className="m-5" variant="primary">Search</Button>
              {userInfo && userInfo.isAdmin && (
                <Link variant="secondary" to="/login?redirect=/crime-charge">
                  <Button variant="secondary">Add new Crime Charge</Button>
                </Link>
              )}
            </Form>
          </Col>
          <Col className='icon-image-parent' md={3} style={{ padding: '20px' }}>
            {/* Placeholder for additional content or images */}
            <img className='icon-image' src={sCrimeChargeImage} alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>

      {crimeCharges.length > 0 && (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Charge ID</th>
              <th>Crime ID</th>
              <th>Crime Code</th>
              <th>Code Description</th>
              <th>Charge Status</th>
              <th>Fine Amount</th>
              <th>Court Fee</th>
              <th>Amount Paid</th>
              <th>Payment Due Date</th>
              {
                  userInfo && userInfo.isAdmin && (
                    <th>Actions</th>
                  )
                }            </tr>
          </thead>
          <tbody>
            {crimeCharges.map((charge) => (
              <tr key={charge.charge_id}>
                <td>{charge.charge_id}</td>
                <td>{charge.crime_id}</td>
                <td>{charge.crime_code}</td>
                <td>{charge.code_description}</td>
                <td>{charge.charge_status}</td>
                <td>{charge.fine_amount}</td>
                <td>{charge.court_fee}</td>
                <td>{charge.amount_paid}</td>
                <td>{charge.payment_due_date}</td>
                <td>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <Link to={`/login?redirect=/crime-charge/${charge.charge_id}`}>
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </Link>
                      <DeleteModal
                        id={charge.charge_id}
                        entity="crime-charge"
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
}

export default CrimeChargeSearchPage;