import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.contexts';
import './navigation.styles.scss';
import {signOutUser} from '../../utilities/firebase/firebase.utilities';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    console.log('This is the current user', currentUser)

    return (
      <Fragment> 
        <div className = 'navigation'>
            <Link className = 'logo-container' to='/'>
                <CrwnLogo className= 'logo' />
            </Link>
          <div className ='nav-links-container'>
            <Link className = 'nav-link' to='/shop'>
                SHOP
            </Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutUser}>
                  {''}
                  SIGN OUT{''}
                  </span>
              ):(
                <Link className = 'nav-link' to='/auth'>
                    SIGN IN
                </Link>
            )}
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
};

export default Navigation;