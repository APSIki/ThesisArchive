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
        color: '#ffffff',
        display: 'block',
        '&:hover': {
            color: '#000000', 
            cursor: 'pointer'
        },
        background: 'none !important',
        border: 'none',
        right: "0%",
        "border-left": "1px dotted #fff"
    }
});

export default ModalTrigger;
