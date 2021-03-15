import React from 'react';
import Fade from 'react-reveal/Fade';

const CheckBoxList = ({checkboxes, onCheckBoxClick, activeCatId}) => {

  return (
    <React.Fragment>
      {checkboxes.map((checkbox) => {

        return (
            <Fade key={checkbox.id} >
              <div style={{whiteSpace: "nowrap", display: "flex"}}>
                <input onChange={event => onCheckBoxClick(checkbox, event)}
                       type="checkbox"
                       id={`checkbox-${checkbox.id}-${activeCatId}`}
                       name={`checkbox-${checkbox.id}-${activeCatId}`}
                       checked={checkbox.isChecked}
                />
                <label style={{whiteSpace: "normal"}} className='subject' htmlFor={`checkbox-${checkbox.id}-${activeCatId}`}>
                  {checkbox.name}
                </label>
              </div>
            </Fade>
        )
      })}
    </React.Fragment>
  )
};

export default  CheckBoxList;
