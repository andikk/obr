import React from 'react';
import styles from '../App.module.css';

const ProgList = (props) => {
  const {progs, handleModalOpen} = props;

  return (
    <ul className={styles.progList}>
      {progs.map((prog) => (
        <li className={styles.progItem} key={prog.id}>
          <p>{prog.name}</p>
          <p>{prog.term} <span>{prog.form}</span></p>
          <p>{prog.paidAmount} <span>Платных мест</span></p>
          <p>{prog.budgetAmount} <span>Бюджетных мест</span></p>
          <p><button className={`_btn01 ${styles.btnDetail}`} onClick={handleModalOpen}> Подробнее </button></p>
        </li>
      ))}
    </ul>
  )
};

export default ProgList;
