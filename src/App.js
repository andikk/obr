import React, { useState, useEffect } from 'react';
import {progs, description} from "./mock";
import {removeDuplicates , CATS, CAT_TYPE, CHECKED_CAT_ID} from "./helper";
import styles from './App.module.css';
import ProgList from "./components/ProgList";
import SubjectsList from "./components/SubjectsList";
import ReactModal from 'react-modal';

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [progDesc, setProgDesc] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [subjects, setActiveSubjects] = useState([]);
  const [activeCatId, setActiveCatId] = useState(1);

  useEffect(() => {
    handleCatButtonClick(1);
    setFilterSubject(prevFilterSubject => [...[CHECKED_CAT_ID], ...prevFilterSubject])
  }, []);

  const handleModalOpen = () => {
    setProgDesc(description);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    document.body.removeAttribute('style');
  };

  const onAfterModalOpen = () => {
    document.body.style.overflow = 'hidden'
  };

  const handleSubjectCheckboxClick = (id, event) => {
    if (event.target.checked) {
      setFilterSubject(prevFilterSubject => [...[id], ...prevFilterSubject])
    } else {
      setFilterSubject(prevFilterSubject => prevFilterSubject.filter((item) => item !== id))
    }
  };

  const handleCatButtonClick = (selectedCatId) => {
    setActiveCatId(selectedCatId);
    const curCatType = CAT_TYPE[selectedCatId];
    const allSubjects = progs.map((prog) => prog[curCatType].map((item) => item))
      .reduce((a, b) => a.concat(b), [])
      .map((item) => ({id: item.id, name: item.name, isActive: false}));
    const subjects = removeDuplicates(allSubjects, "id");
    setActiveSubjects(subjects);

  };

  const progsToShow = progs.filter((prog) => {
    const curCatType = CAT_TYPE[activeCatId];

    let flag = false;
    filterSubject.forEach((item) => {
      if (prog[curCatType].findIndex(subj => subj.id === item) !== -1) {
        flag = true;
      }
    });
    if (flag) return prog;
  });

  return (
    <div className={`container _block01`}>
      <h2>Подбор образовательных программ</h2>
      <div className="row">
        <div className={styles.mb3}>
          {CATS.map((cat) => (
            <button key={cat.id} onClick={() => handleCatButtonClick(cat.id)}
                    className={`btn btn-primary btn-lg ${styles.mr3} ${cat.id === activeCatId ? `active`: ``}`} role="button"
                    type="button">
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <SubjectsList subjects={subjects} activeCatId={activeCatId} handleSubjectCheckboxClick={handleSubjectCheckboxClick}/>
        </div>
        <div className="col-md-9">
          <ProgList progs={progsToShow} handleModalOpen={handleModalOpen}/>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="onRequestClose Example"
        onAfterOpen={onAfterModalOpen}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
        style={
          { overlay: {},
            content: {backgroundColor:"azure", top: "140px", zIndex: "2"}
          }
        }
      >
        <p>{progDesc.name}</p>
        <p>{progDesc.term}</p>
        <p>{progDesc.paidAmount}</p>
        <button onClick={handleModalClose}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default App;
