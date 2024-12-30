import HomePageCorousel from "./HomePageCorousel";
import NavBar from "./NavBar";
import HighLights from "./Highlights";
import SecretGame from "./Secretgame/SecretGame";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import TeamsInfo from "./Teams/TeamsInfo";
import EventsInfo from "./Teams/EventsInfo";

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
        <Route path="/teamsinfo" element={<TeamsInfo />} />
        <Route path="/eventsinfo" element={<EventsInfo />} />
      </Routes>
    </>
  );
};

export default HomePage;
