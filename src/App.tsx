import './App.css';
import { Route, Routes } from 'react-router-dom';
import FormFirstScreen from './screens/FormFirstScreen';
import FormSecondScreen from './screens/LoginScreen/FormSecondScreen';
import MapsScreen from './screens/MapsScreen/MapsScreen';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/firstForm" element={<FormFirstScreen />} />
          <Route path="/" element={<FormSecondScreen />} />
          <Route path="/maps" element={<MapsScreen />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
