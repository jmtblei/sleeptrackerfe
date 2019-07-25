import React from 'react';

const SleepEntry = props => {
    return (
            <div>
                <h4>Date: {props.sleepstat.date}</h4>
                <h5>Time slept:</h5>{props.sleepstat.timeSlept} hours
                <h5>Mood at bed time:</h5>{props.sleepstat.sleepMood}
                <h5>Mood when waking:</h5>{props.sleepstat.wakeMood}
            </div>
    )
}

export default SleepEntry;