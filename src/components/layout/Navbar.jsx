import { Link } from 'react-router-dom'
import img from './../../assets/images/sevasangam-logo.jpg'
import Button from './../buttons/Button'
import SearchBar from '../searchBar/SearchBar'


const Navbar = () => {
  return (
    
    <div className="nav-wrapper">
      <nav>
        <div className="nav-left">
          <div className="logo-container">
             <img src={img}></img>
          </div>
          <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/">Home</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
            <Link to="/about">About Us</Link>
          </div>
          <div className="nav-item">
            <Link to="/temples">Temples</Link>
          </div>
          <div className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="nav-right">
         
          <div className="nav-item">
            <SearchBar/>
        </div>
          <div className="nav-item">
            <Button size='medium' type='primary' text='Donate Now'/>
          </div>
          <div className="nav-item">
            <Button size='medium' type='primary' text='Sign Up / Login'/>
          </div>
        </div>
      </nav>
      </div>
  )
}

export default Navbar