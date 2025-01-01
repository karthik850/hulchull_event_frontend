import { useEffect, useState } from "react";
import useFetch from "./fetch";
import { API_ENDPOINT } from "../../utils/Constants";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const AdminPage = () => {
  const {
    data: adminSecretData,
    isLoading: secretDataLoading,
    error: secretError,
    fetchData: getAdminSecretData,
  } = useFetch();

  const [filters, setFilters] = useState({
    fav_number: "",
    associate_name: "",
    user_name: "",
    is_opened: "",
    gender: "",
  });
  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const handleDropdownChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter data based on the filters
  const filteredData =
    adminSecretData &&
    adminSecretData.filter((item) => {
      return (
        (filters.fav_number === "" ||
          item.fav_number.toString().includes(filters.fav_number)) &&
        (filters.associate_name === "" ||
          item.associate_name
            .toLowerCase()
            .includes(filters.associate_name.toLowerCase())) &&
        (filters.user_name === "" ||
          (item.user_name &&
            item.user_name
              .toLowerCase()
              .includes(filters.user_name.toLowerCase()))) &&
        (filters.is_opened === "" ||
          item.is_opened.toString() === filters.is_opened) &&
        (filters.gender === "" ||
          item.gender.toLowerCase() === filters.gender.toLowerCase())
      );
    });

  useEffect(() => {
    getAdminSecretData(
      API_ENDPOINT + "api/hulchullapp/admin/secretcodes/",
      true
    );
  }, []);
  return (
    <div className="container-fluid vh-100 main-section overflow-auto">
      <br />
      {secretDataLoading && (
        <Alert key="admin-error" variant="danger">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Alert>
      )}
      {secretError && (
        <Alert key="admin-error" variant="danger">
          <p>Error: {secretError.message}</p>
        </Alert>
      )}
      {adminSecretData && (
        <div>
          <Alert
            className="imp-person-header text-center fw-bold d-flex align-items-center p-0 justify-content-center fs-6"
            key="dark"
            variant="secondary"
          >
            All User's Data
          </Alert>
          <Table striped responsive="lg" size="lg" bordered className="table-dark">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Fav No</th>
                <th>Associate Name</th>
                <th>User Name</th>
                <th>Is-Opened</th>
                <th>Gender</th>
                <th>Opened On</th>
              </tr>
              <tr>
                <th>
                  {/* <Form.Control
                    type="text"
                    placeholder="Filter by ID"
                    name="id"
                    value={filters.id || ""}
                    onChange={handleFilterChange}
                    disabled={true}
                    className="disabled-filter"
                  /> */}
                </th>
                <th>
                  <Form.Control
                    type="text"
                    placeholder="Filter by fav number"
                    name="fav_number"
                    value={filters.fav_number}
                    onChange={handleFilterChange}
                  />
                </th>
                <th>
                  <Form.Control
                    type="text"
                    placeholder="Filter by associate name"
                    name="associate_name"
                    value={filters.associate_name}
                    onChange={handleFilterChange}
                  />
                </th>
                <th>
                  <Form.Control
                    type="text"
                    placeholder="Filter by user name"
                    name="user_name"
                    value={filters.user_name}
                    onChange={handleFilterChange}
                  />
                </th>
                <th>
                  <Form.Select
                    name="is_opened"
                    value={filters.is_opened}
                    onChange={(e) =>
                      handleDropdownChange("is_opened", e.target.value)
                    }
                  >
                    <option value="">Filter by Is Opened</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </th>
                <th>
                  <Form.Select
                    aria-label="Default select example"
                    value={filters.gender}
                    onChange={(e) =>
                      handleDropdownChange("gender", e.target.value)
                    }
                  >
                    <option value="">Filter by Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Form.Select>
                </th>
                <th>
                  {/* <Form.Control
                    type="text"
                    placeholder="Filter by opened_on"
                    name="opened_on"
                    value={filters.opened_on || ""}
                    onChange={handleFilterChange}
                    disabled={true}
                    className="disabled-filter"
                  /> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fav_number}</td>
                    <td>{item.associate_name}</td>
                    <td>{item.user_name || "N/A"}</td>
                    <td>{item.is_opened ? "Yes" : "No"}</td>
                    <td>{item.gender?item.gender=="F"?"Female":"Male":"N/A"}</td>
                    <td>{item.opened_on ? item.opened_on.substring(0,16): "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No data found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
