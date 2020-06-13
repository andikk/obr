import React from 'react';
import withFetching from "./WithFetching.jsx";

const NewModalContent = (props) => {
    const {error, isLoading} = props;
    const progDesc = props.data;

    if (error) {
      return <p  style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Ошибка загрузки данных. Описание ошибки: {error.message}</p>;
    }

    if (isLoading || progDesc === null) {
      return <p style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Загрузка данных ...</p>;
    }

    return (
      <div>
        <h2 style={{marginBottom: '0.5rem'}}>{progDesc.name}</h2>
        <h3 style={{marginBottom: '0.5rem'}}>{progDesc.institute}</h3>

        <ul style={{listStyle: 'none', padding: '0', display: 'flex'}}>
          {progDesc.subjects.map((subject) => (
            <li style={{marginRight: '1rem'}} key={subject.id}>
              {subject.name}
            </li>
          ))}
        </ul>

        <div>
          {progDesc.info.map((item) => (
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

        <h3>О программе</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.about}}></p>

        <h3>Что я буду изучать</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.disciplines}}></p>

        <h3>Практики и стажировки</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.practice}}></p>

        <h3>Где я буду работать</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.job}}></p>

        <h3>Профессии будущего</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.professions}}></p>

        <h3>Наши выпускники работают в следующих организациях и учреждениях</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.companies}}></p>

        <h3>Наши выпускники</h3>
        <p dangerouslySetInnerHTML={{__html: progDesc.graduate}}></p>

      </div>
    )
};

export {NewModalContent};
export default withFetching(NewModalContent);
