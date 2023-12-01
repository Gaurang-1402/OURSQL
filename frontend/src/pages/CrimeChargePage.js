import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import crimeChargeImage from '../images/crime-charge.jpeg';

const CrimeChargePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id:chargeId } = useParams();

  const [crimeIDs, setCrimeIDs] = useState([]); // [{ id: 0, label: 'Select Option', value: '' }]
  const [selectedCrimeID, setSelectedCrimeID] = useState({});
  const [selectedCrimeCode, setSelectedCrimeCode] = useState({});
  const [crimeCodeIDs, setCrimeCodeIDs] = useState([]); // [{ id: 0, label: 'Select Option', value: '' }

  const [chargeStatus, setChargeStatus] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [courtFee, setCourtFee] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentDueDate, setPaymentDueDate] = useState(new Date());

  const [isUpdate, setIsUpdate] = useState(false);

  const getCrimeIDs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/crime', {
        withCredentials: true
      });
      setCrimeIDs(response.data.data.data);
      getCrimeCodeIDs(response.data.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  const getCrimeCodeIDs = async (crimeIds) => {
    try {
      const response = await axios.get(BASE_URL + '/api/crime-code', {
        withCredentials: true
      });
      setCrimeCodeIDs(response.data.data.data);
      getCrimeCharge(response.data.data.data, crimeIds);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCrimeIDs();
  }, []);


  const getCrimeCharge = async (crimeCodeIds, crimeIds) => {
    if (chargeId && crimeIds && crimeCodeIds) {
      try {
        const response = await axios.get(`${BASE_URL}/api/crime-charge/${chargeId}`, {
          withCredentials: true
        });
        const charge = response.data.data.data[0];
  
        setIsUpdate(true);
  
        const foundCrime = crimeIds.find((crime) => crime.crimeID === charge.crime_id);
        const foundCrimeCode = crimeCodeIds.find((crimeCode) => crimeCode.id === charge.crime_code);
  
        setSelectedCrimeID(foundCrime ? foundCrime : null);
        setSelectedCrimeCode(foundCrimeCode ? foundCrimeCode : null);
  
        setChargeStatus(charge.charge_status);
        setFineAmount(charge.fine_amount);
        setCourtFee(charge.court_fee);
        setAmountPaid(charge.amount_paid);
        setPaymentDueDate(new Date(charge.payment_due_date));
      } catch (error) {
        console.error(error);
        toast.error('Error fetching crime charge data');
      }
    } else {
      console.log("Crime IDs or Crime Code IDs are not available.");
    }
  };
  
  

  useEffect(() => {
    getCrimeCharge();
  }, [chargeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const crimeChargeData = {
      crime_id: selectedCrimeID.crimeID,
      crime_code: selectedCrimeCode.id,
      charge_status: chargeStatus,
      fine_amount: fineAmount,
      court_fee: courtFee,
      amount_paid: amountPaid,
      payment_due_date: paymentDueDate ? paymentDueDate.toISOString().split('T')[0] : null
    };

    try {
      const url = chargeId ? `${BASE_URL}/api/crime-charge/${chargeId}` : `${BASE_URL}/api/crime-charge`;
      const method = chargeId ? 'put' : 'post';

      await axios[method](url, crimeChargeData, {
        withCredentials: true
      });

      toast.success(`Crime Charge ${chargeId ? 'updated' : 'created'} successfully`);
      navigate('/');

    } catch (error) {
      console.error(error);
      toast.error(`Crime Charge was not ${chargeId ? 'updated' : 'created'} successfully`);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{isUpdate ? 'Update Crime Charge' : 'Create Crime Charge'}</h1>
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
                <Dropdown>
                  <Form.Label className="m-3">Crime Code IDs</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedCrimeCode.id || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {crimeCodeIDs.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => setSelectedCrimeCode(option)}>
                        {option.id}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Charge Status</Form.Label>
                <Form.Control className='input-box' as="select" value={chargeStatus} onChange={(e) => setChargeStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="PD">PD (Pending)</option>
                  <option value="GL">GL (Guilty)</option>
                  <option value="NG">NG (Not Guilty)</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fine Amount</Form.Label>
                <Form.Control className='input-box' type="number" placeholder="Enter Fine Amount" value={fineAmount} onChange={(e) => setFineAmount(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Court Fee</Form.Label>
                <Form.Control className='input-box' type="number" placeholder="Enter Court Fee" value={courtFee} onChange={(e) => setCourtFee(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control className='input-box' type="number" placeholder="Enter Amount Paid" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-5 ">
                <Form.Label className="m-3" >Payment Due Date</Form.Label>
                <DatePicker selected={paymentDueDate} onChange={date => setPaymentDueDate(date)} />
              </Form.Group>

              <Button type="submit" variant="primary">{isUpdate ? 'Update Crime Charge' : 'Create Crime Charge'}</Button>
            </Form>
          </Col>
          <Col className='icon-image-parent' md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
          <img className='icon-image' src={crimeChargeImage} alt="Description" style={{ width: '100%' }} />

          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Navigate to='/' replace />
  );
};

export default CrimeChargePage;