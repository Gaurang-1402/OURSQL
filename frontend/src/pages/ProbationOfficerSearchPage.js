import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import sProbationOfficerImage from '../images/s-probation-officer.jpeg';

const ProbationOfficerSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [nameOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'Starts with', value: 'startswith' },
    { id: 2, label: 'Contains', value: 'contains' },
  ]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedFirstNameFilter, setSelectedFirstNameFilter] = useState({});
  const [selectedLastNameFilter, setSelectedLastNameFilter] = useState({});

  const [zip, setZip] = useState('');

  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');

  const [probOfficers, setProbOfficers] = useState([]); // [{}]

  const [selectedStatus, setSelectedStatus] = useState({});
  const [statusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'I (Inactive)', value: 'I' },
    { id: 2, label: 'A (Active)', value: 'A' }
  ]);

  const handleDeleteSuccess = (deletedId) => {
    setProbOfficers(probOfficers.filter(probOfficer => probOfficer.prob_id !== deletedId));
    toast.success('Probation Officer deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(BASE_URL + '/api/search/probation-officer', {
        firstName: firstName,
        lastName: lastName,
        selectedFirstNameFilter: selectedFirstNameFilter.value,
        selectedLastNameFilter: selectedLastNameFilter.value,
        zip: zip,
        phone: phone,
        email: email,
        selectedStatus: selectedStatus.value
      }, {
        withCredentials: true
      });
      toast.success('Probation Officer search successful');
      setProbOfficers(response.data.data.results);

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
          <Col md={8}>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-5">
                <Row>
                  <Col>
                    <Dropdown>
                      <Form.Label className="m-3">First Name</Form.Label>

                      <Dropdown.Toggle variant="success" id="dropdown-basic">

                        {selectedFirstNameFilter.label || "Select Option"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {nameOptions.map(option => (
                          <Dropdown.Item key={option.id} onClick={() => setSelectedFirstNameFilter(option)}>
                            {option.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col md={8}>
                    <Form.Control className='m-2 input-box' type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-5">
                <Row>
                  <Col>
                    <Dropdown>
                      <Form.Label className="m-3">Last Name</Form.Label>

                      <Dropdown.Toggle variant="success" id="dropdown-basic">

                        {selectedLastNameFilter.label || "Select Option"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {nameOptions.map(option => (
                          <Dropdown.Item key={option.id} onClick={() => setSelectedLastNameFilter(option)}>
                            {option.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col md={8}>
                    <Form.Control className='m-2 input-box' type="text" onChange={(e) => {
                  setLastName(e.target.value)
                }} placeholder="Enter last name" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">ZIP Code</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(e) => {
                  setZip(e.target.value)
                }} type="text" placeholder="Search for 5 char ZIP Code" />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">Phone</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Search for phone no" />

              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">Email</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Search for email" />

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

              {/* <Button disabled={Object.keys(selectedLastNameFilter).length === 0 || !firstName || !lastName} type="submit" className="m-5" variant="primary">Filter</Button>              { */}
              <Button type="submit" className="m-5" variant="primary">Filter</Button>              {

                userInfo && userInfo.isAdmin && (
                  <Link variant="secondary" to="/login?redirect=/probation-officer">
                    <Button variant="secondary">Add new Probation Officer</Button>
                  </Link>
                )
              }
            </Form>
          </Col>
          <Col md={3} className='icon-image-parent' style={{padding: '20px' }}>
            {/* Placeholder for image */}
            <img src={sProbationOfficerImage} className='icon-image' alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
      {
        probOfficers.length > 0 && (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Officer ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Zip</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                {
                  userInfo && userInfo.isAdmin && (
                    <th>Actions</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                probOfficers.map((probOfficer) => (
                  <tr key={probOfficer.prob_id}>
                    <td>{probOfficer.prob_id}</td>
                    <td>{probOfficer.last}</td>
                    <td>{probOfficer.first}</td>
                    <td>{probOfficer.zip}</td>
                    <td>{probOfficer.phone}</td>
                    <td>{probOfficer.email}</td>
                    <td>{probOfficer.status}</td>
                    {
                      userInfo && userInfo.isAdmin && (
                        <td>
                          <Link to={`/probation-officer/${probOfficer.prob_id}`}>
                            <Button variant='light' className='btn-sm'>
                              <FaEdit />
                            </Button>
                          </Link>
                          <DeleteModal id={probOfficer.prob_id} entity={"probation-officer"} onDeleteSuccess={handleDeleteSuccess} onDeleteError={handleDeleteError} />
                        </td>
                      )
                    }
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )
      }

    </>
  );
}

export default ProbationOfficerSearchPage