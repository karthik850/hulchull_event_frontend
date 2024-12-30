import HomePageCorousel from "./HomePageCorousel";
import NavBar from "./NavBar";
import HighLights from "./Highlights";
import SecretGame from "./Secretgame/SecretGame";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import LoginPage from "./Secretgame/LoginPage";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <NavBar setRefresh={() => setRefresh(!refresh)} refresh={refresh} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePageCorousel />
              <div className="container-fluid main-section">
                <Alert
                  className="imp-person-header text-center fw-bold d-flex align-items-center p-0 justify-content-center fs-6"
                  key="dark"
                  variant="secondary"
                >
                  Important Persons
                </Alert>
                <HighLights />
                <br />
                <SecretGame
                  setRefresh={() => setRefresh(!refresh)}
                  refresh={refresh}
                />
              </div>
              
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage setRefresh={() => setRefresh(!refresh)}/>} />
      </Routes>
    </>
  );
};

export default HomePage;
