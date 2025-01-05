import React, { useEffect } from "react";
import useFetch from "./fetch";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "./importantperson.css";
import { API_ENDPOINT } from "../../utils/Constants";

const ImportantPersons = () => {
  const {
    data: highlights,
    isLoading: loading,
    error: error,
    fetchData: getHighlights,
  } = useFetch();

  useEffect(() => {
    getHighlights(API_ENDPOINT + "api/eventapp/get-important-persons/", false);
  }, []);

  return (
    <Container>
      {loading && (
        <Alert
          key="loading"
          variant="danger"
          className="align-center d-flex align-items-center"
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden align-center">Loading...</span>
          </Spinner>
        </Alert>
      )}
      {error && (
        <Alert key="retrieveerror" variant="danger">
          {UNABLE_TO_RETRIEVE_API_RESPONSE}
        </Alert>
      )}
      <div className="futuristic-name-container">
        {highlights &&
          highlights.map((impPerson, index) => (
            <div key={index} className="futuristic-badge">
              <div className="futuristic-content">
                <div className="futuristic-time-icon"></div>
                <span>{impPerson.name}</span>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default ImportantPersons;
