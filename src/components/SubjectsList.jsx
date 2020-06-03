import React from 'react';
import styles from '../App.module.css';

const SubjectsList = (props) => {
  const {subjects, handleSubjectCheckboxClick, activeCatId} = props;

  return (
    <React.Fragment>
      {subjects.map((subject) => {

        let status = subject.isActive;
        if (subject.name === 'Русский язык') status = true;

        return (
          <div key={subject.id} className="form-check">
            <input onChange={event => handleSubjectCheckboxClick(subject, event)}
                   className="form-check-input"
                   type="checkbox"
                   id={`checkbox-${subject.id}-${activeCatId}`}
                   checked={status}

            />
            <label className={`form-check-label ${styles.pl1}`} htmlFor={`checkbox-${subject.id}-${activeCatId}`}>
              {subject.name}
            </label>
          </div>
        )
      })}
    </React.Fragment>
  )
};

export default  SubjectsList;
