import React, {Component} from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import './Search.css';

class Search extends Component {

    state = {
        controls: {
            search: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter User Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.fetchSearchResult( this.state.controls.search.value );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <div className="Search">
                <h2>{this.props.heading}</h2>
                <form onSubmit={this.submitHandler}>
                    {form}
                    
                    <Button 
                        btnType="btnSearch"
                        disabled={!this.state.controls.search.value.trim()}
                    >
                        Search
                    </Button>
                </form>
            </div>
        );
    }
}

Search.defaultProps = {
    heading: "Search User"
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSearchResult: ( searchString ) => dispatch( actions.fetchSearchResult( searchString ) )
    };
};

export default connect( null, mapDispatchToProps )( Search );