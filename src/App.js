import React, { useState, useEffect } from 'react';
import {progs, description} from "./mock";
import {removeDuplicates, mergeArrayObjects, CATS, CAT_TYPE, CHECKED_CAT_ID} from "./helper";
import styles from './App.module.css';
import ProgList from "./components/ProgList";
import SubjectsList from "./components/SubjectsList";
import ReactModal from 'react-modal';

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [progDesc, setProgDesc] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [mappedSubjects, setMappedSubjects] = useState([]);
  const [subjectsIds, setSubjectsIds] = useState([]);
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

  const handleSubjectCheckboxClick = (subject, event) => {
    if (event.target.checked) {
      setFilterSubject(prevFilterSubject => [...[subject.id], ...prevFilterSubject])
    } else {
      setFilterSubject(prevFilterSubject => prevFilterSubject.filter((item) => item !== subject.id))
    }

    setMappedSubjects(Object.assign({}, mappedSubjects, {[subject.id]: {id: subject.id, name: subject.name, isActive: event.target.value}}));

    const updatedSubjects = subjectsIds.map(id => mappedSubjects[id]);
    setSubjects(updatedSubjects);

    console.log(updatedSubjects);

  };

  const handleCatButtonClick = (selectedCatId) => {
    setActiveCatId(selectedCatId);
    const curCatType = CAT_TYPE[selectedCatId];
    const allSubjects = progs.map((prog) => prog[curCatType].map((item) => item))
      .reduce((a, b) => a.concat(b), [])
      .map((item) => ({id: item.id, name: item.name, isActive: false}));
    const subjects = removeDuplicates(allSubjects, "id");
    setSubjects(subjects);

    setSubjectsIds(subjects.map(item => item.id));

    const subjectsMapped = subjects.reduce((out, subject) => {
      out[subject.id] = subject;
      return out;
    }, {});

    setMappedSubjects(subjectsMapped);

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
