import React from 'react';
import './Instructions.css';
import { SectionContentType, createSectionAriaLabel } from '../../Helpers/Helpers';

const InstructionsComponent = () => {

    const label = createSectionAriaLabel("Calculator Instructions", SectionContentType.PARAGRAPHS);

    return (
        <section aria-labelledby="instructions" className="main-instructions">
            <h2 aria-label={label} id="instructions" className="section-header">Instructions</h2>
            <div className="main-instructions-content">
                <p>Press the Calculator buttons and view your Result.</p>
                <p><b>Enter Number</b> section contains Numbers 0 to 9.</p>
                <p><b>Enter Operator</b> section contains Plus and Multiply.</p>
                <p><b>Enter Bracket</b> section contains Open and Close brackets.</p>
                <p>You can view your result in several ways.</p>
                <p><b>Read Your Input With Maths Symbols</b> section contains your input in mathematical notation.</p>
                <p><b>Read Your Input In English</b> section contains your input in words you can understand.</p>
                <p><b>Result</b> section contains the computed result.</p>
                <p><b>Reset</b> section allows you to erase your input and start again.</p>
            </div>
        </section>
    );

};

export default InstructionsComponent;