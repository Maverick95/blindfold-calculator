import React from 'react';

import * as Data from './LanguageSelector_Data.js';

const
STATE_SELECT = 'state_select',
STATE_RANDOM = 'state_random',
STATE_FINAL = 'state_final';

const SETTINGS =
{
    [STATE_SELECT]: {show: false},
    [STATE_RANDOM]: {show: true, class: 'chosen'},
    [STATE_FINAL]: {show: true, class: 'final'}
};

export default class LanguageSelector extends React.Component {

    constructor(props) {

        super(props);
        this.languages = Data.TestLanguages.map(v => ({ language: v, shortlist: false }));
        this.delay = {
            current: Data.TestDelay.current,
            max: Data.TestDelay.max,
            factor: Data.TestDelay.factor
        };
        this.state = { state: STATE_SELECT };
        this.onchoose = this.onchoose.bind(this);

    }

    onclick(index) {
        
        return () => { this.languages[index].shortlist = !this.languages[index].shortlist; };
    
    }

    nextChosen() {

        var next_timer = true;

        if (typeof this.state.chosen !== 'undefined') {

            this.delay.current *= this.delay.factor;

            var new_state = { chosen: this.state.chosen + 1 };
            
            if (new_state.chosen === this.languages.length) {
                new_state.chosen = 0;
            }

            if (this.delay.current >= this.delay.max) {

                new_state.state = STATE_FINAL;
                next_timer = false;

            }

            this.setState(new_state);

        }

        else {

            this.setState({ state: STATE_RANDOM, chosen: Math.floor(Math.random() * this.languages.length) });
        
        }

        if (next_timer) {

            setTimeout(() => this.nextChosen(), this.delay.current);

        }

    }

    onchoose() {
        
        if (this.languages.filter(m => m.shortlist).length) {
            
            this.languages = this.languages.filter(m => m.shortlist);
            this.nextChosen();
        
        }
    }

    render() {

        return (

            <div>
            <table data-testid={Data.TestTableSelector}>
                <tbody>
                    {
                    this.languages.map((v, i) => <Language key={i} index={i} language={v} state={this.state.state}
                    chosen={this.state.chosen} select={this.onclick(i)} />)
                    }
                </tbody>
                </table>

                {
                    this.state.state === STATE_SELECT &&
                    <input type="button" value={Data.TestButtonText} onClick={this.onchoose} />
                    
                }

                {
                    this.state.state === STATE_FINAL &&
                    <FinalMessage chosen={this.languages[this.state.chosen].language} />
                }

            </div>

        );
    }
};

function Language(props) {

    // props : language, state, chosen, select

    if (props.state === STATE_SELECT || props.language.shortlist) {
        
        const LanguageClass = (index, chosen, state) =>
        ( index === chosen && SETTINGS[state].show && SETTINGS[state].class ).toString();

        return (
        <tr>
            <td className={LanguageClass(props.index, props.chosen, props.state)}>
                <label htmlFor={Data.TestLanguageLabel(props.language.language)}>{props.language.language}</label></td>
            {
                props.state === STATE_SELECT &&
                <td><input id={Data.TestLanguageLabel(props.language.language)} type="checkbox" value="false" onClick={props.select} /></td>
            }
        </tr>
        );

    }

    return null;

}

function FinalMessage(props) {

    return <p className="final">Have fun with {props.chosen}!</p>;

}
