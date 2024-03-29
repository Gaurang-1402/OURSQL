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
import appealImage from '../images/appeal.jpeg';


const AppealSearchPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [statusOptions,] = useState([
    { id: 0, label: 'Select Option', value: '' },
    { id: 1, label: 'P (Pending)', value: 'P' },
    { id: 2, label: 'A (Approved)', value: 'A' },
    { id: 3, label: 'D (Disapproved)', value: 'D' },
  ]);

  const [startHearingDate, setHearingStartDate] = useState(null);
  const [startFilingDate, setFilingStartDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  const [appeals, setAppeals] = useState([]); // [{}]

  const handleDeleteSuccess = (deletedId) => {
    setAppeals(appeals.filter(appeal => appeal.appeal_id !== deletedId));
    toast.success('Appeal deleted');
  };

  const handleDeleteError = (error) => {
    toast.error('Delete error:', error);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(BASE_URL + '/api/search/appeal', {
        startHearingDate: startHearingDate,
        startFilingDate: startFilingDate,
        selectedStatus: selectedStatus.value
      }, {
        withCredentials: true
      });
      toast.success('Appeal search successful');
      setAppeals(response.data.data.results);

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
              <Button  type="submit" className="m-5" variant="primary">Search</Button>              {
                userInfo && userInfo.isAdmin && (
                  <Link variant="secondary" to="/login?redirect=/appeal">
                    <Button variant="secondary">Add new Appeal</Button>
                  </Link>
                )
              }
            </Form>
          </Col>
          <Col className='icon-image-parent' md={3} style={{ padding: '20px' }}>
            {/* Placeholder for image */}
            <img className='icon-image' src={appealImage} alt="Description" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>

      {
        appeals.length > 0 && (

          <Table striped hover responsive className='table-sm'>

            <thead>
              <tr>
                <th>Appeal ID</th>
                <th>Crime ID</th>
                <th>Status</th>
                <th>Filing Date</th>
                <th>Hearing Date</th>
                {
                  userInfo && userInfo.isAdmin && (
                    <th>Actions</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                appeals.map((appeal) => (
                  <tr key={appeal.appeal_id}>
                    <td>{appeal.appeal_id}</td>
                    <td>{appeal.crime_id}</td>
                    <td>{appeal.status}</td>
                    <td>{appeal.filing_date}</td>
                    <td>{appeal.hearing_date}</td>

                    {
                      userInfo && userInfo.isAdmin && (
                        <td>
                          <Link to={`/appeal/${appeal.appeal_id}`}>
                            <Button variant='light' className='btn-sm'>
                              <FaEdit />
                            </Button>
                          </Link>
                          <DeleteModal id={appeal.appeal_id} entity={"appeal"} onDeleteSuccess={handleDeleteSuccess}
                            onDeleteError={handleDeleteError}
                          />
                        </td>
                      )
                    }

                  </tr>
                ))
              }
            </tbody>
          </Table>)
      }
    </>
  );
}

export default AppealSearchPage
