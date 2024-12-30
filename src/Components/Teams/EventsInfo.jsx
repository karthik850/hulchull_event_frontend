// EventsInfo.js
import React, { useEffect, useState } from "react";
import useFetch from "../fetch";
import { API_ENDPOINT } from "../../../utils/Constants";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const EventsInfo = () => {
  const {
    data: eventsData,
    isLoading: eventsDataLoading,
    error: eventsDataError,
    fetchData: getEventsData,
  } = useFetch();

  useEffect(() => {
    // Replace with your actual API endpoint
    getEventsData(API_ENDPOINT + "api/eventapp/events/");
  }, []); // Empty array means this effect runs once when the component mounts

  if (eventsDataLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden align-center">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (eventsDataError) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger" role="alert">
          {eventsDataError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-white">
        <Alert
          className="imp-person-header text-center fw-bold d-flex align-items-center p-0 justify-content-center fs-6"
          key="dark"
          variant="secondary"
        >
          Event details
        </Alert>
      </h3>
      <div className="row">
        {eventsData &&
          eventsData.map((event) => (
            <div className="col-md-4 mb-4" key={event.id}>
              <div
                className="card shadow-lg rounded"
                style={{ transition: "transform 0.3s" }}
              >
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={event.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.25rem",
                      borderTopRightRadius: "0.25rem",
                    }}
                  />
                )}
                <div className="card-header bg-primary text-white text-center h5">
                  {event.name}
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Description:</strong> {event.description}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text">
                    <strong>Start Date:</strong>{" "}
                    {new Date(event.start_date).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Rankings:</strong>
                  </p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>1st Place:</strong> {event.team_spot_1 || "N/A"}
                      {event.team_spot_1 && (
                        <span className="badge bg-success">Winner</span>
                      )}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>2nd Place:</strong> {event.team_spot_2 || "N/A"}
                      {event.team_spot_2 && (
                        <span className="badge bg-secondary">Runner-up</span>
                      )}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>3rd Place:</strong> {event.team_spot_3 || "N/A"}
                      {event.team_spot_3 && (
                        <span className="badge bg-info">Third</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      <strong>4th Place:</strong> {event.team_spot_4 || "N/A"}
                    </li>
                    <li className="list-group-item">
                      <strong>5th Place:</strong> {event.team_spot_5 || "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventsInfo;
