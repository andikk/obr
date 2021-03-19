import React from 'react';
import Fade from 'react-reveal/Fade';

const ProgList = ({progs, handleModalOpen} ) => {

  return (
    <React.Fragment>
      {(progs.length === 0) && <p style={{textAlign: "center"}}>Выберите предмет, институт или факультет</p>}

      {(progs.length > 0) &&
        <div className='prog-list'>
          {progs.map((prog) => (
            <Fade key={prog.id}>

              <div className='prog-list__item' >

                <p className='prog-list__name-container'>{prog.name}</p>

                <div className='prog-list__info-container'>
                  {prog.info.map((item) => (
                      <div className='info' key={item.id}>
                        <div className='info__item'>
                          <p className='info__value'>{item.term}
                            <span>{(item.term === '5' || item.term === '5,5' || item.term === '6') ? ` лет` : ` года`}</span></p>
                          <p className='info__text'>{item.form}</p>
                        </div>
                        <div className='info__item'>
                          <p className='info__value'>{item.budgetAmount}</p>
                          <p className='info__text'>Бюджетных мест</p>
                        </div>
                        <div className='info__item'>
                          <p className='info__value'>{item.paidAmount}</p>
                          <p className='info__text'>Платных мест</p>
                        </div>
                        <div className='info__item' style={{display: "none"}}>
                          <p className='info__value'>{item.price} <span>тыс. руб</span></p>
                          <p className='info__text'>Стоимость</p>
                        </div>
                      </div>
                  ))}
                </div>

                <div className='prog-list__btn-container'>
                  <button className='btn btn-primary prog-list__btn'
                          onClick={() => handleModalOpen(prog.id)}> Подробнее
                  </button>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      }
    </React.Fragment>
  )
};

export default ProgList;
