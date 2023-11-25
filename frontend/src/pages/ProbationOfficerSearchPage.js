import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';

const ProbationOfficerSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [statusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'Active', value: 'A' },
    { id: 2, label: 'Inactive', value: 'I' },
  ]);

  const [startHearingDate, setHearingStartDate] = useState(new Date('2022-04-25'));
  const [startFilingDate, setFilingStartDate] = useState(new Date('2022-04-25'));
  const [selectedStatus, setSelectedStatus] = useState({});

  const [probationOfficers, setProbationOfficers] = useState([]);

  const handleDeleteSuccess = (deletedId) => {
    setProbationOfficers(probationOfficers.filter(officer => officer.prob_officer_id !== deletedId));
    toast.success('Probation Officer deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/api/search/probation_officer', {
        startHearingDate: startHearingDate,
        startFilingDate: startFilingDate,
        selectedStatus: selectedStatus.value
      }, {
        withCredentials: true
      });
      toast.success('Probation Officer search successful');
      setProbationOfficers(response.data.data.results);
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <h1>Probation Officer Search</h1>
      <div className="App" style={{ marginTop: '15vh' }}>
        <Row>
          <Col md={9}>
            <Form onSubmit={handleSubmit}>
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
                disabled={Object.keys(selectedStatus).length === 0 || !startHearingDate || !startFilingDate}
                type="submit"
                className="m-5"
                variant="primary"
              >
                Filter
              </Button>
              {userInfo && userInfo.isAdmin && (
                <Link variant="secondary" to="/login?redirect=/probation_officer">
                  <Button variant="secondary">Add new Probation Officer</Button>
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

      {probationOfficers.length > 0 && (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Prob_Officer_ID</th>
              <th>Status</th>
              <th>Filing Date</th>
              <th>Hearing Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {probationOfficers.map((officer) => (
              <tr key={officer.prob_officer_id}>
                <td>{officer.prob_officer_id}</td>
                <td>{officer.status}</td>
                <td>{officer.filing_date}</td>
                <td>{officer.hearing_date}</td>
                {userInfo && userInfo.isAdmin && (
                  <td>
                    <Link to={`/probation_officer/${officer.prob_officer_id}`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </Link>
                    <DeleteModal
                      id={officer.prob_officer_id}
                      entity={"probation_officer"}
                      onDeleteSuccess={handleDeleteSuccess}
                      onDeleteError={handleDeleteError}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProbationOfficerSearchPage;
