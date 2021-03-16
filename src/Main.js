import React, {useEffect, useState} from "react";
import useAxios from 'axios-hooks'
import {APP_URL, CAT_TYPE, CATS, includesAll, includesAny, removeDuplicates} from "./helper";
import ProgList from "./components/ProgList";
import ReactModal from "react-modal";
import NewModalContent from "./components/NewModalContent";
import CheckBoxList from './components/CheckBoxList';
import Spinner from "./components/Spinner";

const Main = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProgId, setSelectedProgId] = useState();
  const [activeTabId, setActiveTabId] = useState(1);
  const [checkboxes, setCheckboxes] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredProgs, setFilteredProgs] = useState([]);

  const [{ data, loading, error }] = useAxios(
    APP_URL +'api/list-abit'
  );

  useEffect(() => {
    if (data) {
      onTabClick(1);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const progs = data.data;
      // фильтрация для институтов:
      // отображаются программы, в которых есть как минимум ОДИН институт, отмеченный фильтре
      let progsToShow = progs.filter(prog => {
        const institutesIds = prog.institutes.map(inst=> inst.id);
        return includesAny(institutesIds, filter);
      });

      // фильтрация программ для предметов:
      // отображаются программы, в которых присутствуют ВСЕ предметы, отмеченные в фильре
      if (activeTabId === 1) {
        progsToShow = progs.filter(prog => {
          const subjectIds = prog.subjects.map(subj => subj.id);
          return includesAll(subjectIds, filter);
        });
      }
      setFilteredProgs(progsToShow);

    }
  }, [filter, activeTabId]);

  if (loading) return  <Spinner/>;

  if (error) return <p>Ошибка загрузки. {error}</p>;


  const onTabClick = (tabId) => {
    setActiveTabId(tabId);
    setFilter([]);
    setFilteredProgs([]);
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
    //чекбокс Русский язык всегда должен быть отмечен
    if (checkbox.name === 'Русский язык') return;

    // обновляем значению у чекбоксов при клике на них (обновляется соответствующий стейт и чебоксы кликаются)
    setCheckboxes(prevCheckboxes => {
      const foundIndex = prevCheckboxes.indexOf(checkbox);
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[foundIndex] = {id: checkbox.id, name: checkbox.name, isChecked: !checkbox.isChecked};
      return updatedCheckboxes;
    });

    // устанавливаем фильтр
    if (event.target.checked) {
      setFilter(prevFilter => {
        // в если выбрана вкладка По предметам, то фильтре всегда должен присутствовать id предмета русский язык равный 1
        if (activeTabId === 1) {
          return [1, ...[checkbox.id], ...prevFilter.filter(item => item !== 1)];
        }
        return [...[checkbox.id], ...prevFilter];

      })
    } else {
      setFilter(prevFilter => ([...prevFilter.filter(item => item !== checkbox.id)]));
    }
  };


  const handleModalOpen = (progId) => {
    setSelectedProgId(progId);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    document.body.removeAttribute('style');

    const professionsSliderLanding = document.querySelector('._professions-slider');
    const headerLanding = document.querySelector('header');
    if (professionsSliderLanding !== null && headerLanding !==null) {
      professionsSliderLanding.style.zIndex = '10';
      headerLanding.style.zIndex = '10';
    }

    const searchInputMain = document.querySelector('.header__search-from input'); //1
    const searchButtonMain = document.querySelector('.header__search-from button'); //2
    const menuMain = document.querySelector('.menu'); //1
    if (searchInputMain !== null && searchButtonMain !==null && menuMain !==null) {
      searchInputMain.style.zIndex = '1';
      searchButtonMain.style.zIndex = '2';
      menuMain.style.zIndex = '1';
    }
  };

  const onAfterModalOpen = () => {
    document.body.style.overflow = 'hidden';

    const professionsSliderLanding = document.querySelector('._professions-slider');
    const headerLanding = document.querySelector('header');
    if (professionsSliderLanding !== null && headerLanding !==null) {
      professionsSliderLanding.style.zIndex = '-1';
      headerLanding.style.zIndex = '-1';
    }

    const searchInputMain = document.querySelector('.header__search-from input'); //1
    const searchButtonMain = document.querySelector('.header__search-from button'); //2
    const menuMain = document.querySelector('.menu'); //1
    if (searchInputMain !== null && searchButtonMain !==null && menuMain !==null) {
      searchInputMain.style.zIndex = '-1';
      searchButtonMain.style.zIndex = '-2';
      menuMain.style.zIndex = '-1';
    }
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
        <div className="col-md-10">
          <ProgList progs={filteredProgs} handleModalOpen={handleModalOpen}/>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="onRequestClose Example"
        onAfterOpen={onAfterModalOpen}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
        portalClassName="detail__modal"
        closeTimeoutMS={500}
        style={
          {
            overlay: {backgroundColor: "rgba(27, 26, 26, 0.8)"},
          }
        }
      >
        <button className='btn-close' onClick={handleModalClose}>&times;</button>
        <NewModalContent selectedProgId = {selectedProgId}/>
      </ReactModal>
    </div>
  )
};

export default Main;
