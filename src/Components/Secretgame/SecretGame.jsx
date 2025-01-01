import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Bubble from "./Bubble/Bubble";
import { useEffect, useState } from "react";
// import LoginModel from "../LoginModel";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const SecretGame = (props) => {
  const [modalShow, setModalShow] = useState(false);
  // const [token, setToken] = useState(sessionStorage.getItem("authToken"));
  const [isLogged, setIsLogged] = useState(false);
  // const [open, setOpen] = useState(false);
  // const { state } = navigate();

  useEffect(() => {
    const sessiontoken = sessionStorage.getItem("authToken");
    if (sessiontoken) {
      // setToken(sessiontoken);
      setIsLogged(true);
    } else {
      // setToken("");
      setIsLogged(false);
    }
  }, [props.refresh]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Bubble />
      </Modal>
    );
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSubmit = (token, username) => {
  //   setIsLogged(true);
  //   setOpen(false);
  //   props.setRefresh();
  // };

  return (
    <>
      <Card className="bg-dark text-white text-center fw-bold" id="login">
        {/* https://www.netmeds.com/images/cms/wysiwyg/blog/2020/12/1608796166_Season_big_1.jpg */}
        {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiRp56ehUts3rR_luctaPGEx7TXd1AH4CiQ&s */}
        <Card.Img
          src="https://cdn.discordapp.com/attachments/1171855379974586432/1323281354850566225/secretsanta.jpeg?ex=6773f14c&is=67729fcc&hm=ec24ea178b51d8e705a25772e5b63c30268d007e263ba811b4de33a3229cb6ff&"
          alt="Card image"
          className="secret-game"
        />
        <Card.ImgOverlay className="upper-layer">
          <div>
            <Card.Title className="fw-bold">
              Let's Play Your Secret Code game
            </Card.Title>
            {!isLogged && (
              <>
                {/* <p> Please Login </p>
                <LoginModel
                  isOpen={open}
                  onClose={handleClose}
                  handleSubmit={handleSubmit}
                /> */}
                <Alert key="logininfo" variant="info">
                  Before we start Please Make Sure You logged in -{" "}
                  <Link to="/login">Login</Link>
                  <br />
                  If you are new please <Link to="/createuser">
                    signup
                  </Link>{" "}
                  here
                </Alert>
              </>
            )}
            {isLogged && (
              <Button variant="primary" onClick={() => setModalShow(true)}>
                Play
              </Button>
            )}
          </div>
        </Card.ImgOverlay>
      </Card>
      {/* <LoginModel
        isOpen={open}
        onClose={handleClose}
        handleSubmit={handleSubmit}
      /> */}

      <br />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SecretGame;
