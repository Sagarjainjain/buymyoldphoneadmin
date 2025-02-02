"use client"
import "./bids.css";
import { useState } from "react";
import Tablecontainer from "@/components/tablecontainer/tablecontainer";
import Logscontainer from "@/components/logs/logs";

const page = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [tabitem, settabitem] = useState(0)
  // const itemsPerPage = 7;

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="bids-container">
      <div className="bids-main-container-header">
        <div className="bids-tabs">
          <div className="bid-tabs-list">
            <div
              className={`bid-tab ${tabitem === 0 ? "active-tab" : ""}`}
              onClick={() => settabitem(0)}
            >
              Bids
            </div>
            <div
              className={`bid-tab ${tabitem === 1 ? "active-tab" : ""}`}
              onClick={() => settabitem(1)}
            >
              Logs
            </div>
          </div>
        </div>
          <button className="signout_button">Sign Out</button>
      </div>
      {tabitem === 0 && <Tablecontainer />}
      {tabitem === 1 && <Logscontainer  />}
    </div>
  );
};

export default page;

// <div className='bids-container'>
//     <div className="bids_container-card">
//         <div className="bids_container-card-header">
//             <h2>Current Bids</h2>
//         </div>
//         <div className="bids_container-card-list">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>UserId</th>
//                         <th>User Email</th>
//                         <th>User Phonenumber</th>
//                         <th>Bid Amount</th>
//                         <th>Date Of Bid</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>1</td>
//                         <td>5864854</td>
//                         <td>5864854</td>
//                         <td>5864854</td>
//                         <td>5864854</td>
//                         <td>5864854</td>
//                         <td>5864854</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </div>
// </div>
