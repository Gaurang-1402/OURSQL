import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import sOfficerImage from '../images/s-officer.jpeg';


const OfficerSearchPage = () => {
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

  const [precinct, setPrecinct] = useState('');
  const [badge, setBadge] = useState('');

  const [phone, setPhone] = useState('');

  const [officers, setOfficers] = useState([]); // [{}]

  const [selectedStatus, setSelectedStatus] = useState({});
  const [statusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'I (Inactive)', value: 'I' },
    { id: 2, label: 'A (Active)', value: 'A' }
  ]);

  const handleDeleteSuccess = (deletedId) => {
    setOfficers(officers.filter(officer => officer.officer_id !== deletedId));
    toast.success('Officer deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(BASE_URL + '/api/search/officer', {
        firstName: firstName,
        lastName: lastName,
        selectedFirstNameFilter: selectedFirstNameFilter.value,
        selectedLastNameFilter: selectedLastNameFilter.value,
        precinct: precinct,
        badge: badge,
        phone: phone,
        selectedStatus: selectedStatus.value
      }, {
        withCredentials: true
      });
      toast.success('Officer search successful');
      setOfficers(response.data.data.results);

    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };
  return (
    <>
      <h1>Officer Search</h1>
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
                    <Form.Control className='m-2 input-box' type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">Precinct</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(e) => setPrecinct(e.target.value)} type="text" placeholder="Search for 4 char precinct" />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">Badge</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(e) => setBadge(e.target.value)} type="text" placeholder="Search for badge no" />

              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">Phone</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Search for phone no" />

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
                  <Link variant="secondary" to="/login?redirect=/officer">
                    <Button variant="secondary">Add new Officer</Button>
                  </Link>
                )
              }
            </Form>
          </Col>
          <Col md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
            {/* Placeholder for image */}
            <img src={sOfficerImage} alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
      {
        officers.length > 0 && (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Officer ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Precinct</th>
                <th>Badge Number</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                officers.map((officer) => (
                  <tr key={officer.officer_id}>
                    <td>{officer.officer_id}</td>
                    <td>{officer.last}</td>
                    <td>{officer.first}</td>
                    <td>{officer.precinct}</td>
                    <td>{officer.badge}</td>
                    <td>{officer.phone}</td>
                    <td>{officer.status}</td>
                    {
                      userInfo && userInfo.isAdmin && (
                        <td>
                          <Link to={`/officer/${officer.officer_id}`}>
                            <Button variant='light' className='btn-sm'>
                              <FaEdit />
                            </Button>
                          </Link>
                          <DeleteModal id={officer.officer_id} entity={"officer"} onDeleteSuccess={handleDeleteSuccess} onDeleteError={handleDeleteError} />
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

export default OfficerSearchPage

