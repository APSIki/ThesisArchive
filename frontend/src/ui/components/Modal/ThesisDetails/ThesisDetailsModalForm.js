import React, {  useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import WS from '../../../../tools/WS'

const ThesisDetailsModalForm = props => { 
  const classes = useStyles();


  const [abstract, setAbstract] = useState('')
  const [keywords, setKeywords] = useState('')
  const [thesisSubject, setThesisSubject] = useState('')
  const [thesisType, setThesisType] = useState('')
  const [subjectMatter, setSubjectMatter] = useState(null)
  const [organizationalUnit, setOrganizationalUnit] = useState(null)
  const [reviewer1, setReviewer1] = useState('');
  const [reviewer2, setReviewer2] = useState('');



  useEffect(() => {
     WS.getThesis(props.thesisId).then(response => {
      console.log(response.data)
      setAbstract(response.data.abstract)
      setKeywords(response.data.keywords)
      setOrganizationalUnit(response.data.organizationalUnit)
      setReviewer1(response.data.reviewer1.reviewerName)
      setReviewer2(response.data.reviewer2.reviewerName)
      setSubjectMatter(response.data.subjectMatter)
      setThesisSubject(response.data.name)
      setThesisType(response.data.type)
      setSubjectMatter(props.config.subjectMatters.filter(subjectMatter => subjectMatter.id == response.data.subjectMatter)[0].name);
      setOrganizationalUnit(props.config.organizationalUnits.filter(organizationalUnit => organizationalUnit.id == response.data.organizationalUnit)[0].name);
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
          <p><b>Tematyka:</b>  {subjectMatter}</p>
          <p><b>Nazwa instytutu:</b> {organizationalUnit}</p>
          <p><b>Recenzenci:</b> {reviewer1}, {reviewer2} </p>
          
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