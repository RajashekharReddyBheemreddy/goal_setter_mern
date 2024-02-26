import {FaSignInAlt, FaUser, FaSignOutAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const onLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return(
        <header className='header'>
            <div className="logo">
                <Link to={'/'}>Goal Setter</Link>
            </div>
            <ul>
                {user ? (
                <>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
                </>
                ) : (
                <>
                <li>
                    <Link to='/login'><FaSignInAlt /> Login</Link>
                </li>
                <li>
                    <Link to='/register'><FaUser /> Register</Link>
                </li>
                </>)}
                
            </ul>
        </header>
    )
}