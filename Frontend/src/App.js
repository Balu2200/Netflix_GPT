import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/body';
import Header from './components/header';

function App() {
  return (
    <div>
       <BrowserRouter><Header/></BrowserRouter>
       <Body/>
    </div>
  );
}

export default App;
