import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar(props) {
  const [islogged, setIsLogged] = useState(false);
  const [user, setUser] = useState();
  const [expanded, setExpanded] = useState(false); // State to manage navbar toggle

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const user = sessionStorage.getItem("username");
    if (token && user) {
      setIsLogged(true);
      setUser(user);
    }
  }, [props.refresh]);

  const handleLogOut = async () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    setIsLogged(false);
    setUser("");
    props.setRefresh();
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
            {islogged ? (
              <>
                <Nav.Link href="#profile" className="fs-5">{user}</Nav.Link>
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
