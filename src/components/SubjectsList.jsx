import React from 'react';

import Fade from 'react-reveal/Fade';

const SubjectsList = (props) => {
  const {subjects, handleSubjectCheckboxClick, activeCatId} = props;

  return (

    <React.Fragment>
      {subjects.map((subject) => {

        let status = subject.isActive;
        if (subject.name === 'Русский язык') status = true;

        return (
            <Fade>
            <div key={subject.id} style={{whiteSpace: "nowrap", display: "flex"}}>
              <input onChange={event => handleSubjectCheckboxClick(subject, event)}
                     type="checkbox"
                     id={`checkbox-${subject.id}-${activeCatId}`}
                     checked={status}
              />
              <label style={{whiteSpace: "normal"}} className='subject' htmlFor={`checkbox-${subject.id}-${activeCatId}`}>
                {subject.name}
              </label>
            </div>
            </Fade>

        )
      })}
    </React.Fragment>

  )

};

export default  SubjectsList;
