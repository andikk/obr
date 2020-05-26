import React, { useState } from 'react';

const ProgList = (props) => {
  const {progs, handleModalOpen} = props;

  return (
    <ul>
      {progs.map((prog) => (
        <li className="d-flex justify-content-between" key={prog.id}>
          <p>{prog.name}</p>
          <p>{prog.term}</p>
          <p>{prog.paidAmount}</p>
          <p>{prog.budgetAmount}</p>
          <p><button onClick={handleModalOpen}>Открыть</button></p>
        </li>
      ))}
    </ul>
  )
};

export default ProgList;
