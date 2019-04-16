import React from 'react';

const SleepEntry = props => {
    return (
        <div>
            <h4>Date{/*taking in props for date*/}</h4>
            <p>Time slept:{/*taking in props for bed time*/}</p>
            <p>Mood at bed time:</p><span>{/*taking in props for tired rating at bedtime*/}</span>
            <p>Mood when waking:</p><span>{/*taking in props for waking mood*/}</span>
            <p>Mood throughout day:</p><span>{/*taking in props for average day mood*/}</span>
        </div>
    )
}

export default SleepEntry;