import React, { Component } from 'react';

import Aux from '../_Aux/_Aux';
import './Pagination.css';

const withPagination = ( WrappedComponent ) => {

    return class extends Component {

        constructor(props) {
            super(props);
            
            this.state = {
                currentPage: 1,
                dataPerPage: 5
            }
            this.handlePaginate = this.handlePaginate.bind(this);
        }

        handlePaginate(pageNumber) {
            this.setState( { currentPage: pageNumber } );
        }

        componentDidMount(){
            console.log('Mounted');
        }

        componentDidUpdate(prevProps) {
            if (this.props.searchString !== prevProps.searchString) {
                this.setState( { currentPage: 1 } );
            }
        }

        render () {
            const pageNumbers = [];

            // Get current posts
            const indexOfLastData = this.state.currentPage * this.state.dataPerPage;
            const indexOfFirstData = indexOfLastData - this.state.dataPerPage;
            const currentPosts = this.props.data.slice(indexOfFirstData, indexOfLastData);

            for (let i = 1; i <= Math.ceil(this.props.data.length / this.state.dataPerPage); i++) {
                pageNumbers.push(i);
            }
            //--------

            return (
                <Aux>
                    <WrappedComponent {...this.props} data={currentPosts} />

                    <div className="Pagination">
                        {pageNumbers.map((number,index) => {

                                let className = null;
                                if(this.state.currentPage == index+1) {
                                    className = "Selected";
                                }
                            
                                return <div key={number} onClick={()=>this.handlePaginate(number)} className={className}>
                                    {number}
                                </div>
                            })
                        }
                    </div>
                </Aux>
            );
        }
    }
}

export default withPagination;