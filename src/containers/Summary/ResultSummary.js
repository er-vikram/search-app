import React from 'react';
import withPagination from '../../hoc/withPagination/withPagination';
import './ResultSummary.css';

const resultSummary = ( props ) => {

    //Can make this reusable

    let rows = [];
    rows = props.data.map( obj => {

        let className = "";
        if(obj.attributes[0].name == "user.ParentalRatingId" && obj.attributes[0].value < 50) {
            className = "Danger"
        }

        return (
            <tr key={obj.id} className={className}>
                <td data-label="Username">{obj.username}</td>
                <td data-label="Name">{obj.displayName}</td>
                <td data-label="Status">{obj.status}</td>
            </tr> );
    } );

    if(props.data.length == 0) {
        rows.push (
            <tr key="0">
                <td colSpan={3}>No data found.</td>
            </tr> );
    }

    const resultSummary = props.searchString && 
        <div className="Summary">
            <h3>Search result for: </h3> <span>{props.searchString}</span>
            <table className="Table">
                <caption>Users</caption>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>

    return (
        null || resultSummary
    );
};

export default withPagination( resultSummary );