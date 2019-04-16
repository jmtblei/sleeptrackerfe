import React from 'react';
import SleepEntry from './SleepEntry';
import { Link } from 'react-router-dom';

const SleepEntryList = (props) => {
    const displayEntries = props.sleepstats.map(sleepstat => {
        return (
            <div>
                <Link to={`/sleep/${sleepstat.id}`} key={sleepstat.id} >
                    <SleepEntry sleepstat={sleepstat}/>
                </Link>
                <button></button>
            </div>
        )
    })
}

export default SleepEntryList;