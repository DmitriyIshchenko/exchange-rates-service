import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";

import "../../styles/Navbar.css"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return <nav className='navbar'>
        <div className='nav-header'>
            <Link to="/" className='nav-title'> Сurrency converter
            </Link>
            <button
                className='nav-btn'
                onClick={() => setIsOpen(!isOpen)}>
                <FaAlignRight className='nav-icon' />
            </button>
        </div>
        <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
            <li>
                <Link to="/" onClick={() => setIsOpen(!isOpen)}>Exchanger</Link>
            </li>
            <li>
                <Link to="/rates" onClick={() => setIsOpen(!isOpen)}>Rates</Link>
            </li>
        </ul>
    </nav>;
}
