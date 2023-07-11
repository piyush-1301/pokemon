import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "./Home.css";
import Details from "./Details";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useComponentVisible from "./useComponentVisible";

function Home() {
  var url = "https://pokeapi.co/api/v2/pokemon";
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [dropdownData, setDropDownData] = useState([]);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [localStore,setLocalStore] = useState(JSON.parse(localStorage.getItem("oldSearch")));

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1300")
      .then((res) => {
        console.log(res.data);
        return setDropDownData(res.data.results);
      })
      .catch((error) => console.error(error));
      setIsComponentVisible(false);
  }, []);

  async function getPokemonByName(name) {
    try {
      const response = await axios.get(url + "/" + name);
      setIsComponentVisible(false);
      console.log(response.data);
      setResult(response.data);
      setHeading(name);
      var arr = JSON.parse(localStorage.getItem("oldSearch"));
      if(arr){
      if (arr.length === 5) arr.pop();
      arr.unshift(name);
      arr = [...new Set(arr)];
      }
      setLocalStore(arr);
      localStorage.setItem("oldSearch", JSON.stringify(arr));
      console.log(result);
    } catch (error) {
      toast.error("Not Found");
      console.error(error);
    }
  }

  const onSearch = (name) => {
    setName(name);
    setResult("");
    getPokemonByName(name);
    setHeading("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("please enter any name");
      return;
    }
    setResult("");
    getPokemonByName(name.trim().split(" ").join("-").toLowerCase());
    setHeading("");
    console.log(name);
  };

  const handleReset = () => {
    setHeading("");
    setName("");
    setResult("");
  };

  const removeItemFromLocalStorage = (index) => {
    var arr = JSON.parse(localStorage.getItem("oldSearch"));
    arr.splice(index, 1);
    localStorage.setItem("oldSearch", JSON.stringify(arr));
    setLocalStore(arr);
  };


  return (
    <div className="homeContainer">
      <ToastContainer />
      <div className="formContainer">
        <Form onSubmit={handleSubmit} className="form">
          <div className="dropDownContainer" ref={ref}>
            <Form.Control
              type="text"
              className="inputFeild"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
            ></Form.Control>
            {isComponentVisible && (
              <div className="dropDown">
                {localStore &&
                  localStore.map(
                    (data, index) => (
                      <div className="oldOption">
                        <div
                          key={index}
                          className="option"
                          onClick={() => onSearch(data)}
                        >
                          <i class="bi bi-arrow-counterclockwise"></i>
                          {data}
                        </div>
                        <button
                          className="clearButton"
                          type="button"
                          onClick={() => removeItemFromLocalStorage(index)}
                        >
                          <i class="bi bi-x-lg"></i>
                        </button>
                      </div>
                    )
                  )}
                {dropdownData
                  .filter((data) => {
                    const searchTerm = name
                      .trim()
                      .split(" ")
                      .join("-")
                      .toLowerCase();

                    return (
                      searchTerm &&
                      data.name.startsWith(searchTerm) &&
                      data.name !== searchTerm
                    );
                  })
                  .map((data, index) => (
                    <div
                      key={index}
                      className="option"
                      onClick={() => onSearch(data.name)}
                    >
                      <i className="bi bi-search"></i>
                      <span style={{ "font-weight": "bold" }}>
                        {name.trim().split(" ").join("-").toLowerCase()}
                      </span>
                      {data.name.substring(
                        name.trim().split(" ").join("-").toLowerCase().length
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <Form.Group className="form-button">
            <Button variant="primary" type="submit">
              Search
            </Button>
            <Button variant="outline-danger" onClick={handleReset}>
              <i className="bi bi-arrow-counterclockwise"></i>
            </Button>
          </Form.Group>
        </Form>
      </div>
      {heading && (
        <h1 style={{ textAlign: "center", margin: "10px" }}>
          {heading.charAt(0).toUpperCase() + heading.slice(1).toLowerCase()}
        </h1>
      )}
      {result && <Details result={result} />}
    </div>
  );
}

export default Home;
