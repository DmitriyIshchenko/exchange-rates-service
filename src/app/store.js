import { createStore } from 'redux';


export const mapStateToProps = (state) => {
  return {

  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};
const defaultState = {};
const reducer = (state = defaultState, action) => {
  switch (action.type) {

    default:
      return state;
  }
}

export const store = createStore(reducer);