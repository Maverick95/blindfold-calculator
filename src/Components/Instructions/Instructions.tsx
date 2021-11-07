import React from 'react';
import './Instructions.css';

const InstructionsComponent = () => (

    <section aria-labelledBy="instructions" className="main-instructions">
        <h2 aria-label="Calculator Instructions" id="instructions" className="section-header">Instructions</h2>
        <div className="main-instructions-content">
            <p>Press the Calculator buttons and view your Result.</p>
            <p>There are 4 key sections.</p>
            <p><b>Enter Number</b> contains Numbers 0 to 9.</p>
            <p><b>Enter Operator</b> contains Plus and Multiply.</p>
            <p><b>Enter Bracket</b> contains Open and Close brackets.</p>
            <p><b>Results</b> will read your Result in words, give you the Result, and reset the Calculator.</p>
            <p>Buttons will disable when they cannot be pressed.</p>
            <p>Good luck!</p>
        </div>
    </section>

);

export default InstructionsComponent;