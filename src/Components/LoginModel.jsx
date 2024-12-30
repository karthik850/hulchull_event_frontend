import Container from "react-bootstrap/Container";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { API_ENDPOINT, LOGIN_ERROR } from "../../utils/Constants";
import Spinner from "react-bootstrap/Spinner";

const LoginModel = (props) => {
  const [islogged, setIsLogged] = useState(false);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(props.isOpen);
  const [error, setError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);
    const userData = {
      username: event.target[0].value, // replace with actual username
      password: event.target[1].value, // replace with actual password
    };

    try {
      const response = await fetch(API_ENDPOINT + "api/hulchullapp/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if(response.status=="400"){
          setError(LOGIN_ERROR);
        }
        else{
          setError("We are facing some issues please try again Later")
        }
        setFormSubmitting(false);
        setTimeout(() => {
          setError();
        }, 3000);
        // throw new Error("Invalid credentials");
      }

      const data = await response.json();

      if (data.token) {
        // Store the token in sessionStorage
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("isAdmin",data.isadmin);
        setIsLogged(true);
        setUser(data.username);
        setFormSubmitting(false);
        setError();
        setOpen(false);
        props.handleSubmit(data.token, data.username);

        // Optionally, redirect to a protected route
      }
    } catch (error) {
      // setError("We are facing Some issue please try again later")
      setFormSubmitting(false);
    }
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <>
        {/* <ShowAlert /> */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Login </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && (
              <Alert key="loginerror" variant="danger">
                "please check your credentials
              </Alert>
            )}
            Please Login with Your Provided Username
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <>
      {/* <ShowAlert /> */}
      {/* <MyVerticallyCenteredModal
        show={props.isOpen}
        onHide={() => props.onClose()}
      /> */}

      <Container id="login">
        {error && (
          <Alert key="loginerror" variant="danger">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" placeholder="username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="password" />
          </Form.Group>

          <Button type="submit" key="submitbutton">
            {formSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Submitting...{" "}
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default LoginModel;
