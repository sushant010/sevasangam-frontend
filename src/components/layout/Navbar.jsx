import { Link, useNavigate } from 'react-router-dom'
import img from './../../assets/images/sevasangam-logo.png'
import SearchBar from '../searchBar/SearchBar'
import { useAuth } from '../../context/Auth'
import { useEffect, useRef } from 'react'


const Navbar = () => {

  const [auth] = useAuth();

  const toggleNavButton = useRef(null);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    const buttonElement = toggleNavButton.current;
    if (!buttonElement.classList.contains('active')) {
      buttonElement.classList.add('active');
    } else {
      // If it's already active, remove the 'active' class
      buttonElement.classList.remove('active');
    }

  }



  const logout = () => {

    localStorage.removeItem('auth')
    localStorage.removeItem('tokenExpiration');
    window.location.reload()
    navigate('/')

  }


  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        // Token is expired, log the user out
        logout();
      } else {
        // Token is still valid, set a timeout to log out the user when it expires
        setTimeout(logout, expirationTime - currentTime);
      }
    }
  };

  useEffect(() => {

    checkTokenExpiration();

  }, []);



  return (



    <div className="nav-wrapper">
      <nav>
        <div className="toggle-navbar" ref={toggleNavButton}>
          <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/">Home</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
            <Link to="/about">About Us</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/temples' ? 'active' : ''}`}>
            <Link to="/temples">Temples</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
            <Link to="/contact">Contact Us</Link>
          </div>

        </div>
        <div className="nav-left">
          <div className="logo-container">
            <Link to="/">       <img src={img}></img></Link>

          </div>
          <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/">Home</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/temples' ? 'active' : ''}`}>
            <Link to="/temples">Temples</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
            <Link to="/about">About </Link>
          </div>

          <div className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="nav-right">
          <div className="toggle-nav">
            <button onClick={toggleNavbar}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          <div className="nav-item">
            <SearchBar />
          </div>
          <div className="nav-item">

            <Link to="/temples" className="btn btn-theme-primary">Donate</Link>
          </div>
          <div className="nav-item">
            {auth?.user ? (null) : (<button type="button" className="btn btn-theme-primary" data-bs-toggle="modal" data-bs-target="#loginBackdrop">
              Sign Up / Login
            </button>)}


          </div>

          {auth?.user ? (

            <div className="nav-item dropup-center dropup" type="button" >
              <button data-bs-toggle="dropdown" aria-expanded="false">
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "8px" }} className='avatar-wrapper'>
                    <img src={auth.user.avatar ? auth.user.avatar : "https://i.pinimg.com/1200x/49/da/b2/49dab2d4d9be840f6aae7d575353cb48.jpg"} alt='avatar' />
                  </div>
                  <span><small>{(auth.user.name).toUpperCase()}</small></span>
                </div>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/update-profile">
                    Profile
                  </Link>
                </li>
                {auth.user.role === 1 ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/admin/temples">
                        All Temples
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/add-temple">
                        Add Temple
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/donations">
                        All Donations
                      </Link>
                    </li>

                  </>
                ) : auth.user.role === 2 ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/temples">
                        Temples
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/add-temple">
                        Add New Temple
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/superadmin/temple-listers">
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/donations">
                        Donations
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/unverified-temples">
                        Unverified Temples
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/trending-temples">
                        Trending Temples
                      </Link>
                    </li>

                  </>
                ) : (
                  // Default case, assuming auth.user.role === 0 
                  <>

                    <li>
                      <Link className="dropdown-item" to="/user/donations">
                        Past Donations
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" to="/view-update-temples">
                        80G Certificates
                      </Link>
                    </li> */}
                  </>
                )}
                <li className='logout'>

                  <span onClick={logout}><i className=" fa-solid fa-right-from-bracket"></i> Logout</span>

                </li>
              </ul>


            </div>

          ) : null
          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar