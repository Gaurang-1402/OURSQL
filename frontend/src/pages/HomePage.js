import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import sHomeImage from '../images/homepage.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-image-container">
        <img src={sHomeImage} alt="Welcome to our service" className="home-image" />
      </div>
      <div className="button-container">
        <Link to='/login?redirect=/crime/search' className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Crimes
          </Button>
        </Link>
        <Link to="/login?redirect=/criminal/search" className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Criminals
          </Button>
        </Link>
        <Link to="/login?redirect=/appeal/search" className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Appeals
          </Button>
        </Link>
        <Link to="/login?redirect=/crime-charge/search" className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Crime Charges
          </Button>
        </Link>
        <Link to="/login?redirect=/sentence/search" className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Sentences
          </Button>
        </Link>
        <Link to="/login?redirect=/officer/search" className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Officers
          </Button>
        </Link>
        <Link to="/login?redirect=/probation-officer/search" className="button-link">
          <Button variant="outline-secondary" className="home-button">
            Search Probation Officers
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
