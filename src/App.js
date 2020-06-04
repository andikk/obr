import React, {PureComponent } from 'react';
//import {description} from "./mock";
import {removeDuplicates, CATS, CAT_TYPE, CHECKED_CAT_ID} from "./helper";
import styles from './App.module.css';
import ProgList from "./components/ProgList";
import SubjectsList from "./components/SubjectsList";
import ModalContent from "./components/ModalContent";
import ReactModal from 'react-modal';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progs: [],
      subjects: [],
      isLoadingProgs: false,
      modalIsOpen: false,
      filterSubject: [],
      activeCatId: 1,
      error: ''
    };
    this.handleCatButtonClick = this.handleCatButtonClick.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.onAfterModalOpen = this.onAfterModalOpen.bind(this);
    this.handleSubjectCheckboxClick = this.handleSubjectCheckboxClick.bind(this);
    this.handleCatButtonClick = this.handleCatButtonClick.bind(this);
  }


  componentDidMount() {
    this.setState({isLoadingProgs: true});
    const API = 'http://localhost:3000/progs.json';

    fetch(API, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState((prevState) => ({progs: data, filterSubject: [...[CHECKED_CAT_ID], ...prevState.filterSubject], isLoadingProgs: false}));
        this.handleCatButtonClick(1);
      })
      .catch(error => {console.log(error);  this.setState({ error, isLoadingProgs: false })});
  }

  handleModalOpen = () => {
    this.setState({modalIsOpen: true});
  };

  handleModalClose = () => {
    this.setState({modalIsOpen: false});
    document.body.removeAttribute('style');
  };

  onAfterModalOpen = () => {
    document.body.style.overflow = 'hidden';
  };

  handleSubjectCheckboxClick = (subject, event) => {
    if (subject.name === 'Русский язык') return;
    const curSubjects = [...this.state.subjects];

    const foundIndex = curSubjects.indexOf(subject);
    curSubjects[foundIndex] = {id: subject.id, name: subject.name, isActive: !subject.isActive};
    this.setState({subjects: curSubjects});

    if (event.target.checked) {
      this.setState((prevState) => ({
        filterSubject: [...[subject.id], ...prevState.filterSubject]
      }))
     } else {
      this.setState((prevState) => ({
        filterSubject: prevState.filterSubject.filter((item) => item !== subject.id)
      }))
     }
  };

  handleCatButtonClick = (selectedCatId) => {
    this.setState({activeCatId: selectedCatId });

    const curCatType = CAT_TYPE[selectedCatId];
    console.log(this.state.progs);
    const allSubjects = this.state.progs.map((prog) => prog[curCatType].map((item) => item))
      .reduce((a, b) => a.concat(b), [])
      .map((item) => ({id: item.id, name: item.name, isActive: false}));
    const subjects = removeDuplicates(allSubjects, "id");

    this.setState({subjects: subjects, filterSubject: []});

    if (selectedCatId === 1) {
      this.setState((prevState) => ({filterSubject: [...[CHECKED_CAT_ID], ...prevState.filterSubject]}))
    }

  };


  render() {
    const {progs, filterSubject, activeCatId, subjects, modalIsOpen, progDesc, error, isLoadingProgs} = this.state;

    if (error) {
      return <p  style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Ошибка загрузки данных. Описание ошибки: {error.message}</p>;
    }

    if (isLoadingProgs) {
      return <p style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Загрузка данных ...</p>;
    }

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
              <button key={cat.id} onClick={() => this.handleCatButtonClick(cat.id)}
                      className={`btn btn-primary btn-lg ${styles.mr3} ${cat.id === activeCatId ? `active`: ``}`} role="button"
                      type="button">
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <SubjectsList subjects={subjects} activeCatId={activeCatId} handleSubjectCheckboxClick={this.handleSubjectCheckboxClick}/>
          </div>
          <div className="col-md-9">
            <ProgList progs={progsToShow} handleModalOpen={this.handleModalOpen}/>
          </div>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          contentLabel="onRequestClose Example"
          onAfterOpen={this.onAfterModalOpen}
          onRequestClose={this.handleModalClose}
          ariaHideApp={false}
          style={
            { overlay: {},
              content: {backgroundColor:"azure", top: "140px", zIndex: "2"}
            }
          }
        >
          <ModalContent porogDesc={progDesc}/>
          <button onClick={this.handleModalClose}>Close Modal</button>
        </ReactModal>
      </div>
    )
  }
}

export default App;
