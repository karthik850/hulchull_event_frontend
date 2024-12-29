import HomePageCorousel from "./HomePageCorousel";
import NavBar from "./NavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import HighLights from "./Highlights";
import SecretGame from "./Secretgame/SecretGame";
import { useState } from "react";
import Footer from "./Footer";
import Alert from 'react-bootstrap/Alert';

const HomePage = () => {
  const [refresh,setRefresh] = useState(false)
  return (
    <>
      <NavBar setRefresh={()=>setRefresh(!refresh)} refresh={refresh}/>
      <HomePageCorousel />
      <div className="container-fluid main-section">
        {/* <br/> */}
        <Alert className="imp-person-header text-center fw-bold d-flex align-items-center p-0 justify-content-center fs-6" key="dark" variant="secondary">
        Important Persons
        </Alert>
        {/* <Card body className="text-center  highlight-upper-layer h6">
          Important Persons
        </Card> */}
        <HighLights />
        {/* <br/>
        <Card body className="text-center">
          Highlights
        </Card>
        <br />
        <HighLights />
        <br/> */}
        <br />

        <SecretGame setRefresh={()=>setRefresh(!refresh)} refresh={refresh} />
        
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
