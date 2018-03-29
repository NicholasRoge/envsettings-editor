import HandlerData from "../data/Handler.json";


import React from 'react';

//import {DetailedSettingRenderer};


const HandlerInfoPanel = ({handler}) => {
    return (
        <div className="detail-panel handler-info-panel">
            <h1>
                {HandlerData[handler].name}
            </h1>

            {HandlerData[handler].description}
        </div>
    );
};


export default HandlerInfoPanel;
