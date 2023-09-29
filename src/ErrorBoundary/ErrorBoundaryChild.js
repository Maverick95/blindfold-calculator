import React from 'react';

export const ErrorBoundaryChild = class extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

    return (
        <p>Error here - {this.props.property1.subproperty1}</p>
    );

    }

};