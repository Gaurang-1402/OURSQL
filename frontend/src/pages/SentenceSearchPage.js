
import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';

const SentenceSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [typeOptions,] = useState([
    { id: 0, label: 'Jail Period', value: 'J' },
    { id: 1, label: 'House Arrest', value: 'H' },
    { id: 2, label: 'Probation', value: 'P' },
  ]);

  const [startStartDate, setStartStartDate] = useState(new Date('2022-04-25'));
  const [endEndDate, setEndEndDate] = useState(new Date('2022-04-26'));
  const [selectedType, setSelectedType] = useState({});

  const [sentences, setSentences] = useState([]); // [{}]

  const handleDeleteSuccess = (deletedId) => {
    setSentences(sentences.filter(sentence => sentence.sentence_id !== deletedId));
    toast.success('Sentence deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/search/sentence', {
        startStartDate: startStartDate,
        endEndDate: endEndDate,
        selectedType: selectedType.value
      }, {
        withCredentials: true
      });
      toast.success('Sentence search successful');
      setSentences(response.data.data.results);
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <h1>Sentence Search</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={9}>
            <Form onSubmit={handleSubmit}>
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
              <Button disabled={Object.keys(selectedType).length === 0 || !startStartDate || !endEndDate} type="submit" className="m-5" variant="primary">Filter</Button>
              {userInfo && userInfo.isAdmin && (
                <Link variant="secondary" to="/login?redirect=/sentence">
                  <Button variant="secondary">Add new Sentence</Button>
                </Link>
              )}
            </Form>
          </Col>
          <Col md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
            {/* Placeholder for image */}
            <img src="path_to_your_image.jpg" alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
      {sentences.length > 0 && (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>CRIMINAL_ID</th>
              <th>TYPE</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>VIOLATIONS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sentences.map((sentence) => (
              <tr key={sentence.sentence_id}>
                <td>{sentence.criminal_id}</td>
                <td>{sentence.type}</td>
                <td>{sentence.start_date}</td>
                <td>{sentence.end_date}</td>
                <td>{sentence.violations}</td>
                {userInfo && userInfo.isAdmin && (
                  <td>
                    <Link to={`/sentence/${sentence.sentence_id}`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </Link>
                    <DeleteModal id={sentence.sentence_id} entity={"sentence"} onDeleteSuccess={handleDeleteSuccess}
                      onDeleteError={handleDeleteError}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>)
      }
    </>
  );
}


export default SentenceSearchPage