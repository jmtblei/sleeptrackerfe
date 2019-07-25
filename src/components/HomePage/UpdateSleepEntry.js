import React from 'react';
import UpdateForm from './UpdateForm';

const UpdateSleepEntry = props => {
    return (
        <div>
            <div className="update-entry">
                <h4>Date: {props.sleepstat.date}</h4>
                <p>Time slept:{props.sleepstat.timeSlept} hours</p>
                <p>Mood at bed time:</p>{props.sleepstat.sleepMood}
                <p>Mood when waking:</p>{props.sleepstat.wakeMood}
            </div>
            <div>
                <UpdateForm updateEntry={props.updateEntry} sleepstat={props.sleepstat} {...props}/>
            </div>
        </div>
    )
}

export default UpdateSleepEntry;