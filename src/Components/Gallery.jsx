import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css"; // Custom CSS file
import useFetch from "./fetch";
import {
  API_ENDPOINT,
  UNABLE_TO_RETRIEVE_API_RESPONSE,
} from "../../utils/Constants";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const {
    data: images,
    isLoading: loading,
    error: error,
    fetchData: getAllImages,
  } = useFetch();

  useEffect(() => {
    getAllImages(API_ENDPOINT + "api/eventapp/get-all-event-images/", false);
  }, []);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container my-4">
      {loading && (
        <Alert
          key="loading"
          variant="danger"
          className="align-center d-flex align-items-center"
        >
          {" "}
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
      {images &&
        (images.length > 0 ? (
          <div className="irregular-gallery">
            {images.map((image, index) => (
              <div
                className="gallery-item"
                key={index}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image.eventImage_url}
                  alt={`Gallery Item ${index + 1}`}
                  className="img-fluid rounded shadow"
                  style={{ cursor: "pointer", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No images available.</p>
        ))}

      {selectedImageIndex !== null && (
        <Modal
          show={isOpen}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {images[selectedImageIndex].eventName
                ? images[selectedImageIndex].eventName
                : "Hullchull App"}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center position-relative">
            <button
              className="gallery-btn gallery-btn-prev"
              onClick={handlePrev}
            >
              &lt;
            </button>
            <img
              src={images[selectedImageIndex].eventImage_url}
              alt="Selected gallery item"
              className="img-fluid"
              style={{ maxHeight: "90vh", objectFit: "contain" }}
            />
            <button
              className="gallery-btn gallery-btn-next"
              onClick={handleNext}
            >
              &gt;
            </button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
