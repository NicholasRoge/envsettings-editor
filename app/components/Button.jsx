import React from 'react';


export default function Button({className, clickHandler, children}) {
    return (
        <button 
            type="button" 
            className={`input-button ${className}`}
            onClick={e => clickHandler}>
            
            {children}
        </button>
    );
}