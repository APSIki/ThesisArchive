import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Paper, TextField, IconButton, Button, Snackbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import WS from '../../tools/WS';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert'
import { getSteps } from '../../tools/stepperHelpers'
import * as roles from '../../tools/roleUtils'
import Autocomplete from '../components/Autocomplete'
import moment from 'moment'
import { DateTimePicker } from '@material-ui/pickers'

const ThesisPage = props => {
  const classes = useStyles();
  const history = useHistory();
  const inputFile = useRef(null);

  const [abstract, setAbstract] = useState("")
  const [keywords, setKeywords] = useState("")

  const [review1, setReview1] = useState("")
  const [review2, setReview2] = useState("")

  const [grade1, setGrade1] = useState("")
  const [grade2, setGrade2] = useState("")

  const [defenseGrade, setDefenseGrade] = useState("")
  const [defended, setDefended] = useState(false)

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  const [isCommitteEdited, setIsCommiteeEdited] = useState(false)

  const [chairmanId, setChairmanId] = useState(0)
  const [advisorId, setAdvisorId] = useState(0)
  const [member1Id, setMember1Id] = useState(0)
  const [member2Id, setMember2Id] = useState(0)
  const [chairmanName, setChairmanName] = useState("")
  const [advisorName, setAdvisorName] = useState("")
  const [member1Name, setMember1Name] = useState("")
  const [member2Name, setMember2Name] = useState("")
  const [subjectMatter, setSubjectMatter] = useState(null)
  const [organizationalUnit, setOrganizationalUnit] = useState(null)
  const [filePath, setFilePath] = useState(null);

  const [defenseDate, setDefenseDate] = useState(null)

  const [activeStep, setActiveStep] = React.useState(0);
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

        setAbstract(response.data.abstract)
        setKeywords(response.data.keywords)
        setReview1(response.data.reviewer1.text)
        setGrade1(response.data.reviewer1.grade)
        setReview2(response.data.reviewer2.text)
        setGrade2(response.data.reviewer2.grade)
        setDefenseGrade(response.data.defense.grade)
        setChairmanId(response.data.defense.commitee.chairman.id)
        setAdvisorId(response.data.defense.commitee.advisor.id)
        setMember1Id(response.data.defense.commitee.member1.id)
        setMember2Id(response.data.defense.commitee.member2.id)
        setChairmanName(response.data.defense.commitee.chairman.name)
        setAdvisorName(response.data.defense.commitee.advisor.name)
        setMember1Name(response.data.defense.commitee.member1.name)
        setMember2Name(response.data.defense.commitee.member2.name)
        setSubjectMatter(props.config.subjectMatters.filter(subjectMatter => subjectMatter.id === response.data.subjectMatter)[0]);
        setOrganizationalUnit(props.config.organizationalUnits.filter(organizationalUnit => organizationalUnit.id == response.data.organizationalUnit)[0]);
        setDefenseDate(moment(response.data.defense.date))

        if (response.data.role == "MEMBER") {
          setActiveStep(2);
        }
        if (response.data.role == "CHAIRMAN") {
          setActiveStep(3);
        }
      })
  }, []);

  const navigateBack = () => {
    history.push("/")
  }

  const handleSaveAbstractAndKeywords = () => {
    WS.postThesisDetails(props.currentThesis.id, props.currentThesis, subjectMatter ? parseInt(subjectMatter.id) : null, 
                        organizationalUnit ? parseInt(organizationalUnit.id) : null,
                        abstract, keywords)
      .then(response => {
        setSuccessSnackbarOpen(true)
      })
      .catch(err => {
        setErrorSnackbarOpen(true)
      })
  }

  const handleSaveReview1 = () => {
    WS.postReview1(props.currentThesis, review1, grade1)
      .then(response => {
        setSuccessSnackbarOpen(true)
      })
      .catch(err => {
        setErrorSnackbarOpen(true)
      })
  }

  const handleSaveReview2 = () => {
    WS.postReview2(props.currentThesis, review2, grade2)
      .then(response => {
        setSuccessSnackbarOpen(true)
      })
      .catch(err => {
        setErrorSnackbarOpen(true)
      })
  }

  const handleSaveDefenseGrade = () => {
    WS.postDefenseGrade(props.currentThesis, defenseGrade)
      .then(response => {
        setSuccessSnackbarOpen(true)
        setDefended(true)
      })
      .catch(err => {
        setErrorSnackbarOpen(true)
      })
  }

  const handleUploadFileClick = () => {
    inputFile.current.click()
  }

  const handleFileSelected = () => {
    setFilePath("/praca.html")
  }

  const handleFileConfirmedClick = () => {
    props.setFilePath("/praca.html")
    WS.postFilePath(props.currentThesis, "/praca.html")
      .then(response => {
        setSuccessSnackbarOpen(true)
      })
      .catch(err => {
        setErrorSnackbarOpen(true)
      })
  }

  const handleCommitteeChangeClick = () => {
    if (!isCommitteEdited) {
      setIsCommiteeEdited(true)
    } else {
      WS.getPerson(chairmanId)
        .then(response => {
          setChairmanName(response.data.name)
        })
      WS.getPerson(advisorId)
        .then(response => {
          setAdvisorName(response.data.name)
        })
      WS.getPerson(member1Id)
        .then(response => {
          setMember1Name(response.data.name)
        })
      WS.getPerson(member2Id)
        .then(response => {
          setMember2Name(response.data.name)
        })
      setSuccessSnackbarOpen(true)
      setIsCommiteeEdited(false)
    }
  }

  const handleDefenseDateChange = (date) => {
    setDefenseDate(date)
    WS.postDefenseDate(props.currentThesis, date)
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
          <div style={{ display: 'flex' }}>
            <div className={classes.halfPage}>
              <p className={classes.header}>{props.currentThesis.type}</p>
              <p className={classes.thesisName}>{props.currentThesis.name}</p>
              <p className={classes.header}>Streszczenie</p>
              <div className={classes.textFieldContainer}>
                {roles.canChangeAbstractAndKeywords(props.currentThesis) && (
                  <TextField multiline fullWidth value={abstract} onChange={handleAbstractChange} />
                )}
                {!roles.canChangeAbstractAndKeywords(props.currentThesis) && (
                  <p className={classes.reviewText}>{abstract}</p>
                )}
              </div>
              <p className={classes.header}>Słowa kluczowe</p>
              <div className={classes.textFieldContainer}>
                {roles.canChangeAbstractAndKeywords(props.currentThesis) && (
                  <TextField fullWidth value={keywords} onChange={handleKeywordsChange} />
                )}
                {!roles.canChangeAbstractAndKeywords(props.currentThesis) && (
                  <p className={classes.reviewText}>{keywords}</p>
                )}
              </div>
            </div>
            <div className={classes.halfPage}>
              <p className={classes.header}>Tematyka pracy</p>
              <Autocomplete
                value={subjectMatter}
                setValue={setSubjectMatter}
                options={props.config.subjectMatters}
              />
              <p className={classes.header}>Jednostka organizacyjna</p>
              <Autocomplete
                value={organizationalUnit}
                setValue={setOrganizationalUnit}
                options={props.config.organizationalUnits}
              />
              {roles.canChangeAbstractAndKeywords(props.currentThesis) && (
                <div className={classes.button}>
                  <Button variant="contained" color="#CCC" onClick={handleSaveAbstractAndKeywords}>
                    ZAPISZ DANE PRACY
                </Button>
                </div>
              )}
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <React.Fragment>
            {props.currentThesis.defense.defended && (
              <p className={classes.header}>Praca została obroniona. Nie można zmieniać treści pracy.</p>
            )}
            <div className={classes.button}>
              {!props.currentThesis.filePath && roles.canUploadFile(props.currentThesis.role) && (
                <React.Fragment>
                  <p className={classes.subHeader}>Aby umożliwić składanie recenzji, musisz dodać treść pracy.</p>
                  <p className={classes.subHeader}>Wciśnij przycisk poniżej, aby dodać plik z pracą.</p>
                  <Button variant="contained" color="#CCC" disabled={props.currentThesis.defense.defended} onClick={handleUploadFileClick}>
                    Dodaj plik z pracą
                  </Button>
                </React.Fragment>
              )}
              {!props.currentThesis.filePath && !roles.canUploadFile(props.currentThesis.role) && (
                <p className={classes.header}>Praca nie została jeszcze załadowana przez studenta.</p>
              )}
            </div>
            <input type="file" id="file" ref={inputFile} style={{ display: "none" }} onChange={handleFileSelected} />
            {filePath && (
              <React.Fragment>
                <p className={classes.header}>Plik z pracą został dodany.</p>
                <p className={classes.subHeader}>Aby pobrać plik z pracą, kliknij poniżej</p>
                <a href={props.currentThesis.filePath} download>Click to download</a>
                <p className={classes.header}>Kliknij poniżej aby ostatecznie zatwierdzić pracę</p>
                <Button variant="contained" color="#CCC" disabled={props.currentThesis.filePath} onClick={handleFileConfirmedClick}>
                  Zatwierdź treść pracy
                </Button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {activeStep === 2 && (
          <React.Fragment>
            {!roles.canReview1(props.currentThesis, props.config) && roles.canSaveReview(props.currentThesis) && !!props.currentThesis.reviewer1.text ? (
              <React.Fragment>
                <p className={classes.header}>Recenzja 1 jest dostępna:</p>
                <p className={classes.subHeader}>Recenzent: {props.currentThesis.reviewer1.reviewerName}</p>
                <p className={classes.subHeader}>Ocena: {props.currentThesis.reviewer1.grade}</p>
                <p className={classes.subHeader}>Tekst recenzji:</p>
                <p className={classes.reviewText}>{props.currentThesis.reviewer1.text}</p>
              </React.Fragment>
            ) : (
                <p className={classes.header}>Recenzja 1 nie jest jeszcze gotowa.</p>
              )}
            {roles.canReview1(props.currentThesis, props.config) && roles.canSaveReview(props.currentThesis) && (
              <React.Fragment>
                <p className={classes.subHeader}>Wprowadź ocenę:</p>
                <TextField multiline fullWidth value={grade1} onChange={(event) => setGrade1(event.target.value)} />
                <p className={classes.subHeader}>Wprowadź recenzję:</p>
                <TextField multiline fullWidth value={review1} onChange={(event) => setReview1(event.target.value)} />
                <div className={classes.button}>
                  <Button variant="contained" color="#CCC" onClick={handleSaveReview1} disabled={!roles.canSaveReview(props.currentThesis)} >
                    ZAPISZ RECENZJĘ
                </Button>
                </div>
              </React.Fragment>
            )}
            {!roles.canReview2(props.currentThesis, props.config) && roles.canSaveReview(props.currentThesis) && !!props.currentThesis.reviewer2.text ? (
              <React.Fragment>
                <p className={classes.header}>Recenzja 2 jest dostępna:</p>
                <p className={classes.subHeader}>Recenzent: {props.currentThesis.reviewer2.reviewerName}</p>
                <p className={classes.subHeader}>Ocena: {props.currentThesis.reviewer2.grade}</p>
                <p className={classes.subHeader}>Tekst recenzji:</p>
                <p className={classes.reviewText}>{props.currentThesis.reviewer2.text}</p>
              </React.Fragment>
            ) : (
                <p className={classes.header}>Recenzja 2 nie jest jeszcze gotowa.</p>
              )}
            {roles.canReview2(props.currentThesis, props.config) && roles.canSaveReview(props.currentThesis) && (
              <React.Fragment>
                <p className={classes.subHeader}>Wprowadź ocenę:</p>
                <TextField multiline fullWidth value={grade2} onChange={(event) => setGrade2(event.target.value)} />
                <p className={classes.subHeader}>Wprowadź recenzję:</p>
                <TextField multiline fullWidth value={review2} onChange={(event) => setReview2(event.target.value)} />
                <div className={classes.button}>
                  <Button variant="contained" color="#CCC" onClick={handleSaveReview2} disabled={!roles.canSaveReview(props.currentThesis)}>
                    ZAPISZ RECENZJĘ
                  </Button>
                </div>
              </React.Fragment>
            )}
            {!roles.canSaveReview(props.currentThesis) && (
              <p className={classes.subHeader}>Nie można zapisać recenzji, ponieważ nie została dodana treść pracy.</p>
            )}
          </React.Fragment>
        )}
        {activeStep === 3 && (
          <React.Fragment>
            <p className={classes.header}>Czy praca obroniona:</p>
            <p className={classes.subHeader}>{props.currentThesis.defense.defended ? "TAK" : "NIE"}</p>
            {!roles.canChangeCommittee(props.currentThesis) && (
              <p className={classes.subHeader}>Data obrony: {moment(props.currentThesis.defense.date).format("DD/MM/YYYY HH:mm")}</p>
            )}
            {roles.canChangeCommittee(props.currentThesis) && (
              <div style={{ margin: 10 }}>
                <DateTimePicker
                  label="Data obrony"
                  value={defenseDate}
                  onChange={handleDefenseDateChange}
                />
              </div>
            )}
            <p className={classes.header}>Skład komisji:</p>
            {roles.canChangeCommittee(props.currentThesis) && (
              <Button onClick={handleCommitteeChangeClick}>{isCommitteEdited ? "ZATWIERDŹ ZMIANY" : "ZMIEŃ"}</Button>
            )}
            {!isCommitteEdited && (
              <React.Fragment>
                <p className={classes.reviewText}>Przewodniczący: {chairmanName}</p>
                <p className={classes.reviewText}>Opiekun: {advisorName}</p>
                <p className={classes.reviewText}>Członek: {member1Name}</p>
                <p className={classes.reviewText}>Członek: {member2Name}</p>
              </React.Fragment>
            )}
            {isCommitteEdited && (
              <React.Fragment>
                <div className={classes.textAndButton}>
                  <p className={classes.reviewText}>Przewodniczący: </p>
                  <TextField value={chairmanId} onChange={(e) => setChairmanId(e.target.value)} />
                </div>
                <div className={classes.textAndButton}>
                  <p className={classes.reviewText}>Opiekun: </p>
                  <TextField value={advisorId} onChange={(e) => setAdvisorId(e.target.value)} />
                </div>
                <div className={classes.textAndButton}>
                  <p className={classes.reviewText}>Członek: </p>
                  <TextField value={member1Id} onChange={(e) => setMember1Id(e.target.value)} />
                </div>
                <div className={classes.textAndButton}>
                  <p className={classes.reviewText}>Członek: </p>
                  <TextField value={member2Id} onChange={(e) => setMember2Id(e.target.value)} />
                </div>
              </React.Fragment>
            )}
            {roles.canSetDefended(props.currentThesis) && !props.currentThesis.defense.defended && (
              <React.Fragment>
                <p className={classes.subHeader}>Wprowadź ocenę z obrony:</p>
                <TextField fullWidth value={defenseGrade} onChange={(event) => setDefenseGrade(event.target.value)} />
                <div className={classes.button}>
                  <Button variant="contained" color="#CCC" onClick={handleSaveDefenseGrade} disabled={!!defended || !props.currentThesis.filePath}>
                    ZATWIERDŹ OBRONĘ
                    </Button>
                </div>
              </React.Fragment>
            )}
            {(!roles.canSetDefended(props.currentThesis) || props.currentThesis.defense.defended) && (
              <p className={classes.subHeader}>Ocena: {props.currentThesis.defense.grade || "Brak oceny (praca nie obroniona)"}</p>
            )}
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
    overflowX: "scroll"
  },
  thesisName: {
    padding: 10,
    fontSize: 18
  },
  textFieldContainer: {
    padding: 10,
    width: "90%",
    minWidth: 100
  },
  button: {
    margin: 20
  },
  reviewText: {
    padding: 5,
    maxWidth: 500
  },
  textAndButton: {
    display: "flex",
    alignItems: "center"
  },
  halfPage: {
    width: "45%",
    margin: 5
  }
});

export default ThesisPage