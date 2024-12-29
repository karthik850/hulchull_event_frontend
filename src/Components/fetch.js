import { useState, useEffect } from "react";
import { GET_USER_ALL_SECRETS, UNABLE_TO_RETRIEVE_API_RESPONSE } from "../../utils/Constants";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const generateRandomColor = () => {
    const newColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    return newColor;
  };

  const fetchData = async (url, isAutenticated, method) => {
    try {
      setIsLoading(true);
      let options = {
        method: "GET",
      };
      if (isAutenticated) {
        options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Token " + sessionStorage.getItem("authToken"),
          },
        };
      }
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status == 401) {
          throw new Error("please Make Sure You logged In")
        }
        else if(response.status == 403){
          throw new Error("You Don't Have Access to view the data")
        }
        else{
          throw new Error(UNABLE_TO_RETRIEVE_API_RESPONSE);
        }

        throw new Error("Network response was not ok");
      }
      let json = await response.json();
      if (method === GET_USER_ALL_SECRETS) {
        const transformedData = json
          .filter((item) => {return !item.is_opened && item.associate_name != sessionStorage.getItem("username")}) // Keep only items where `is_opened` is false
          .map((item) => ({
            label: item.fav_number.toString(),
            value: Math.floor(Math.random() * (3 - 2 + 1)) + 2,
            disable: item.is_opened, // disable is false because filtered items only have `is_opened` false
            color: generateRandomColor(),
          }));

        json = transformedData;
      }
      setData(json);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message)
      setIsLoading(false);
      setError(error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;

// Math.floor(Math.random() * (3 - 2 + 1)) + 2
