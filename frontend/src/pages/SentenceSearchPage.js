import React, { useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import sSentenceImage from '../images/s-sentence.jpeg';

const SentenceSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [sentenceType, setSentenceType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [violations, setViolations] = useState('1');

  const [sentences, setSentences] = useState([]); // [{}]

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/search/sentence', {
        type: sentenceType,
        start_date: startDate ? startDate.toISOString().split('T')[0] : null,
        end_date: endDate ? endDate.toISOString().split('T')[0] : null,
        violations: violations
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

  const handleDeleteSuccess = (deletedId) => {
    setSentences(sentences.filter(sentence => sentence.sentence_id !== deletedId));
    toast.success('Sentence deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };


  return (
    <>
      <h1>Sentence Search</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-5">
                <Form.Label >Type of Sentence</Form.Label>
                <Form.Select className='input-box' onChange={(e) => setSentenceType(e.target.value)}>
                  <option value="">Select Sentence Type</option>
                  <option value="J">Jail</option>
                  <option value="H">House Arrest</option>
                  <option value="P">Probation</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className='m-3'>Start Date</Form.Label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className='m-3'>End Date</Form.Label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label>Number of Violations</Form.Label>
                <Form.Control type="number" className='input-box' placeholder="Enter number of violations" onChange={(e) => setViolations(e.target.value)} />
              </Form.Group>

              <Button type="submit" className="m-5" variant="primary">Search</Button>
              {userInfo && userInfo.isAdmin && (
                <Link variant="secondary" to="/login?redirect=/sentence">
                  <Button variant="secondary">Add new Sentence</Button>
                </Link>
              )}
            </Form>
          </Col>
          <Col className='icon-image-parent' md={3} style={{ padding: '20px' }}>
            {/* Placeholder for additional content or images */}
            <img className='icon-image' src={sSentenceImage} alt="Description" style={{ width: '100%' }} />
          </Col>


        </Row>
      </div>

      {
        sentences.length > 0 && (
          <>
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Sentence ID</th>
                  <th>Criminal ID</th>
                  <th>Type</th>
                  <th>Probation Officer ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Violations</th>
                  {
                  userInfo && userInfo.isAdmin && (
                    <th>Actions</th>
                  )
                }                </tr>
              </thead>
              <tbody>
                {sentences.map((sentence) => (
                  <tr key={sentence.sentence_id}>
                    <td>{sentence.sentence_id}</td>
                    <td>{sentence.criminal_id}</td>
                    <td>{sentence.type}</td>
                    <td>{sentence.prob_id}</td>
                    <td>{sentence.start_date}</td>
                    <td>{sentence.end_date}</td>
                    <td>{sentence.violations}</td>
                    <td>
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <Link to={`/sentence/${sentence.sentence_id}`}>
                            <Button variant='light' className='btn-sm'>
                              <FaEdit />
                            </Button>
                          </Link>
                          <DeleteModal id={sentence.sentence_id} entity={"sentence"} onDeleteSuccess={handleDeleteSuccess} onDeleteError={handleDeleteError} />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )
      }
    </>
  );
}

export default SentenceSearchPage;
