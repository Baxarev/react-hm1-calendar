import './App.css';
import Calendar from './Calendar';

const now = new Date(2020, 5, 22);

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
