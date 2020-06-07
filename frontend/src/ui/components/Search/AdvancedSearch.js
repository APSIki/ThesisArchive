import React, { useState } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { createUseStyles } from 'react-jss';
import StyledCheckbox from '../Catalog/StyledCheckbox'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import WS from '../../../tools/WS'
import DisplayTable from '../Catalog/DisplayTable'
import Grid from '@material-ui/core/Grid';

const AdvancedSearch = (props) => {

    const [engineeringThesis, setEngineeringThesis] = useState(true);
    const [masterThesis, setMasterThesis] = useState(true);
    const [doctoralThesis, setDoctoralThesis] = useState(true);
    const [defenseDateFrom, setDefenseDateFrom] = useState(null);
    const [defenseDateTo, setDefenseDateTo] = useState(null);
    const [publicationDateFrom, setPublicationDateFrom] = useState(null);
    const [publicationDateTo, setPublicationDateTo] = useState(null);
    const [thesisAuthor, setThesisAuthor] = useState('');
    const [thesisReviewer, setThesisReviewer] = useState('');
    const [memberOfTheCommission, setMemberOfTheCommission] = useState('');
    const [keyWord, setKeyWord] = useState('');
    const [dataRows, setDataRows] = useState(null);


    const classes = useStyles();

    const handleChangeEngineeringThesis = (e) => {
        setEngineeringThesis(e.target.checked)
    }

    const handleChangeMasterThesis = (e) => {
        setMasterThesis(e.target.checked)
    }

    const handleChangeDoctoralThesis = (e) => {
        setDoctoralThesis(e.target.checked)
    }

    const handleChangeDefenseDateFrom = (e) => {
        setDefenseDateFrom(e.target.value)
    }

    const handleChangeDefenseDateTo = (e) => {
        setDefenseDateTo(e.target.value)
    }
    const handleChangePublicationDateFrom = (e) => {
        setPublicationDateFrom(e.target.value)
    }

    const handleChangePublicationDateTo = (e) => {
        setPublicationDateTo(e.target.value)
    }

    const handleChangeThesisAuthor = (e) => {
        setThesisAuthor(e.target.value)
    }

    const handleChangeThesisReviewer = (e) => {
        setThesisReviewer(e.target.value)
    }

    const handleChangeMemberOfTheCommission = (e) => {
        setMemberOfTheCommission(e.target.value)
    }

    const handleChangeKeyWord = (e) => {
        setKeyWord(e.target.value)
    }

    const handlebuttonSearchClick = () => {
        let thesisType;
        if(engineeringThesis){
            thesisType = 'engineering'
        } 
        if(masterThesis) {
            thesisType = thesisType + ";master"
        }
        if(doctoralThesis) {
            thesisType = thesisType + ";doctoral"
        } 

        WS.getThesisByAdvancedSearch(thesisType, thesisAuthor, thesisReviewer, 
            memberOfTheCommission, keyWord, defenseDateFrom, defenseDateTo,
            publicationDateFrom, publicationDateTo).then(response => {
            setDataRows(response.data.theses);
        })
    }
    
    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={6} className={classes.width6}>
                    <div className={classes.searchForm}>    
                        <FormControl className={classes.formControl}>
                            <FormLabel className={classes.sectionTitle} component="legend">Rodzaj prac</FormLabel>
                            <FormGroup aria-label="position" style={{ width: '700px' }} row>
                                <FormControlLabel
                                    control={<StyledCheckbox checked={engineeringThesis} onChange={handleChangeEngineeringThesis} name="engineeringThesis" />}
                                    label="Prace inzynierskie"
                                    labelPlacement="start"/>
                                <FormControlLabel
                                    control={<StyledCheckbox checked={masterThesis} onChange={handleChangeMasterThesis} name="masterThesis" />}
                                    label="Prace magisterskie"
                                    labelPlacement="start"/>
                                <FormControlLabel
                                    control={<StyledCheckbox checked={doctoralThesis} onChange={handleChangeDoctoralThesis} name="doctoralThesis" />}
                                    label="Prace doktoranckie"
                                    labelPlacement="start"/>
                            </FormGroup>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormLabel className={classes.sectionTitle}>Daty egzaminu</FormLabel>
                            <FormGroup aria-label="position" style={{ width: '700px' }} row>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="defenseDateFrom"
                                        label="Data od"
                                        type="date"
                                        defaultValue="2020-06-01"
                                        value={defenseDateFrom}
                                        onChange={handleChangeDefenseDateFrom}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="defenseDateTo"
                                        label="Data do"
                                        type="date"
                                        defaultValue="2020-06-01"
                                        value={defenseDateTo}
                                        onChange={handleChangeDefenseDateTo}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        style={{ marginLeft: '30px' }}
                                    />
                                </form>
                            </FormGroup>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <FormLabel className={classes.sectionTitle}>Daty publikacji</FormLabel>
                            <FormGroup aria-label="position" style={{ width: '700px' }} row>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="publicationDateFrom"
                                        label="Data od"
                                        type="date"
                                        defaultValue="2020-06-01"
                                        value={publicationDateFrom}
                                        onChange={handleChangePublicationDateFrom}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="dpublicationDateTo"
                                        label="Data do"
                                        type="date"
                                        defaultValue="2020-06-01"
                                        value={publicationDateTo}
                                        onChange={handleChangePublicationDateTo}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        style={{ marginLeft: '30px' }}
                                    />
                                </form>
                            </FormGroup>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <FormLabel className={classes.sectionTitle}>Osoby związane z pracą</FormLabel>
                            <FormGroup aria-label="position" style={{ width: '700px' }} row>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="thesisAuthor"
                                        label="Autor"
                                        type="text"
                                        value={thesisAuthor}
                                        onChange={handleChangeThesisAuthor}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="thesisReviewer"
                                        label="Recenzent"
                                        type="text"
                                        value={thesisReviewer}
                                        onChange={handleChangeThesisReviewer}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        style={{ marginLeft: '15px' }}
                                    />
                                </form>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="memberOfTheCommission"
                                        label="Członek Komisji"
                                        type="text"
                                        value={memberOfTheCommission}
                                        onChange={handleChangeMemberOfTheCommission}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        style={{ marginLeft: '15px' }}
                                    />
                                </form>
                            </FormGroup>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <FormLabel className={classes.sectionTitle}>Słowa kluczowe</FormLabel>
                            <FormGroup aria-label="position" style={{ width: '700px' }} row>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="keyWord"
                                        label="Słowo kluczowe/tag"
                                        type="text"
                                        value={keyWord}
                                        onChange={handleChangeKeyWord}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>
                            </FormGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.buttonSearch}
                            onClick={handlebuttonSearchClick}
                            endIcon={<SearchIcon />}>
                                Szukaj
                        </Button>      
                    </div>
                </Grid>
                <Grid item xs={6}>
                    { 
                        dataRows != null ? <DisplayTable rows={dataRows} /> : null
                    }
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = createUseStyles({
    root: {
        flexGrow: 1,
    },
    searchForm: {
        marginTop: '20px',
        marginBottom: 5,
        padding: '6px',
        border: '1px solid #0c0a8c',
        marginRight: '30px !important'
    },
    formControl: {
        display: 'block !important',
        marginBottom: '20px !important' ,
        marginLeft: '15px !important',
        padding: '5px !important',
        border: '1px solid #0c0a8c !important'
    },
    buttonSearch: {
        marginLeft: '15px !important',
        marginTop: '15px !important'
    },
    sectionTitle: {
        color: '#000000 !important',
        fontSize: '22px !important'
    },
    searchBox: {
        border: "1px solid #7f5c8c",
        width: "500px",
        "border-radius": "5px",
        "&:focus": {
            "outline-color": "#7f5c8c"
        }
    },
    width6: {
        maxWidth:'none !important'
    }
});

export default AdvancedSearch