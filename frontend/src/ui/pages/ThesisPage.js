import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Paper, TextField, IconButton, Button, Snackbar } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import WS from '../../tools/WS';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert'

const ThesisPage = props => {
  const classes = useStyles();
  const history = useHistory();

  const [abstract, setAbstract] = useState("")
  const [keywords, setKeywords] = useState("")
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  const handleAbstractChange = event => {
    setAbstract(event.target.value);
  }

  const handleKeywordsChange = event => {
    setKeywords(event.target.value)
  }

  useEffect(() => {
    WS.getThesis(props.match.params.thesisId)
      .then(response => {
        props.setCurrentThesis(response.data)
      })
  }, []);

  const navigateBack = () => {
    history.push("/")
  }

  const handleSave = () => {
    WS.postThesis(props.currentThesis.id, props.currentThesis)
      .then(response => {
        setSuccessSnackbarOpen(true)
      })
      .catch(err => {
        setErrorSnackbarOpen(true)
      })
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <IconButton onClick={navigateBack}>
          <ArrowBack />
        </IconButton>
        <p className={classes.header}>{props.currentThesis.type}</p>
        <p className={classes.thesisName}>{props.currentThesis.name}</p>
        <p className={classes.header}>Streszczenie</p>
        <div className={classes.textFieldContainer}>
          <TextField multiline fullWidth value={abstract} onChange={handleAbstractChange} />
        </div>
        <p className={classes.header}>Słowa kluczowe</p>
        <div className={classes.textFieldContainer}>
          <TextField fullWidth value={keywords} onChange={handleKeywordsChange} />
        </div>
        <div className={classes.button}>
          <Button variant="contained" color="#CCC" onClick={handleSave}>
            ZAPISZ DANE PRACY
          </Button>
        </div>
      </Paper>
      <Snackbar open={successSnackbarOpen} autoHideDuration={6000}>
        <MuiAlert severity="success" onClose={() => setSuccessSnackbarOpen(false)}>Success!</MuiAlert>
      </Snackbar>
      <Snackbar open={errorSnackbarOpen} autoHideDuration={6000}>
        <MuiAlert severity="error" onClose={() => setErrorSnackbarOpen(false)}>Error!</MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}

const useStyles = createUseStyles({
  header: {
    fontSize: 24,
    padding: 5,
    fontWeight: "bold"
  },
  paper: {
    margin: 10,
    height: "80%"
  },
  thesisName: {
    padding: 10,
    fontSize: 18
  },
  textFieldContainer: {
    padding: 10,
    width: "40%",
    minWidth: 100
  },
  button: {
    margin: 10
  }
});

export default ThesisPage