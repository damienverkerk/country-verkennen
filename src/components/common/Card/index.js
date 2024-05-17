import React from 'react';
import '../../../styles/card.css';

function Card({ title, children, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <h3>{title}</h3>
            {children}
        </div>
    );
}

export default Card;
