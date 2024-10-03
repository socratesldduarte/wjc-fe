import React from 'react';
import './Jug.css';

const Jug = ({ level }) => {
    const contentHeight = `${level}%`;

    return (
        <div className="jug-container">
            <div className="jug">
                <div className="content" style={{ height: contentHeight }}></div>
            </div>
        </div>
    );
};

export default Jug;
