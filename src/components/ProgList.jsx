import React from 'react';
import ProgItem from "./ProgItem";

const ProgList = ({progs, handleModalOpen} ) => {

  return (
    <React.Fragment>
      {(progs.length === 0) && <p style={{textAlign: "center"}}>Выберите предмет, институт или факультет</p>}

      {(progs.length > 0) &&
        <div className='prog-list'>
          {progs.map(prog => <ProgItem key={prog.id} prog={prog} handleModalOpen={handleModalOpen}/>)}
        </div>
      }
    </React.Fragment>
  )
};

export default ProgList;
