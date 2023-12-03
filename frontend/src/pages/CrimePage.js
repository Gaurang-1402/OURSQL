import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';

import crimeImage from '../images/crime.jpeg';

const CrimePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id:crimeId } = useParams();

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
      getCrime(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getCriminalIDs();
  }, []);

  const [isUpdate, setIsUpdate] = useState(false);


  const getCrime = async (criminalIds) => {
    if (crimeId && criminalIds) {
      try {
        const response = await axios.get(`${BASE_URL}/api/crime/${crimeId}`, {
          withCredentials: true
        });
        const crime = response.data.data.data[0];
  
        setIsUpdate(true);

        const foundCriminal = criminalIds.find((criminal) => criminal.id === crime.criminal_id);
  
        
        setSelectedCriminalID(foundCriminal ? foundCriminal : null);

        setClassification(crime.classification);
        setChargeDate(new Date(crime.date_charged));
        setStatus(crime.status);
        setHearingDate(new Date(crime.hearing_date));
        setAppealCutoffDate(new Date(crime.appeal_cut_date));
      } catch (error) {
        console.error(error);
        toast.error('Error fetching crime data');
      }
    } else {
      console.log("Criminal IDs are not available.");
    }
  };
  
  

  useEffect(() => {
    getCrime();
  }, [crimeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const crimeData = {
      criminal_id: selectedCriminalID.id,
      classification: classification,
      date_charged: chargeDate ? chargeDate.toISOString().split('T')[0] : null,
      status: status,
      hearing_date: hearingDate ? hearingDate.toISOString().split('T')[0] : null,
      appeal_cut_date: appealCutoffDate ? appealCutoffDate.toISOString().split('T')[0] : null
    };

    try {
      const url = crimeId ? `${BASE_URL}/api/crime/${crimeId}` : `${BASE_URL}/api/crime`;
      const method = crimeId ? 'put' : 'post';

      await axios[method](url, crimeData, {
        withCredentials: true
      });

      toast.success(`Crime ${crimeId ? 'updated' : 'created'} successfully`);
      navigate('/');

    } catch (error) {
      console.error(error);
      toast.error(`Crime was not ${crimeId ? 'updated' : 'created'} successfully`);
    }
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{isUpdate ? 'Update Crime' : 'Create Crime'}</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={7}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Criminal IDs</Form.Label>

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

              <Button type="submit" variant="primary">{isUpdate ? 'Update Crime' : 'Create Crime'}</Button>
            </Form>
          </Col>
          <Col className='icon-image-parent' md={3} style={{ padding: '20px' }}>
            {/* Placeholder for additional content or images */}
            <img className='icon-image' src={crimeImage} alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Navigate to='/' replace />
  );
}

export default CrimePage