import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Bubble from "./Bubble/Bubble";
import { useEffect, useState } from "react";
import useFetch from "../fetch";
import { useSelector } from "react-redux";
import LoginModel from "../LoginModel";
import { useLocation, useNavigate } from "react-router-dom";

const SecretGame = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("authToken"));
  const [isLogged, setIsLogged] = useState(false);
  const [open, setOpen] = useState(false);
  // const { state } = navigate();

  useEffect(() => {
    const sessiontoken = sessionStorage.getItem("authToken");
    if (sessiontoken) {
      setToken(sessiontoken);
      setIsLogged(true);
    } else {
      setToken("");
      setIsLogged(false);
      
    }
    
  }, [isLogged, props.refresh]);

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (token, username) => {
    setIsLogged(true);
    setOpen(false);
    props.setRefresh();
  };

  return (
    <>
      <Card className="bg-dark text-white text-center fw-bold" id="login">
        {/* https://www.netmeds.com/images/cms/wysiwyg/blog/2020/12/1608796166_Season_big_1.jpg */}
        {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiRp56ehUts3rR_luctaPGEx7TXd1AH4CiQ&s */}
        <Card.Img
          src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/00ff5904-e352-438d-93ba-8dd15ad503db/DallEGeneratedImages/dalle-9adca623-83b1-43ed-a518-d2606e0129d50251666851969063795700.jpg&dcHint=IndiaCentral&fileToken=fec14ee9-850f-41ff-b7f7-7caf68e717a7"
          alt="Card image"
          className="secret-game"
        />
        <Card.ImgOverlay className="upper-layer">
          <div>
            <Card.Title className="fw-bold">Let's Play Your Secret Code game</Card.Title>
            {!isLogged && (
              <>
               <p> Please Login </p>
                {/*<Button onClick={() => setOpen(true)}>Login</Button> */}
                <LoginModel
                  isOpen={open}
                  onClose={handleClose}
                  handleSubmit={handleSubmit}
                />
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
