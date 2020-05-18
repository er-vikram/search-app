import React, { Component } from 'react';

import Aux from '../_Aux/_Aux';
import './Layout.css';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;