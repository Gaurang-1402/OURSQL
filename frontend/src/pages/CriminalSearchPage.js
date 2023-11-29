import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/DeleteModal';

const CriminalSearchPage = () => {
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

  const [criminals, setCriminals] = useState([]); // [{}]

  const [selectedVStatus, setVSelectedStatus] = useState({});
  const [vStatusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'Y (Yes)', value: 'Y' },
    { id: 2, label: 'N (No)', value: 'N' }
  ]);

  const [selectedPStatus, setPSelectedStatus] = useState({});
  const [pStatusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'Y (Yes)', value: 'Y' },
    { id: 2, label: 'N (No)', value: 'N' }
  ]);

  const handleDeleteSuccess = (deletedId) => {
    setCriminals(criminals.filter(criminal => criminal.criminal_id !== deletedId));
    toast.success('Criminal deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(BASE_URL + '/api/search/criminal', {
        firstName: firstName,
        lastName: lastName,
        selectedFirstNameFilter: selectedFirstNameFilter.value,
        selectedLastNameFilter: selectedLastNameFilter.value,
        zip: zip,
        phone: phone,
        selectedVStatus: selectedVStatus.value,
        selectedPStatus: selectedPStatus.value
      }, {
        withCredentials: true
      });
      toast.success('Criminal search successful');
      setCriminals(response.data.data.results);

    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <h1>Criminal Search</h1>
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
                    <Form.Control className='m-2' type="text" onChange={(text) => setFirstName} placeholder="Enter first name" />
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
                    <Form.Control className='m-2 input-box' type="text" onChange={(text) => setLastName(text)} placeholder="Enter last name" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">ZIP Code</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(text) => setZip(text)} type="text" placeholder="Search for 5 char ZIP Code" />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="m-3">Phone</Form.Label>
                <Form.Control className='m-2 input-box' onChange={(text) => setPhone(text)} type="text" placeholder="Search for phone no" />

              </Form.Group>

              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Violent Offender Status</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedVStatus.label || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {vStatusOptions.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => setVSelectedStatus(option)}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-5">
                <Dropdown>
                  <Form.Label className="m-3">Parole Status</Form.Label>

                  <Dropdown.Toggle variant="success" id="dropdown-basic">

                    {selectedPStatus.label || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {pStatusOptions.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => setPSelectedStatus(option)}>
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
                    <Button variant="secondary">Add new Criminal</Button>
                  </Link>
                )
              }
            </Form>
          </Col>
          <Col md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
            {/* Placeholder for image */}
            <img src="path_to_your_image.jpg" alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
      {
        criminals.length > 0 && (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Criminal ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Zip</th>
                <th>Phone</th>
                <th>Violent Offender Status</th>
                <th>Parole Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                criminals.map((criminal) => (
                  <tr key={criminal.prob_id}>
                    <td>{criminal.prob_id}</td>
                    <td>{criminal.last}</td>
                    <td>{criminal.first}</td>
                    <td>{criminal.zip}</td>
                    <td>{criminal.phone}</td>
                    <td>{criminal.v_status}</td>
                    <td>{criminal.p_status}</td>
                    {
                      userInfo && userInfo.isAdmin && (
                        <td>
                          <Link to={`/criminal/${criminal.criminal_id}`}>
                            <Button variant='light' className='btn-sm'>
                              <FaEdit />
                            </Button>
                          </Link>
                          <DeleteModal id={criminal.prob_id} entity={"criminal"} onDeleteSuccess={handleDeleteSuccess} onDeleteError={handleDeleteError} />
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

export default CriminalSearchPage