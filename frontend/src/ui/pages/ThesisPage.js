import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Paper, TextField, IconButton, Button, Snackbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import WS from '../../tools/WS';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert'
import { getSteps } from '../../tools/stepperHelpers'

const ThesisPage = props => {
  const classes = useStyles();
  const history = useHistory();
  const inputFile = useRef(null);

  const [abstract, setAbstract] = useState("")
  const [keywords, setKeywords] = useState("")
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
        Powrót
      </Button>
      <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button} 
                disabled={activeStep === steps.length - 1}>
                Dalej
      </Button>
      <Paper className={classes.paper}>
        <IconButton onClick={navigateBack}>
          <ArrowBack />
        </IconButton>
        {activeStep === 0 && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {activeStep === 1 && (
          <React.Fragment>
            {props.currentThesis.defense.defended && (
              <p className={classes.header}>Praca została obroniona. Nie można zmieniać treści pracy.</p>
            )}
            <div className={classes.button}>
              <Button variant="contained" color="#CCC" disabled={props.currentThesis.defense.defended} onClick={() => inputFile.current.click()}>
                Dodaj plik z pracą
              </Button>
            </div>
            <input type="file" id="file" ref={inputFile} style={{display: "none"}}/>
          </React.Fragment>
        )}
        {activeStep === 2 && (
          <React.Fragment>
            {!!props.currentThesis.reviews.reviewer1 ? (
            <React.Fragment>
              <p className={classes.header}>Recenzja 1 jest dostępna:</p>
              <p className={classes.subHeader}>Recenzent: {props.currentThesis.reviews.reviewer1.reviewerName}</p>
              <p className={classes.subHeader}>Ocena: {props.currentThesis.reviews.reviewer1.grade}</p>
              <p className={classes.subHeader}>Tekst recenzji:</p>
              <p className={classes.reviewText}>{props.currentThesis.reviews.reviewer1.text}</p>
            </React.Fragment>
            ) : (
              <p className={classes.header}>Recenzja 1 nie jest jeszcze dostępna.</p>
            )}
            {!!props.currentThesis.reviews.reviewer2 ? (
              <React.Fragment>
                <p className={classes.header}>Recenzja 2 jest dostępna:</p>
                <p className={classes.subHeader}>Recenzent: {props.currentThesis.reviews.reviewer2.reviewerName}</p>
                <p className={classes.subHeader}>Ocena: {props.currentThesis.reviews.reviewer2.grade}</p>
                <p className={classes.subHeader}>Tekst recenzji:</p>
                <p className={classes.reviewText}>{props.currentThesis.reviews.reviewer2.text}</p>
            </React.Fragment>
            ) : (
              <p className={classes.header}>Recenzja 2 nie jest jeszcze dostępna.</p>
            )}
          </React.Fragment>
        )}
        {activeStep === 3 && (
          <React.Fragment>
            <p className={classes.header}>Czy praca obroniona:</p>
            <p className={classes.subHeader}>{props.currentThesis.defense.defended ? "TAK" : "NIE" }</p>
            <p className={classes.subHeader}>Data obrony: {props.currentThesis.defense.date}</p>
            <p className={classes.header}>Skład komisji:</p>
            <p className={classes.reviewText}>Przewodniczący: {props.currentThesis.defense.commitee.chairman}</p>
            <p className={classes.reviewText}>Opiekun: {props.currentThesis.defense.commitee.advisor}</p>
            <p className={classes.reviewText}>Członek: {props.currentThesis.defense.commitee.member1}</p>
            <p className={classes.reviewText}>Członek: {props.currentThesis.defense.commitee.member2}</p>
            <p className={classes.subHeader}>Ocena: {props.currentThesis.defense.grade || "Brak oceny (praca nie obroniona)"}</p>
          </React.Fragment>
        )}
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
  subHeader: {
    fontSize: 16,
    padding: 5,
    fontWeight: "bold"
  },
  paper: {
    margin: 10,
    height: "80%",
    overflowX: "scroll",
    overflowX: "hidden"
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
    margin: 20
  },
  reviewText: {
    padding: 5,
    maxWidth: 500
  }
});

export default ThesisPage