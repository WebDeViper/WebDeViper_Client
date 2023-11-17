import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './components/layout';
import StudyPage from './pages/StudyPage';
import CreateGroupPage from './pages/CreateGroupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/group/create" element={<CreateGroupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
