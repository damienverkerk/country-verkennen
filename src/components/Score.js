import React from 'react';
import '../styles/score.css';

function Score({country, score}){
    return(
        <div className='score-container'>
            <h4>{country}</h4>
            <p>Score: {score}</p>
        </div>
    )
}
export default Score;
