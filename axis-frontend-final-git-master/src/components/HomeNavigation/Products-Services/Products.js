import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./Product.css";
import ProductServices from "./ProductServices";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [searchProd, setSearchProd] = useState("");

  function text(e) {
    setSearchProd(e.target.value);
    if (e.target.value == "") {
      axios.get("http://localhost:8089/products").then((response) => {
        setProductData(response.data);
      });
    } else {
      let newProdData = productData.filter((e) => {
        return (
          e.productName.substring(0, searchProd.length).toLowerCase() ==
          searchProd.toLowerCase()
        );
      });
      setProductData(newProdData);
    }
  }

  function searchProd1() {
    let newProdData = productData.filter((e) => {
      return (
        e.productName.substring(0, searchProd.length).toLowerCase() ==
        searchProd.toLowerCase()
      );
    });
    setProductData(newProdData);
  }

  useEffect(() => {
    axios.get("http://localhost:8089/products").then((response) => {
      setProductData(response.data);
    });
  }, []);

  return (
    <>
      <ProductServices />
      <div className="employeesearch">
        <div className="input-group">
          <div className="employeeinput">
            <input
              type="search"
              className="form-control"
              placeholder="Search Products"
              onChange={text}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary employeebtn"
            onClick={searchProd1}
          >
            <i className="fas fa-search"> Search </i>
          </button>
        </div>
      </div>
      <div className="divflex">
        {productData.map((ele) => {
          return (
            <>
              <div className="projectCard" style={{ height: "375px" }}>
                <Card>
                  <Card.Header className="cardHeader">
                    {" "}
                    {ele.productName}{" "}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <img src={ele.imageUrl} className="product-image"></img>
                    </Card.Title>
                    <Card.Title>Product Description</Card.Title>
                    <Card.Text>{ele.productDescription}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Products;
