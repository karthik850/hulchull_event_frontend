import React, { useEffect } from 'react';
import useFetch from '../fetch';
import { API_ENDPOINT } from '../../../utils/Constants';
import Spinner from "react-bootstrap/Spinner";

const TeamsInfo = () => {
  // Sample JSON data

  const {
    data: teamData,
    isLoading: teamDataLoading,
    error: teamDataError,
    fetchData: getTeamData,
  } = useFetch();

  useEffect(()=>{
    getTeamData(API_ENDPOINT+'api/eventapp/teams/')
  },[])

  // Sort teams by overall_points in descending order
  const sortedTeams = teamData && [...teamData].sort((a, b) => b.overall_points - a.overall_points);

  // If data is still loading, show loading message
  if (teamDataLoading) {
  return(
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner animation="border" role="status" >
    <span className="visually-hidden align-center">Loading...</span>
  </Spinner>
  </div>
)
  }

  // If there's an error fetching data, show error message
  if (teamDataError) {
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger" role="alert">
          {teamDataError.message}
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {teamData && sortedTeams.map((team) => (
          <div className="col-md-4 mb-4" key={team.id}>
            <div className="card h-100 shadow">
            <img
                src={team.image_url}
                alt={team.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }} // Image styling
              />
              <div className="card-body">
                <h5 className="card-title text-center">{team.name}</h5>
                <p className="card-text text-center">
                  <strong>Overall Points:</strong> {team.overall_points}
                </p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Members:</strong>
                  </li>
                  {team.members && team.members.map((member, index) => (
                    <li className="list-group-item text-center" key={index}>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsInfo;