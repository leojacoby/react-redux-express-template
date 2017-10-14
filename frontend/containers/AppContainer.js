import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home';
import NewEvent from '../components/NewEvent';

const AppContainer = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/newevent" component={NewEvent} />
            </div>
        </Router>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
