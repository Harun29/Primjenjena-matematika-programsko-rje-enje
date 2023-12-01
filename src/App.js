import './App.css';
import PolovljenjeIntervala from './projects/polovljenjeIntervala';
import MetodaRegulaFalsi from './projects/metodaRegulaFalsi';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator></Calculator>
        <PolovljenjeIntervala></PolovljenjeIntervala>
        <MetodaRegulaFalsi></MetodaRegulaFalsi>
      </header>
    </div>
  );
}

export default App;
