import './App.css';
import Header from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.css'
import CrudEventos from './components/crudEventos/CrudEventos';

export default function App() {

  return (
    <div className="app-wrapper">
      <Header />
      <CrudEventos />
    </div>
  );
}
