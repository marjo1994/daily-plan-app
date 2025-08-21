import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import './scss/main.scss';
import { MainDashboard } from './pages/MainDashboard';
import { MyTask } from './pages/MyTask';
import { TaskCategories } from './pages/TaskCategories';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/task" element={<MyTask />} />
          <Route path="/categories" element={<TaskCategories />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
