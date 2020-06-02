import React from 'react';
import styles from '../App.module.css';

const ProgList = (props) => {
  const {progs, handleModalOpen} = props;

  return (
    <ul className={styles.progList}>
      {progs.map((prog) => (
        <li className={styles.progItem} key={prog.id}>
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
