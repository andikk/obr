import React from 'react';
import styles from '../App.module.css';

const ProgList = (props) => {
  const {progs, handleModalOpen} = props;

  return (
    <React.Fragment>
      {(progs.length === 0) && <p style={{textAlign: "center"}}>Выберите предмет, институт или факультет</p>}

      {(progs.length > 0) &&
        <div className='prog-list'>
          {progs.map((prog) => (
            <div className='prog-list__item' key={prog.id}>

              <p className='prog-list__name-container'>{prog.name}</p>

              <div className='prog-list__info-container'>
                {prog.info.map((item) => (
                  <div className='info' key={item.id}>
                    <div className='info__item'>
                      <p className='info__value'>{item.term}</p>
                      <p className='info__text'>{item.form}</p>
                    </div>
                    <div className='info__item'>
                      <p className='info__value'>{item.paidAmount}</p>
                      <p className='info__text'>Платных мест</p>
                    </div>
                    <div className='info__item'>
                      <p className='info__value'>{item.budgetAmount}</p>
                      <p className='info__text'>Бюджетных мест</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='prog-list__btn-container'>
                <button className='btn btn-primary prog-list__btn' onClick={() => handleModalOpen(prog.id)}> Подробнее </button>
              </div>
            </div>

          ))}
        </div>}

    </React.Fragment>

  )
};

export default ProgList;
