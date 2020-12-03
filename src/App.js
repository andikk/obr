import React, {PureComponent } from 'react';
import {removeDuplicates, CATS, CAT_TYPE, APP_URL} from "./helper";
import ProgList from "./components/ProgList";
import SubjectsList from "./components/SubjectsList";
import ReactModal from 'react-modal';
import NewModalContent from "./components/NewModalContent.jsx";
import withFetching from "./components/WithFetching";
import Spinner from "./components/Spinner";


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      isLoadingProgs: false,
      modalIsOpen: false,
      filterSubject: [],
      activeCatId: 1,
      error: null,
      activeProgId: null,
    };
    this.handleCatButtonClick = this.handleCatButtonClick.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.onAfterModalOpen = this.onAfterModalOpen.bind(this);
    this.handleSubjectCheckboxClick = this.handleSubjectCheckboxClick.bind(this);
    this.handleCatButtonClick = this.handleCatButtonClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.handleCatButtonClick(1);
    }
  }

  handleModalOpen = (progId) => {
    this.setState({activeProgId: progId});
    this.setState({modalIsOpen: true});
  };

  handleModalClose = () => {
    this.setState({modalIsOpen: false});
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

  onAfterModalOpen = () => {
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
    const progs = this.props.data;

    this.setState({activeCatId: selectedCatId });

    const curCatType = CAT_TYPE[selectedCatId];

    const allSubjects = progs.map((prog) => prog[curCatType].map((item) => item))
      .reduce((a, b) => a.concat(b), [])
      .map((item) => ({id: item.id, name: item.name, isActive: false}));
    const subjects = removeDuplicates(allSubjects, "id");

    let rus;
    const sortedSubjects = subjects.filter((item) => {
      if (item.name !== 'Русский язык') {
        return item
      } else {
        rus = item;
      }
    });

    if (rus) {
      this.setState({subjects: [rus, ...sortedSubjects], filterSubject: []});
    } else {
      this.setState({subjects: subjects, filterSubject: []});
    }

  };

  render() {

    const {filterSubject, activeCatId, modalIsOpen, subjects, activeProgId} = this.state;

    const error = this.props.error;
    const isLoadingProgs = this.isLoading;
    const progs = this.props.data;

    if (error) {
      return <p style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Ошибка загрузки данных. Описание ошибки: {error.message}</p>;
    }

    if (isLoadingProgs || progs === null) {
      return <Spinner/>
    }

    let progsToShow = progs.filter((prog) => {
      const curCatType = CAT_TYPE[activeCatId];

      let flag = false;
      filterSubject.forEach((item) => {
        if (prog[curCatType].findIndex(subj => subj.id === item) !== -1) {
          flag = true;
        }
      });
      if (flag) return prog;
    });

    const isInFilter = (prog) => {
      const progSubjIds = prog.subjects.map((subj) => subj.id);

      if (filterSubject.length < 2) {
        let flag = false;
        filterSubject.forEach((item) => {
          if (progSubjIds.includes(item)) {
            flag = true;
          }
        });

        if (flag) return true;
      } else {
        if (progSubjIds.length === [...filterSubject, 1].length && progSubjIds.sort().every(function(value, index) { return value === [...filterSubject, 1].sort()[index]})) {
        //if (JSON.stringify(progSubjIds) == JSON.stringify([...filterSubject, 1])) {
          return true
        } else {
          return false
        }
      }
    };

    if (activeCatId === 1) {
      progsToShow = progs.filter(isInFilter);
    }

    return (
      <div className='container _block01'>
        <h2>Подбор образовательных программ</h2>

        <div className='tabs'>
          {CATS.map((cat) => (
            <button key={cat.id} onClick={() => this.handleCatButtonClick(cat.id)}
                    className={`_btn-lnk tabs__btn ${cat.id === activeCatId ? `tabs__btn--active`: ``}`} role="button"
                    type="button">
              {cat.name}
            </button>
          ))}
        </div>

        <div className="row">
          <div className="col-md-2">
            <SubjectsList subjects={subjects} activeCatId={activeCatId} handleSubjectCheckboxClick={this.handleSubjectCheckboxClick}/>
          </div>
          <div className="col-md-10">
            <ProgList progs={progsToShow} handleModalOpen={this.handleModalOpen}/>
          </div>
        </div>

        <ReactModal
          isOpen={modalIsOpen}
          contentLabel="onRequestClose Example"
          onAfterOpen={this.onAfterModalOpen}
          onRequestClose={this.handleModalClose}
          ariaHideApp={false}
          portalClassName="detail__modal"
          closeTimeoutMS={500}
          style={
            { overlay: {backgroundColor: "rgba(27, 26, 26, 0.8)"},
            }
          }
        >
          <button className='btn-close' onClick={this.handleModalClose}>&times;</button>
          <NewModalContent url={APP_URL +'api/prog/' + activeProgId}/>
          {/*<NewModalContent url={APP_URL +'/api?id=' + activeProgId}/>*/}
        </ReactModal>

      </div>
    )
  }
}

export {App}
export default withFetching(App);
