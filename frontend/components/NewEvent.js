import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const NewEvent = () => {
    return (
        <div>
            <h1>Create a new event!</h1>
            <Link to="/">Home</Link>
        </div>
    );
};

NewEvent.propTypes = {
    name: PropTypes.string,
};


export default NewEvent;
