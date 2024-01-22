import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './styling/App.css';
import Header from './components/Header'
import Main from './pages/Main'
import StudySet from "./pages/StudySet";
import './styling/App.css'

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path='/' exact element={<Main />}/>
          <Route path='/set/:id' element={<StudySet />}/>
        </Routes>

      </div>
    </Router>

  );
}

export default App;
