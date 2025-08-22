import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { MainDashboard } from './pages/MainDashboard';
import { MyTask } from './pages/MyTask';
import { TaskCategories } from './pages/TaskCategories';
import './scss/main.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/task" element={<MyTask />} />
            <Route path="/categories" element={<TaskCategories />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
