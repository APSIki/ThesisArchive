import React, { useState } from 'react';

const AddThesisModalForm = (props) => {

  const [thesisTitle, setThesisTitle] = useState("");
  const [thesisType, setThesisType] = useState("");

  const addThesis = () => {
    props.addThesis(
      {
        "id": 1000,
        "type": thesisType,
        "description": thesisTitle
    });
    props.closeModal();
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
          <input className="form-control" id="thesisType" onChange={handleTypeChange} />
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
