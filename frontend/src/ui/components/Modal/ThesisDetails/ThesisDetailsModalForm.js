import React, {  useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import WS from '../../../../tools/WS'

const ThesisDetailsModalForm = props => { 
  const classes = useStyles();

  const [abstract, setAbstract] = useState('')
  const [keywords, setKeywords] = useState('')
  const [organizationalUnit, setOrganizationalUnit] = useState(0)
  const [reviewer, setReviewer] = useState('')
  const [subjectMatter, setSubjectMatter] = useState(0)
  const [thesisGuardian, setThesisGuardian] = useState('')
  const [thesisSubject, setThesisSubject] = useState('')
  const [thesisType, setThesisType] = useState('')


  useEffect(() => {
    console.log(props.thesisId)
     WS.getThesis(1).then(response => {
      setAbstract(response.data.abstract)
      setKeywords(response.data.keywords)
      setOrganizationalUnit(response.data.organizationalUnit)
      setReviewer(response.data.reviewer)
      setSubjectMatter(response.data.subjectMatter)
      setThesisGuardian(response.data.thesisGuardian)
      setThesisSubject(response.data.name)
      setThesisType(response.data.type)
    })
  }, []);


  return (
    <React.Fragment>
        <p className={classes.header}>Szczegóły pracy</p>
        <div className={classes.container}>
          <p><b>Tytuł:</b> {thesisSubject}</p>
          <p><b>Typ:</b> {thesisType}</p>
          <p><b>Streszczenie:</b> {abstract}</p>
          <p><b>Słowa kluczowe:</b> {keywords}</p>
          <p><b>Recenzent:</b>  {reviewer}</p>
          <p><b>Promotor:</b> {thesisGuardian}</p>
        </div>
    </React.Fragment>
  );
}

const useStyles = createUseStyles({
    header: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column"
    }
});

export default ThesisDetailsModalForm