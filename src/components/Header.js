import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom';
import './Header.css';

function Header() {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab("Home");
        } else if (location.pathname === "/add") {
            setActiveTab("AddNew");
        } else if (location.pathname === "/about") {
            setActiveTab("About");
        }
    } , [location]);
  return (
    <div className='header'>
        <p className='logo'>Crud App</p>
        <div className='header-right'>
            <Link to='/'>
                <p className={`${activeTab === "Home" ? "active" : ""}`} 
                onClick={() => setActiveTab("Home")}
                >
                    Home
                </p>
            </Link>
            <Link to='/add'>
            <p className={`${activeTab === "AddNew" ? "active" : ""}`} 
                onClick={() => setActiveTab("AddNew")}
                >
                    Add New
                </p>
            </Link>
            <Link to='/about'>
            <p className={`${activeTab === "About" ? "active" : ""}`} 
                onClick={() => setActiveTab("About")}
                >
                    About
                </p>
            </Link>
            <button id='menu-bar'><i class='bx bx-menu'></i></button>
        </div>
    </div>
  )
}

export default Header
