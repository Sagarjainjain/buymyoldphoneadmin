"use client"
import "./logs.css"
import data from "../../assets/api/logs.json"
import { useEffect, useState } from "react";

const Logscontainer = () => {

        const [currentPage, setCurrentPage] = useState(1);
        const [adminlogs, setadminlogs] = useState([]);

        const [clickdata, setClickdata] = useState(0);
        const itemsPerPage = 7;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        // const paginate = (pageNumber) => setCurrentPage(pageNumber);

        useEffect(() => {
          async function fetchclicks() {
            const response = await fetch('/api/click');
            const data = await response.json();

            setClickdata(data[0].clickdate.length);
          }
          async function fetchdata() {
            const response = await fetch("/api/adminlogs", );
            if(response.status === 200) {
              const data = await response.json();
              setadminlogs(data);
            }
          } 
          fetchclicks();
          fetchdata()
        }, [clickdata])
  return (
    <div className="logs_container">
      <div className="logs_header-tabs">
        <div className="logs_header-tab ">Admin</div>
        <div className="logs_header-tab ">
          <h3>Clicks</h3>
          <p>{clickdata}</p>
        </div>
      </div>
      <div className="logs_table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Password</th>
              <th>Attempt</th>
              <th>Role</th>
              <th>Date</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {adminlogs.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.attempt}</td>
                <td>{item.role}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Logscontainer