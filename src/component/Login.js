import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io'
import { PiEyeClosedBold } from 'react-icons/pi'
import { FaSpinner } from 'react-icons/fa'
import { BsEye } from 'react-icons/bs'
import '../style/component.scss'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { handleLoginRedux } from '../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Hãy nhập đủ các trường!')
            return;
        }
        dispatch(handleLoginRedux(email, password))
    }
    const handleGoBack = () => {
        navigate('/')
    }
    const handlePressEnter = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin()
        }
    }
    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }
    }, [account])
    return (
        <div className="container d-flex col-12 col-sm-4 flex-column">
            <div className="text-center fs-3 fw-bold mt-3">Log in</div>
            <div className="pb-1">Email or username (eve.holt@reqres.in)</div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input_login"
                type="text"
                placeholder="Email or username..."
                style={{ width: '100%' }}
            />
            <div style={{ position: 'relative' }}>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input_login"
                    type={showPassword === false ? 'password' : 'text'}
                    placeholder="Password..."
                    style={{ width: '100%' }}
                    onKeyDown={(e) => handlePressEnter(e)}
                />
                <div
                    style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword === false ? <PiEyeClosedBold /> : <BsEye />}
                </div>

            </div>
            <button
                disabled={email && password ? false : true}
                className={email && password ? 'active' : ''}
                onClick={() => handleLogin()}
            >
                Login&nbsp;
                {isLoading && <FaSpinner className='loading' />}
            </button>
            <div className="back_login">
                <IoIosArrowBack />
                <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
            </div>
        </div>
    );
}

export default Login;