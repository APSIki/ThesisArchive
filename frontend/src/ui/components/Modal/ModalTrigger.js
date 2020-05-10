import React from 'react';
import { createUseStyles } from 'react-jss';

const ModalTrigger = ({ triggerText, buttonRef, showModal }) => {
  const classes = useStyles();
  return (
    <button
        className={classes.buttonTrigger}
        ref={buttonRef}
        onClick={showModal}>
        {triggerText}
    </button>
  );
};

const useStyles = createUseStyles({
    buttonTrigger: {
        padding: {
            top: 6,
            right: 6,
            bottom: 6,
            left: 6
        },
        'text-decoration': 'none',
        'font-size': 20,
        color: '#000',
        display: 'block',
        '&:hover': {
            color: '#7927DC', 
            cursor: 'pointer'
        },
        background: 'none !important',
        border: 'none',
    }
});

export default ModalTrigger;
