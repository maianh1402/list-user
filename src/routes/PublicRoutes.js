import { Routes, Route } from 'react-router-dom';
import Home from '../component/Home';
import Login from '../component/Login';
import TableUser from '../component/TableUser';
import PrivateRoutes from './PrivateRoutes';
import NotFound from './NotFound';

const PublicRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/users'
                    element={
                        <PrivateRoutes>
                            <TableUser />
                        </PrivateRoutes>
                    }
                />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </>
    );
}

export default PublicRoutes;