import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <h1>Browse events</h1>
            <Link to="/newevent">New Event</Link>
        </div>
    );
};

Home.propTypes = {
    name: PropTypes.string,
};


export default Home;
