import './App.css';
import { useEffect } from 'react';
import Header from './component/Header';
import { ToastContainer } from 'react-toastify';
import PublicRoutes from './routes/PublicRoutes';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleRefresh())
    }
  }, [])
  return (
    <>
      <div className="app_container">
        <Header />
        <PublicRoutes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
