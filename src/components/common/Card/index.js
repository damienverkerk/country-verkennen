import React from 'react';
import '../../../styles/card.css';

function Card({ title, children, onClick }) {
    return (
        <article className="card" onClick={onClick}>
            <h3>{title}</h3>
            {children}
        </article>
    );
}

export default Card;
