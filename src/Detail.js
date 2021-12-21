import React, {useEffect, useState, useContext } from 'react';
import { useHistory,useParams } from 'react-router';
import styled from 'styled-components';
import './Detail.scss';
import {stockcontext} from './App.js';
import { Navbar,Nav,NavDropdown,Button,Container } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

// let box = styled.div`
//   padding-top : 30px;
// `;
// let title = styled.h4`
//   font-size : 25px; 
//   color : ${ props => props => props.색상 }
// `;




// class Detail2 extends React.Component {

//   componentDidMount(){

//   }

//   componentWillUnmount(){
    
//   }

// }



function Detail(props) {

  let [alert, setAlert] = useState(true);
  let [inputData, setInputData] = useState('');

  let [tab, setTab] = useState(0);
  let [button, setButton] = useState(false);

  let stock = useContext(stockcontext);


  useEffect(()=>{
    let timer = setTimeout(()=>{ setAlert(false) }, 2000);
    console.log('안녕');
    return ()=>{ clearTimeout(timer) }
  },[]);

  
  
  let { id } = useParams();
  let history = useHistory();
  let findProduct = props.shoes.find(function(product) {
    return product.id == id
  })

  return (
    <div className="container">

      {
        alert === true
        ? (<div className="my-alert2">
            <p>stock가 얼마 남지 않았습니다.</p>
          </div>)
        : null
      }
      

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{ findProduct.title }</h4>
          <p>{ findProduct.content }</p>
          <p>{ findProduct.price }</p>

          <Info stock={props.stock}></Info>

          <button className="btn btn-danger" onClick={ ()=> { 
           
            props.setStock([9,11,12]);
            props.dispatch({type : '항목추가', data : {id:findProduct.id, name:findProduct.title, quan : 1} });
            history.push('/cart');
            
            }}>주문하기</button>

          <button className="btn btn-danger" onClick={()=>{
            history.push('/');
          }}>뒤로가기</button>  
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{ setButton(false); setTab(0) }}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ setButton(false); setTab(1) }}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={button} classNames="wow" timeout={500}>
        <TabContent tab={tab} setButton={setButton}/>
      </CSSTransition>
    </div> 
  )
}

function TabContent(props) {

  useEffect(()=>{
    props.setButton(true);
  })
  
  if (props.tab === 0) {
    return <div>0번째 내용입니다</div>
  }else if (props.tab === 1){
    return <div>1번째 내용입니다</div>
  }else if (props.tab === 2){
    return <div>2번째 내용입니다</div>
  }


}

function Info(props){
  return (
    <p>stock : { props.stock[0] } </p>
  )
}

function stateProps(state) {
  return {
    state : state.reducer,
    openAlert : state.reducer2
  }
}

export default connect(stateProps)(Detail)

