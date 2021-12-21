import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let initialAlert = true;

function reducer2(state = initialAlert, action) {
  if (action.type === 'closeAlert'){
    state = false;
    return state;
  } else {
    return state
  }

}


//redux에서 state 만들기
let initialValue = [
  { id : 0, name : '멋진신발', quan : 2 },
  { id : 1, name : '멋진신발2', quan : 1 }
];

//reducer안에 넣기
function reducer(state = initialValue, action) {
  if (action.type === '항목추가') {

    let found = state.findIndex((a)=>{ return a.id === action.data.id });

    if (found >= 0 ){

      let copy = [...state];
      copy[found].quan++;
      return copy

    } else {
      let copy = [...state];
      copy.push(action.data);
      return copy
    }

   

  }else if ( action.type === '수량증가' ){

    let copy = [...state];
    copy[action.data].quan++;
    return copy

  } else if (action.type === '수량감소') {
    
    let copy = [...state];
    copy[action.data].quan--;
    return copy

  } else {
    return state
  }
    
}

let store = createStore(combineReducers({reducer,reducer2}));



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
