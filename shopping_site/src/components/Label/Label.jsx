import React from 'react';
import classes from './Label.module.css'

const Label = ({ items }) => {
    return (
        <span className={classes.Label}>
            {items}
        </span>
    );
};

export default Label;