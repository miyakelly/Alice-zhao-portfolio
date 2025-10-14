import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/');
    // Wait for navigation to complete, then scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Portfolio</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/#work" className="nav-link">Work</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={handleContactClick} className="nav-link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
