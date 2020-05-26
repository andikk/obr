import React, { useState } from 'react';

const SubjectsList = (props) => {
  const {subjects, handleSubjectChange} = props;

  return (
    <React.Fragment>
      {subjects.map((subject) => {
        return (
          <div key={subject.id} className="form-check">
            <input onChange={event => handleSubjectChange(subject.id, event)} className="form-check-input" type="checkbox" value={subject.id} id={`checkbox-${subject.id}`} />
            <label className="form-check-label" htmlFor={`checkbox-${subject.id}`}>
              {subject.name}
            </label>
          </div>
        )
      })}
    </React.Fragment>
  )
};

export default  SubjectsList;
