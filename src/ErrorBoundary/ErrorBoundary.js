import React from 'react';
import {ErrorBoundaryChild} from './ErrorBoundaryChild.js';

export const ErrorBoundary = class extends React.Component {

    constructor(props) {

        super(props);

        this.state = { error: false };

    }

    static getDerivedStateFromError(error) {

        return ({ error:true });

    }

    componentDidCatch(error, errorInfo) {
        
        console.log(`An error occurred - ${error}`);

    }

    render() {

        if (this.state.error) {

            return (
                <>
                <p>Uh-oh! Something went wrong!</p>
                </>
            );

        }

        return this.props.children;

    }

};