import React from 'react';
import { Link } from "react-router-dom";
import { createUseStyles } from 'react-jss';

const TopBarLinkItem = props => { 
  const classes = useStyles();

  return (
    <Link className={classes.linkItem} to={props.href}>{props.title}</Link>
  );
}

const useStyles = createUseStyles({
  linkItem: {
    color: "#EEE",
    textDecoration: "none",
    padding: "8px 5px 0 5px",
    borderRight: "1px dotted #fff",
    "&:hover": {
      "text-decoration": "none",
      color: "#000"
    }
  }
});

export default TopBarLinkItem