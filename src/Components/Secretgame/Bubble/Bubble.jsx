import React, { useEffect, useState } from "react";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import ErrorBoundary from "./ErrorBoundary";
import "./styles.scss";
import useFetch from "../../fetch";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {
  API_ENDPOINT,
  GET_USER_ALL_SECRETS,
  UNABLE_TO_RETRIEVE_API_RESPONSE,
  USER_CONFLICT,
} from "../../../../utils/Constants";
import Spinner from "react-bootstrap/Spinner";

const Bubble = () => {
  const {
    data: secretdata,
    isLoading: loading,
    error: secreterror,
    fetchData: getUserSecretData,
  } = useFetch();
  // const {
  //   data: usersecretdata,
  //   isLoading: userloading,
  //   error: usererror,
  //   fetchData: getUserSecret,
  // } = useFetch();
  const [usersecretdata,setUserSecretData] = useState([])
  const [userloading,setUserLoading] = useState(false)
  const [usererror,setUseError] = useState()
  const [token, setToken] = useState(sessionStorage.getItem("authToken"));
  const [userPopup, setuserPopup] = useState(false);
  const [favNumber, setFavNumber] = useState();
  const [userSecret, setUserSecret] = useState();
  const [infomessage, setInfoMessage] = useState();
  const [submittingFavNumber, setSubmittingFavNumber] = useState();
  const [gender, setGender] = useState();
  useEffect(() => {
    const fetchSecrets = async () => {
      const sessiontoken = sessionStorage.getItem("authToken");
      if (sessiontoken) {
        setToken(sessiontoken);

        try {
          let options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Token " + sessiontoken,
            },
          };
          setUserLoading(true)
          const firstresponse = await fetch(API_ENDPOINT + "api/hulchullapp/get-my-secret-code/", options);
          // Fetch the first API data
          if (!firstresponse.ok) {
            setUseError("error")
            setUserLoading(false)
            // throw new Error("Network response was not ok");
          }
          else{
            
            const firstdata = await firstresponse.json();
            setUserSecretData(firstdata)
            setUserLoading(false)
            if(firstdata.length==0){
              await getUserSecretData(
                API_ENDPOINT + "api/hulchullapp/user/secretcodes/",
                true,
                GET_USER_ALL_SECRETS
              );
            }
          }
          
            
          
        } catch (error) {
          setUserLoading(false)
          setUseError("error")
        }
      }
    };

    fetchSecrets();
  }, []);

  const bubbleClickFun = async (bubble) => {
    setFavNumber(bubble);
    setuserPopup(true);
  };

  const handleConfirm = async () => {
    const payload = {
      favNumber: favNumber, // replace with actual favNumber
    };
    const response = await fetch(
      API_ENDPOINT + "api/hulchullapp/update-secret-code/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      if (response.status == 400) {
        setInfoMessage({ USER_CONFLICT });
        return;
      } else {
        throw new Error("");
      }
    }

    const data = await response.json();
    if (data.associate_name) {
      setUserSecret(data.associate_name);
    }

    if (data.gender == "F") {
      setGender("Female");
    } else {
      setGender("Male");
    }
    setuserPopup(false);
    setFavNumber();
  };

  const handleCancel = () => {
    setuserPopup(false);
    setFavNumber();
  };
  const handleOk = () => {
    setuserPopup(false);
    setFavNumber();
    setInfoMessage();
  };

  function FavNumberComfirmation(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        key="FavNumberConfirmation"
      >
        {infomessage ? (
          <div className="box-shadow-style">
            <Modal.Header closeButton >
              <Modal.Title>Sorry!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This Number Has already been taken <br />
              please Choose another number
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleOk}>
                ok
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div className="box-shadow-style">
            <Modal.Header closeButton >
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure You Want This - <b>{favNumber} </b> as your Number
              <br /> You Cannot Change Later
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleConfirm}>
                Yes
              </Button>
              <Button variant="danger" onClick={handleCancel}>
                No
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    );
  }
  return (
    <div className="bubble">
      {loading || userloading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : secreterror || usererror ? (
        <Alert key="loginerror" variant="danger">
          {UNABLE_TO_RETRIEVE_API_RESPONSE}
        </Alert>
      ) : userSecret ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className="card mb-3" style={{maxWidth: "100%"}}>
              <div className="row g-0">
                <div className="col-md-4">
                  
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text">
                      You have selected your secret as <b>{userSecret}</b>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="d-flex align-items-center">
              
              <div className="flex-grow-1 ms-3">
                You Have Selected Your Secret as <b>{userSecret}</b>{" "}
                
              </div>
              <div className="img-thumbnail">
                <img className="thumbnail-image"
                  src={
                    gender == "Female"
                      ? "https://img.freepik.com/free-vector/smiling-young-girl-vector-portrait_1308-166167.jpg"
                      : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                  }
                  alt="..."
                />
              </div>
            </div>
          </Modal.Body>
        </>
      ) : usersecretdata && usersecretdata.length > 0 ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Already selected</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="d-flex align-items-center">
              
              <div className="flex-grow-1 ms-3">
              You have already selected your secret person as{" "}
              <b>{usersecretdata[0].associate_name}</b>
              </div>
              <div className="img-thumbnail">
                <img className="thumbnail-image"
                  src={
                    usersecretdata[0].gender == "F"
                      ? "https://img.freepik.com/free-vector/smiling-young-girl-vector-portrait_1308-166167.jpg"
                      : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                  }
                  alt="..."
                />
              </div>
            </div>
          </Modal.Body>
        </>
      ) : (
        secretdata && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Your Secret Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please Select Your Favourite Number</Modal.Body>
            <div className="bubble-chart-start">
            <ErrorBoundary message="Problem in index.render: BubbleChart">
              <BubbleChart
                graph={{
                  zoom: 0.2,
                  offsetX: 0,
                  offsetY: 0,
                }}
                showLegend={false}
                data={secretdata}
                bubbleClickFun={(bubble) => bubbleClickFun(bubble)}
                labelFont={{
                  size: 20,
                  color: "#ffffff",
                  weight: "bold",
                }}
                valueFont={{
                  // Set size to 0 or no color to hide labels
                  size: 0,
                  color: "transparent",
                }}
                bubbleStyling={({ label, value }) =>
                  getBubbleStyle(label, value)
                }
              />
            </ErrorBoundary>
            </div>
          </>
        )
      )}
      <FavNumberComfirmation show={userPopup} onHide={() => setuserPopup()} />
    </div>
  );
};

export default Bubble;

// data={[
//   { label: "Better Call Saul", value: 3, color: "#e87876" },
//   { label: "Euphoria", value: 5, color: "#f3a287" },
//   { label: "Ozark", value: 5, color: "#fab081" },
//   { label: "Severence", value: 5, color: "#fcc988" },
//   { label: "Squid Game", value: 6, color: "#bed89b" },
//   { label: "Stranger Things", value: 1, color: "#8ecbb1" },
//   { label: "Succession", value: 15, color: "#90c3c7" },
//   { label: "Yellowjackets", value: 3 }
//   // { label: "Conversion", value: 9 }
//   // { label: "Misc", value: 21 },
//   // { label: "Databases", value: 22 },
//   // { label: "DevOps", value: 22 },
//   // { label: "Javascript", value: 23 },
//   // { label: "Languages / Frameworks", value: 25 },
//   // { label: "Front End", value: 26 },
//   // { label: "Content", value: 26 }
// ]}
