import React from 'react';
import styles from '../App.module.css';

const ProgList = (props) => {
  const {progs, handleModalOpen} = props;

  return (
    <React.Fragment>
      {(progs.length === 0) && <p style={{textAlign: "center"}}>Выберите предмет, институт или факультет</p>}

      {(progs.length > 0) &&
        <div className={styles.progList}>
          {progs.map((prog) => (
            <div className={styles.progItem} key={prog.id}>
              <p>{prog.name}</p>
              <div style={{flex: 1}}>
                {prog.info.map((item) => (
                    <div style = {{display: 'flex', justifyContent: 'space-around'}}>
                      <p>{item.term} <span>{item.form}</span></p>
                      <p>{item.paidAmount} <span>Платных мест</span></p>
                      <p>{item.budgetAmount} <span>Бюджетных мест</span></p>
                    </div>
                ))}
              </div>


              <p><button className={`_btn01 ${styles.btnDetail}`} onClick={() => handleModalOpen(prog.id)}> Подробнее </button></p>
            </div>
          ))}
        </div>}

    </React.Fragment>

  )
};

export default ProgList;
