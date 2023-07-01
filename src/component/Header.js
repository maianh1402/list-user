import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { PiUserSwitch } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLogoutRedux } from '../redux/actions/userAction';
import { useEffect } from 'react';

const Header = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.account)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(handleLogoutRedux());
    }
    useEffect(() => {
        if (user && user.auth === false) {
            navigate('/')
            toast.success('Đăng xuất thành công!')
        }
    }, [user])
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <PiUserSwitch />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto">
                                <NavLink to='/' className='nav-link'>Home</NavLink>
                                <NavLink to='/users' className='nav-link'>Users</NavLink>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Setting">
                                    {user && user.auth === true
                                        ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                        : <NavLink to='/login' className='dropdown-item'>Login</NavLink>
                                    }
                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;