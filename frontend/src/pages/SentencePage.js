import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { Navigate, Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';

const SentencePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: sentenceId } = useParams();

  const [typeOptions,] = useState([
    { id: 0, label: 'Jail Period', value: 'J' },
    { id: 1, label: 'House Arrest', value: 'H' },
    { id: 2, label: 'Probation', value: 'P' },
  ]);

  const [startStartDate, setStartStartDate] = useState(new Date('2022-04-25'));
  const [endEndDate, setEndEndDate] = useState(new Date('2022-04-26'));
  const [selectedType, setSelectedType] = useState({});
  const [criminalIDs, setCriminalIDs] = useState([]);
  const [sentenceID, setSentenceID] = useState('');
  const [selectedCriminalID, setSelectedCriminalID] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const getCriminalIDs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/criminal', {
        withCredentials: true
      });
      setCriminalIDs(response.data.data.data);
      getSentence(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSentence = async (currCriminalIDs) => {
    if (sentenceId) {
      try {
        const response = await axios.get(BASE_URL + '/api/sentence/' + sentenceId, {
          withCredentials: true
        });
        const sentence = response.data.data.data[0];

        setIsUpdate(true);
        setSentenceID(sentence.sentence_id);
        setStartStartDate(new Date(sentence.start_date));
        setEndEndDate(new Date(sentence.end_date));
        setSelectedType(typeOptions.find(option => option.value === sentence.type));
        setSelectedCriminalID(currCriminalIDs.find(option => option.criminalID === sentence.criminal_id) || {});
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCriminalIDs();
  }, []);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/sentence', {
        startStartDate: new Date(startStartDate).toISOString().split('T')[0],
        endEndDate: new Date(endEndDate).toISOString().split('T')[0],
        selectedType: selectedType.value,
        selectedCriminalID: selectedCriminalID.criminalID
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

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(BASE_URL + '/api/sentence/' + sentenceID, {
        startStartDate: new Date(startStartDate).toISOString().split('T')[0],
        endEndDate: new Date(endEndDate).toISOString().split('T')[0],
        selectedType: selectedType.value,
        selectedCriminalID: selectedCriminalID.criminalID
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(BASE_URL + '/api/sentence/' + sentenceID, {
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
      <h1>{isUpdate ? 'Sentence Update' : 'Sentence Create'}</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={9}>
            <Form onSubmit={isUpdate ? handleUpdateSubmit : handleCreateSubmit}>
              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Criminal IDs</Form.Label>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedCriminalID.criminalID || "Select Option"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {criminalIDs.map(option => (
                      <Dropdown.Item key={option.criminalID} onClick={() => setSelectedCriminalID(option)}>
                        {option.criminalID}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label className="m-3">Start Date</Form.Label>
                <DatePicker
                  selected={startStartDate}
                  onChange={(date) => setStartStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label className="m-3">End Date</Form.Label>
                <DatePicker
                  selected={endEndDate}
                  onChange={(date) => setEndEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Type</Form.Label>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedType.label || "Select Option"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {typeOptions.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => setSelectedType(option)}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Button type="submit" variant="secondary" disabled={!startStartDate || !endEndDate || !selectedType || !selectedCriminalID} className="m-5" >{isUpdate ? 'Update Sentence' : 'Create new Sentence'}</Button>
              {isUpdate && (
                <Button variant="danger" onClick={handleDelete} className="m-5">
                  Delete Sentence
                </Button>
              )}
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

export default SentencePage;
