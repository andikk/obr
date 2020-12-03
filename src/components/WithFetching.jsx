import React, {PureComponent} from "react";

const withFetching = (Component) => {
  class WithFetching extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
        isLoading: false,
        error: null,
      };
    }

    componentDidMount() {

      this.setState({isLoading: true});

      fetch(this.props.url)
        .then(response => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Ошибка загрузки данных ...');
          }
        })
        .then(data => {
          this.setState({data: data.data, isLoading: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({error, isLoading: false})
        });
    }

    render() {
      return <Component {...this.props} isLoading={this.state.isLoading} data={this.state.data} error={this.state.error}/>;
    }
  }
  return WithFetching;
};

export default withFetching;
