import React, {PureComponent} from 'react';
import styles from '../App.module.css';

class ModalContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingContent: false,
      progDesc: {},
      error: ''
    };
  }

  componentDidMount() {
    this.setState({isLoadingContent: true});
    const API = 'http://localhost:3000/description.json';

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
        this.setState({progDesc: data, isLoadingContent: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, isLoadingContent: false })
      });
  }

  render() {
    const {progDesc, error, isLoadingContent} = this.state;

    if (error) {
      return <p  style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Ошибка загрузки данных. Описание ошибки: {error.message}</p>;
    }

    if (isLoadingContent) {
      return <p style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Загрузка данных ...</p>;
    }

    return (
      <div>
        <p>{progDesc.name}</p>
        <p>{progDesc.term}</p>
        <p>{progDesc.paidAmount}</p>
      </div>)
    }
}

export default ModalContent;
