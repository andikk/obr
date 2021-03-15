import React, {useEffect, useState} from "react";
import useAxios from 'axios-hooks'
import {APP_URL, CAT_TYPE, CATS, removeDuplicates} from "./helper";
import ProgList from "./components/ProgList";
import ReactModal from "react-modal";
import NewModalContent from "./components/NewModalContent";
import CheckBoxList from './components/CheckBoxList';

const Main = () => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [checkboxes, setCheckboxes] = useState([]);
  const [filter, setFilter] = useState([]);

  const [{ data, loading, error }, refetch] = useAxios(
    'https://edprogs.ncfu.ru/api/list-abit'
  );

  useEffect(() => {
    if (data) {
      console.log(data.data[1]);
      onTabClick(1);
    }

  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  const onTabClick = (tabId) => {
    setActiveTabId(tabId);
    const progs = data.data;

    // получаем перечень чекбоксов в зависимости от выбранной вкладки
    // для вкладки по предметам формируются чекбоксы с предметами
    // для вкладки по институтам формируются чекбоксы с институтами
    const curCatType = CAT_TYPE[tabId];
    const allCheckboxes = progs.map(prog => prog[curCatType].map((item) => item))
      .reduce((a, b) => a.concat(b), [])
      .map(item => ({id: item.id, name: item.name, isChecked: (item.name === 'Русский язык')}));
    const uniqueCheckboxes = removeDuplicates(allCheckboxes, "id");
    setCheckboxes(uniqueCheckboxes);

  };

  const onCheckBoxClick = (checkbox, event) => {
    console.log(event.target.checked);
    // обновляем значению у чекбоксов
    const foundIndex = checkboxes.indexOf(checkbox);
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[foundIndex] = {id: checkbox.id, name: checkbox.name, isChecked: !checkbox.isChecked};
    setCheckboxes(updatedCheckboxes);

    if (event.target.checked) {
      setFilter(prevFilter => ([...[checkbox.id], ...prevFilter]))
      // this.setState((prevState) => ({
      //   filterSubject: [...[subject.id], ...prevState.filterSubject]
      // }))
    } else {
      //setFilter(prevFilter => ([...[checkbox.id], ...prevFilter.filter(item => item !== checkbox.id)]))
      // this.setState((prevState) => ({
      //   filterSubject: prevState.filterSubject.filter((item) => item !== subject.id)
      // }))
    }

    console.log(filter);

  };

  return (
    <div className='container _block01'>
      <h2>Подбор образовательных программ</h2>

      <div className='tabs'>
        {CATS.map((cat) => (
          <button key={cat.id} onClick={() => onTabClick(cat.id)}
                  className={`_btn-lnk tabs__btn ${cat.id === activeTabId ? `tabs__btn--active`: ``}`} role="button"
                  type="button">
            {cat.name}
          </button>
        ))}
      </div>

      <div className="row">
        <div className="col-md-2">
          <CheckBoxList checkboxes={checkboxes} activeCatId={activeTabId} onCheckBoxClick={onCheckBoxClick}/>
        </div>
        {/*<div className="col-md-10">*/}
        {/*  <ProgList progs={progsToShow} handleModalOpen={this.handleModalOpen}/>*/}
        {/*</div>*/}
      </div>


    </div>
  )


};

export default Main;
