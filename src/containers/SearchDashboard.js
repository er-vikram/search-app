import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search/Search';
import ResultSummary from '../containers/Summary/ResultSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../axios-admin';
import './SearchDashboard.css';

class SearchDashboard extends Component {

    handleLogout = () => {
        this.props.history.push('/logout');
    }

    render () {

        let spinner = null;
        let resultSummary = null;

        if (this.props.loading) {
            spinner = <Spinner />
        }
        if ( this.props.data ) {
            resultSummary = <ResultSummary
                data={this.props.data} searchString={this.props.searchString} />;
        }

        let logout = this.props.isAuthenticated ?
            <span className="Logout" onClick={() => this.handleLogout()}>Logout</span> : null

        return (
            <div>
                {logout}
                <Search />
                {resultSummary}
                {spinner}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data,
        searchString: state.search.searchString,
        error: state.search.error,
        loading: state.search.loading,
        isAuthenticated: state.auth.token !== null,
    };
}

export default connect(mapStateToProps)(withErrorHandler( SearchDashboard, axios ));