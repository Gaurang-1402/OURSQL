import React, { useState } from 'react';
import { Table, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../constants';

const AppealSearchPage = () => {
  const [statusOptions, setStatusOptions] = useState([
    { id: 0, label: 'Select Option' },
    { id: 1, label: 'P (Pending)' },
    { id: 2, label: 'A (Approved)' },
    { id: 3, label: 'D (Disapproved)' }
  ]);

  const [startHearingDate, setHearingStartDate] = useState('');
  const [startFilingDate, setFilingStartDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    try {

      const response = await axios.get(BASE_URL+'/api/search/appeal', {
        body: {
          startHearingDate: startHearingDate,
          startFilingDate: startFilingDate,
          selectedStatus: selectedStatus
        },
        withCredentials: true 
      });
      console.log(response);

    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };
  return (
    <>
      <h1>Appeal Search</h1>
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

                    {selectedStatus || "Select Option"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {statusOptions.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => setSelectedStatus(option.label)}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Button disabled={!selectedStatus || !startHearingDate || !startFilingDate} type="submit" className="m-5" variant="primary">Filter</Button>
              <Link variant="secondary" to="/login?redirect=/appeal">
                <Button variant="secondary">Add new Appeal</Button>
              </Link>
            </Form>
          </Col>
          <Col md={3} style={{ border: '1px solid #ddd', padding: '20px' }}>
            {/* Placeholder for image */}
            <img src="path_to_your_image.jpg" alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>

      <Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>CRIME_ID</th>
            <th>STATUS</th>
            <th>FILING DATE</th>
            <th>HEARING DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>P</td>
            <td>2020-01-01</td>
            <td>2020-01-01</td>
            <td>
            <Link className='m-2' to={`/appeal/3/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaEdit />
                </Button>
              </Link>
              <Link to={`/appeal/3/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaTrash />
                </Button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>A</td>
            <td>2020-01-01</td>
            <td>2020-01-01</td>
            <td>
            <Link className='m-2' to={`/appeal/3/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaEdit />
                </Button>
              </Link>
              <Link to={`/appeal/3/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaTrash />
                </Button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>D</td>
            <td>2020-01-01</td>
            <td>2020-01-01</td>
            <td>
              <Link className='m-2' to={`/appeal/3/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaEdit />
                </Button>
              </Link>
              <Link to={`/appeal/3/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaTrash />
                </Button>
              </Link>
            </td>
          </tr>

        </tbody>
      </Table>

    </>
  );
}

export default AppealSearchPage

