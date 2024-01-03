import './App.css';
import { Route, Routes } from 'react-router-dom';
import FormFirstScreen from './screens/FormFirstScreen';
import FormSecondScreen from './screens/LoginScreen/FormSecondScreen';
import MapsScreen from './screens/MapsScreen/MapsScreen';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FormSecondScreen />} />
        <Route path="/firstForm" element={<FormFirstScreen />} />
        <Route path="/maps" element={<MapsScreen />} />
      </Routes>
    </>
  );
}

export default App;
