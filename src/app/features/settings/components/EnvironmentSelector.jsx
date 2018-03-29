import React from 'react';

import {Button, Select} from '$app/components';


export default function EnvironmentSelector({value, changeHandler, environmentList}) {
    let options = environmentList.map(value => ({value: value, label: value}));

    return (   
        <div className="environment-selector">
            <Select
                value={value} 
                changeHandler={changeHandler} 
                options={options}
                className="input-select" />

            <Button className="add-button">
                +
            </Button>
        </div>
    );
}