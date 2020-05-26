import React, { useState } from 'react';
import {progs} from "./mock";
import ProgList from "./components/ProgList";
import SubjectsList from "./components/SubjectsList";
import ReactModal from 'react-modal';


const App = () => {
  const removeDuplicates = (originalArray, prop) => {
    let newArray = [];
    let lookupObject  = {};

    for (let i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (let i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  };

  const [filterSubject, setFilterSubject] = useState([]);

  const allSubjects = progs.map((prog) => prog.subjects.map((item) => item))
                      .reduce((a, b) => a.concat(b), []);

  const subjects = removeDuplicates(allSubjects, "id");

  const handleSubjectChange = (id, event) => {
    if (event.target.checked) {
      setFilterSubject(prevFilterSubject => [...[id], ...prevFilterSubject])
    } else {
      setFilterSubject(prevFilterSubject => prevFilterSubject.filter((item) => item !== id))
    }
  };


  const filteredProgs = progs.filter((prog) => {
    let flag = false;

    filterSubject.forEach((item) => {

      if (prog.subjects.findIndex(subj => subj.id === item) !== -1) {
        flag = true;
        return;
      }
    });
    if (flag) return prog;
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <p>Выберите предметы</p>
          <SubjectsList subjects={subjects} handleSubjectChange={handleSubjectChange}/>
        </div>
        <div className="col-md-8">
          <ProgList progs={filteredProgs} handleModalOpen={handleModalOpen}/>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={handleModalClose}
      >
        <p>Modal text!</p>
        <button onClick={handleModalClose}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default App;
