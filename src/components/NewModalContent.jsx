import React from 'react';
import withFetching from "./WithFetching.jsx";
import {APP_URL} from "../helper";
import Spinner from "./Spinner";

const NewModalContent = (props) => {
    const {error, isLoading} = props;
    const progDesc = props.data;

    if (error) {
      return <p  style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Ошибка загрузки данных. Описание ошибки: {error.message}</p>;
    }

    if (isLoading || progDesc === null) {
      return <Spinner/>;
    }

    return (
      <div className="detail">

        <h3 className="detail__institute">{progDesc.institute}</h3>
        <h2 className="detail__progname">{progDesc.name}</h2>

        <h3>Профили</h3>
        <p>{progDesc.profile}</p>


        <h3>Вступительные испытания</h3>
        <ul className="detail__subject-list">
          {progDesc.subjects.map((subject) => (
            <li className="detail__subject-name" key={subject.id}>
              {subject.name}
            </li>
          ))}
        </ul>

        <div>
          {progDesc.info.map((item) => (
            <div className='info' key={item.id}>
              <div className='info__item'>
                  <p className='info__value'>{item.term} <span>{(item.term === '5' || item.term === '5,5') ? `лет` : `года`}</span></p>
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
              <div className='info__item'>
                <p className='info__value'>{item.price} <span>тыс. руб</span> </p>
                <p className='info__text'>Стоимость</p>
              </div>
            </div>
          ))}
        </div>

        <div className="detail__description">

            {(progDesc.about) &&
                <div>
                    <h3>О программе</h3>
                    <p>{progDesc.about}</p>
                </div>
            }

            {(progDesc.disciplines) &&
                <div>
                    <h3>Что я буду изучать</h3>
                    <p>{progDesc.disciplines}</p>
                </div>
            }

            {(progDesc.practice) &&
                <div>
                    <h3>Практики и стажировки</h3>
                    <p>{progDesc.practice}</p>
                </div>
            }

            {(progDesc.job) &&
                <div>
                    <h3>Кем я буду работать</h3>
                    <p>{progDesc.job}</p>
                </div>
            }

            {(progDesc.professions) &&
                <div>
                    <h3>Профессии будущего</h3>
                    <p>{progDesc.professions}</p>
                </div>
            }

            {(progDesc.companies) &&
                <div>
                    <h3>Наши выпускники работают в следующих организациях и учреждениях</h3>
                    <ul>{progDesc.companies.split('\n').map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                    </ul>
                </div>
            }


            {(progDesc.graduates.length > 0) &&
                <div>
                    {(progDesc.graduate) &&
                        <div>
                            <h3>Наши выпускники</h3>
                            <p>{progDesc.graduate}</p>
                        </div>
                    }
                    <div className="graduates">
                        {progDesc.graduates.map((graduate) => (
                          <div className="graduates__item" key={graduate.id}>
                              <div className="graduates__image-wrapper">
                                  {(graduate.file) &&
                                    <img alt={graduate.name} className="graduates__image" src={APP_URL + 'uploads/' + graduate.file}/>
                                  }
                              </div>
                              <div className="graduates__text">
                                  <p className="graduates__name">{graduate.name}</p>
                                  <p className="graduates__description">{graduate.description}</p>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>
            }

        </div>
      </div>
    )
};

export {NewModalContent};
export default withFetching(NewModalContent);
