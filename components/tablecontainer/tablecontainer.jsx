"use client";

import { useEffect, useState } from "react";

const Tablecontainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [biddata, setbiddata] = useState([]);

  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = biddata.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch("/api/bids");
      const data = await response.json();
      if (response.status === 200) {
        setbiddata(data);
      } else {
        console.log("Error");
      }
    }
    fetchdata();
  }, []);
  const deleteBid = async (id) => {
    try {
      const response = await fetch(`/api/bids/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setbiddata(biddata.filter((data) => data._id !== id));
      }
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  };

  const handledeclarewinner = async (winnername) => {
    try {
      const response = await fetch(
        "/api/click/679870fc6fce610925e9e64f/winner",
        {
          method: "PATCH",
          body: JSON.stringify({ declaredwinner: winnername }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error While Updating winner:", error);
    }
  };

  return (
    <div className="tableContainer">
      <div className="bids_container-header">
        <h2>Bids</h2>
        <div className="bids_container_sort">
          <select id="sort" name="sort">
            <option value="1">Highest to Lowest</option>
            <option value="2"> Lowest to Highest </option>
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>User Email</th>
            <th>User Number</th>
            <th>Bid Amount</th>
            <th>Date of Bid</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item._id}</td>
              <td>{item.useremail}</td>
              <td>{item.usernumber}</td>
              <td>₹{item.userbid}</td>
              <td>{item.biddate}</td>
              <td className="action_buttons">
                <button className="actionButton" onClick={() => handledeclarewinner(item.useremail)}>Declare Winner</button>
                <button
                  className="actionButton"
                  onClick={() => deleteBid(item._id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table_pagination">
        {Array.from(
          { length: Math.ceil(biddata.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Tablecontainer;
