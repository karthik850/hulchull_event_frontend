import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

function NavBar(props) {
  const [islogged, setIsLogged] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [user, setUser] = useState();
  const [expanded, setExpanded] = useState(false); // State to manage navbar toggle
  const navigate = useNavigate();
  const location = useLocation();
  const [fromAdminPage,setAdminPage] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const user = sessionStorage.getItem("username");
    if (token && user) {
      setIsLogged(true);
      setUser(user);
      setIsAdmin(sessionStorage.getItem("isAdmin"))
    }
    if (fromAdminPage) {
      // Scroll to the element with ID 'login'
      // const loginElement = document.getElementById('login');
      // if (loginElement) {
      //   loginElement.scrollIntoView({ behavior: 'smooth' });
      // }
      // setAdminPage(false)
    }
  }, [props.refresh,]);

  const handleLogOut = async () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    setIsLogged(false);
    setUser("");
    props.setRefresh();
    navigate('/');
    // Add your logout API call here
    const response = await fetch(API_ENDPOINT+'api/hulchullapp/logout/', {
      method: 'POST',
      headers: {
        'Authorization': 'Token '+sessionStorage.getItem("authToken")
      },
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    
    props.setRefresh()
  };

  const handleScroll = (id) => {
    
    const isAdminPage = location.pathname === '/admin';
    const isEventPage = location.pathname === '/eventinfo';
    const isTeamsPage = location.pathname === '/teaminfo';
    if(isAdminPage || isEventPage || isTeamsPage){
      // setAdminPage(true)
      console.log("twtery")
      navigate('/');
    }
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100, // Adjust for navbar height
        behavior: "smooth",
      });
      setExpanded(false); // Collapse the navbar
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="sticky-top fw-bold navbar-custom"
      expanded={expanded} // Controlled by state
      onToggle={(isOpen) => setExpanded(isOpen)} // Sync toggle state
    >
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          </Nav>
          <Nav>
          <Link to="/eventsinfo" onClick={()=>setExpanded(false)} className="fs-5 nav-link">Events</Link>
          <Link to="/teamsinfo" onClick={()=>setExpanded(false)} className="fs-5 nav-link">Teams</Link>
            {islogged ? (
              <>
                <Nav.Link href="#profile" className="fs-5">{user}</Nav.Link>
                {isAdmin ==="true" && <Link to="/admin" onClick={()=>setExpanded(false)} className="fs-5 nav-link">Admin panel</Link>}
                <Nav.Link onClick={handleLogOut} href="#logout" className="fs-5">
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                onClick={() => handleScroll("login")}
                className="fs-5"
                id="login-nav"
              >
                Login
              </Nav.Link>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
