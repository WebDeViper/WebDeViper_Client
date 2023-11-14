import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './components/layout';
import TestPage from './pages/Test/TestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;
