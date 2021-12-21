import React, {useContext, useState} from 'react';
import { Navbar,Nav,NavDropdown,Button,Container } from 'react-bootstrap';
import './App.css';
import Data from './data';
import Detail from './Detail'
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Cart from './Cart';

export let stockcontext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10,11,12]);

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/"> Home </Nav.Link>
              <Nav.Link as={Link} to="/detail"> Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
      
      <Route exact path="/">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>20% Season OFF</h1>      
            <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile-first projects on the web.</p>
            <button type="button" class="btn btn-dark">더 알아보기</button>
          </div>
        </div>

        <div className="container">

          <stockcontext.Provider value={stock}>

          <div className="row">

            {
              shoes.map((a, i)=>{
                return <Card shoes={ shoes[i] } i={i} key={i}/>
              })
            }
            
          </div>

            </stockcontext.Provider>

          <button className="btn btn-primary" onClick={()=>{ 


            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{

              console.log(result.data);
              setShoes( [...shoes, ...result.data] );

            })
            .catch(()=>{
              console.log('실패');
            }) 

           }}>더보기</button>
        </div>
      </Route>

            

      

      <Route path="/detail/:id">

        <stockcontext.Provider value={stock}>
          <Detail shoes={shoes} stock={stock} setStock={setStock}/>
        </stockcontext.Provider>

      </Route>

      <Route path="/cart">
        <Cart/>
      </Route>



      <Route path="/:id">
        <div>아무거나 적었을때 이거 보여주셈</div>
      </Route>
      

      </Switch>

    </div>

  
  );
}





function Card(props) {

  let stock = useContext(stockcontext);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id) }}>
        <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="100%" />
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.content } & { props.shoes.price }</p>
        <Test></Test>


    </div>
  )
}

function Test() {
  let stock = useContext(stockcontext);
  return <p>{stock[0]}</p>
}

export default App;
