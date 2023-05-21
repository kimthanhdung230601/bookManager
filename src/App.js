
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import LogIn from './component/LogIn';
import ListView from './component/ListView';
import BookView from './component/bookView';
import {Routes,Route} from 'react-router'
import BookView_copy from './component/bookView_copy';
import { useEffect } from 'react';
function App() {
  
  return (
      <div>
        
        <Routes>
          <Route path="/logIn" element ={<LogIn/>} />
          <Route path="/" element ={<ListView/>} />
          <Route path="/bookView/:id" element ={<BookView_copy/>} />
        </Routes>
        {/* <ListView/> */}
      </div>
  );
}

export default App;
