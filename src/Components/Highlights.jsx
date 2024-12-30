import { useEffect } from "react";
import useFetch from "./fetch";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  API_ENDPOINT,
  UNABLE_TO_RETRIEVE_API_RESPONSE,
} from "../../utils/Constants";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const HighLights = () => {
  const {
    data: highlights,
    isLoading: loading,
    error: error,
    fetchData: getHighlights,
  } = useFetch();
  let urls = [
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    "https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14223.jpg",
    "https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14000.jpg",
    "https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14223.jpg",
    "https://img.freepik.com/premium-vector/charming-hand-drawn-storefront-illustration_705090-10425.jpg?semt=ais_hybrid",
  ];
  let femaleUrls = [
    "https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14213.jpg",
    "https://img.freepik.com/premium-vector/confused-woman-cartoon-vector_844724-19867.jpg",
    "https://img.freepik.com/premium-photo/child-with-glasses-hat-is-celebrating-her-birthday-cartoon-illustration-with-generative-ai_126712-3180.jpg",
  ];
  useEffect(() => {
    getHighlights(API_ENDPOINT + "api/eventapp/get-important-persons/", false);
  }, []);

  const getMaleRandomImageUrl = () => {
    if (urls.length === 0) return null; // Handle empty list
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  };

  const getFemaleRandomImageUrl = () => {
    if (femaleUrls.length === 0) return null; // Handle empty list
    const randomIndex = Math.floor(Math.random() * femaleUrls.length);
    return femaleUrls[randomIndex];
  };

  const imageUrl = (impPerson) => {
    if (impPerson.image_url) {
      return impPerson.image_url;
    }
    if (impPerson.gender == "F") {
      return getFemaleRandomImageUrl();
    }
    return getMaleRandomImageUrl();
  };
  return (
    <Container>
      {loading && (
        <Alert key="loading" variant="danger" className="align-center d-flex align-items-center">
          {" "}
          <Spinner animation="border" role="status" >
            <span className="visually-hidden align-center">Loading...</span>
          </Spinner>
        </Alert>
      )}
      {error && (
        <Alert key="retrieveerror" variant="danger">
          {UNABLE_TO_RETRIEVE_API_RESPONSE}
        </Alert>
      )}
      <Row xs={2} md={4} className="g-2">
        {highlights &&
          highlights.map((impPerson, index) => {
            return (
              <Col key={index}>
                {" "}
                <Card className="imp-person-container">
                  <Card.Img
                    className="important-person-profile"
                    variant="top"
                    src={imageUrl(impPerson)}
                  />
                  <Card.Body>
                    <Card.Title className="h6 fw-bold imp-person-name">
                      {impPerson.name}
                    </Card.Title>
                    <Card.Text className="imp-person-description">
                      {impPerson.description}
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default HighLights;
