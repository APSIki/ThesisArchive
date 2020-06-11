import React, { useState } from 'react';
import WS from '../../../../tools/WS'

const AddThesisModalForm = (props) => {

  const [thesisTitle, setThesisTitle] = useState("");
  const [thesisType, setThesisType] = useState(1);

  const addThesis = () => {
    props.closeModal();

    WS.postNewThesis({
      type: String(thesisType),
      name: thesisTitle
    }).then(response => {
      window.location.reload()
    })
  }

  const handleTypeChange = (event) => {
    event.preventDefault();
    setThesisType(event.target.value)
  }

  const handleTitleChange = (event) => {
    event.preventDefault();
    setThesisTitle(event.target.value)
  }

  return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="thesisType">Typ Pracy dyplomowej</label>
          <select className="form-control" id="thesisType" onChange={handleTypeChange} >
            <option value={1}>Praca inżynierska</option>
            <option value={2}>Praca magisterska</option>
            <option value={3}>Praca doktorska</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Temat pracy dyplomowej</label>
          <input className="form-control" id="thesisTitle" onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit" onClick={addThesis}>
            Zapisz
          </button>
        </div>
      </React.Fragment>
  );
};

export default AddThesisModalForm;
