import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';

import sentenceImage from '../images/sentence.jpeg';

const SentencePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: sentenceId } = useParams();

  const [criminals, setCriminals] = useState([]); // [{ id: 0, label: 'Select Option', value: '' }]
  const [probOfficers, setProbOfficers] = useState([]);

  const [selectedCriminal, setSelectedCriminal] = useState({});
  const [selectedProbOfficer, setSelectedProbOfficer] = useState({});
  const [sentenceType, setSentenceType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [violations, setViolations] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);

  
  // Get all criminals
  const getCriminals = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/criminal', {
        withCredentials: true
      });
      console.log(response.data.data);
      setCriminals(response.data.data.data);
      getProbOfficers(response.data.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  // Get all probation officers
  const getProbOfficers = async (criminals) => {
    try {
      const response = await axios.get(BASE_URL + '/api/probation-officer', {
        withCredentials: true
      });
      setProbOfficers(response.data.data.data);
      getSentence( response.data.data.data, criminals)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedCriminal.value) {
      toast.error('Please select a criminal');
      return;
    }
  
    if (!selectedProbOfficer.value) {
      toast.error('Please select a probation officer');
      return;
    }
  
    if (!sentenceType) {
      toast.error('Please select a sentence type');
      return;
    }
  
    try {
      const sentenceData = {
        criminal_id: selectedCriminal.value,
        type: sentenceType,
        prob_id: selectedProbOfficer.value,
        start_date: startDate ? startDate.toISOString().split('T')[0] : null,
        end_date: endDate ? endDate.toISOString().split('T')[0] : null,
        violations: violations
      };
  
      const url = sentenceId ? `${BASE_URL}/api/sentence/${sentenceId}` : `${BASE_URL}/api/sentence`;
      const method = sentenceId ? 'put' : 'post';
  
      await axios[method](url, sentenceData, {
        withCredentials: true
      });
  
      toast.success(`Sentence ${sentenceId ? 'updated' : 'created'} successfully`);
      navigate('/');
  
    } catch (error) {
      console.error(error);
      toast.error(`Sentence was not ${sentenceId ? 'updated' : 'created'} successfully`);
    }
  };
  

  const getSentence = async (probOfficers, criminals) => {
    if (sentenceId) {
      try {
        const response = await axios.get(`${BASE_URL}/api/sentence/${sentenceId}`, {
          withCredentials: true
        });
        const sentence = response.data.data.data[0];        
        console.log(sentence.start_date)
        setIsUpdate(true);
        setSelectedCriminal(criminals.find(c => c.value === sentence.criminal_id) || {});
        setSelectedProbOfficer(probOfficers.find(p => p.value === sentence.prob_id) || {});
        setSentenceType(sentence.type);
        setStartDate(new Date(sentence.start_date));
        setEndDate(new Date(sentence.end_date));
        setViolations(sentence.violations);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching sentence data');
      }
    }
  };
  useEffect(() => {

    getCriminals();
  }, []);


  return userInfo && userInfo.isAdmin ? (
    <>
      <h1>{isUpdate ? 'Update Sentence' : 'Create Sentence'}</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={7}>
            <Form onSubmit={handleSubmit}>
              {/* Dropdown for Criminal ID */}
              <Form.Group className="mb-3">
                <Form.Label>Criminal</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedCriminal.label || "Select Criminal"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {criminals.map(criminal => (
                      <Dropdown.Item key={criminal.id} onClick={() => setSelectedCriminal(criminal)}>
                        {criminal.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {/* Dropdown for Probation Officer ID */}
              <Form.Group className="mb-3">
                <Form.Label>Probation Officer</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedProbOfficer.label || "Select Probation Officer"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {probOfficers.map(officer => (
                      <Dropdown.Item key={officer.id} onClick={() => setSelectedProbOfficer(officer)}>
                        {officer.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {/* Sentence Type */}
              <Form.Group className="mb-3">
                <Form.Label>Sentence Type</Form.Label>
                <Form.Select className='input-box' value={sentenceType} onChange={e => setSentenceType(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="J">Jail</option>
                  <option value="H">House Arrest</option>
                  <option value="P">Probation</option>
                </Form.Select>
              </Form.Group>

              {/* Start Date */}
              <Form.Group className="mb-5">
                <Form.Label className='m-3'>Start Date</Form.Label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              </Form.Group>

              {/* End Date */}
              <Form.Group className="mb-5">
                <Form.Label className='m-3'>End Date</Form.Label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
              </Form.Group>

              {/* Violations */}
              <Form.Group className="mb-3">
                <Form.Label>Violations</Form.Label>
                <Form.Control className='input-box' type="number" value={violations} onChange={e => setViolations(e.target.value)} placeholder="Enter number of violations" />
              </Form.Group>

              <Button type="submit" variant="primary">{isUpdate ? 'Update Sentence' : 'Create Sentence'}</Button>
            </Form>
          </Col>
          <Col className='icon-image-parent' md={4} style={{ padding: '20px' }}>
            {/* Placeholder for additional content or images */}
            <img className='icon-image' src={sentenceImage} alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Navigate to='/' replace />
  );
};

export default SentencePage;