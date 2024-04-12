import './App.css'
import './responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
