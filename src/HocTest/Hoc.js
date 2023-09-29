import React from 'react';
import {HocComponent1, HocComponent2} from './HocComponent.js';

const HocCreate = function(WrappedComponent) {

    return class extends React.Component {

        constructor(props) {

            super(props);
            this.state = { count: 0, times: [] };
            this.wcOnClick = this.wcOnClick.bind(this);

        }

        wcOnClick() {

            this.state.times.push(new Date().toTimeString());
            this.setState((state) => ({count: state.count + 1}));

        }

        render() {

            return (
                <>
                <WrappedComponent onClick={this.wcOnClick} />
                {this.state.times.map((t, i) => 
                    <p key={i}>Button clicked : {t}</p>)}
                </>
            );

        }

    }
}

const Hoc1 = HocCreate(HocComponent1);
const Hoc2 = HocCreate(HocComponent2);

export {Hoc1, Hoc2};