import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { mapStateToProps, mapDispatchToProps } from './app/store';

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFrom: '',
      inputTo: "",
      rate: 2
    }
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
  }
  handleChangeTo(event) {
    this.setState({
      inputFrom: +event.target.value * this.state.rate,
      inputTo: event.target.value
    });
  }
  handleChangeFrom(event) {
    this.setState({
      inputFrom: event.target.value,
      inputTo: +event.target.value * this.state.rate
    })
  }


  render() {
    return (
      <div>
        <input
          type="number"
          value={this.state.inputFrom}
          onChange={this.handleChangeFrom} />
        <input
          type="number"
          value={this.state.inputTo}
          onChange={this.handleChangeTo} />
      </div>
    );
  }
};
const App = connect(mapStateToProps, mapDispatchToProps)(Presentational);

export default App;
