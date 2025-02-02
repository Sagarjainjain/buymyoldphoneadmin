"use client";

import "./admin.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const page = () => {
  const data = {
    email: "Sagar@gmail.com",
    password: "123",
  };
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
    role: "",
    date: "",
    time: "",
  });
  const router = useRouter();
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: logindata.email,
        password: logindata.password,
        redirect: false,
      });
      if (res.error) {
        alert(res.error);
        return;
      }

      router.replace("/admin/bids");
    } catch (error) {}
    // const now = new Date();

    // const day = String(now.getDate()).padStart(2, "0");
    // const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    // const year = now.getFullYear();
    // const hours = String(now.getHours()).padStart(2, "0");
    // const minutes = String(now.getMinutes()).padStart(2, "0");
    // if (
    //   data.email === logindata.email &&
    //   data.password === logindata.password
    // ) {
    //   const response = await fetch("/api/adminlogs/new", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: logindata.email,
    //       password: logindata.password,
    //       attempt: "Successfull",
    //       role: "admin",
    //       date: `${day}/${month}/${year}`,
    //       time: `${hours}/${minutes}`,
    //     }),
    //   });
    //   if (response.status === 200) {
    //     alert("Admin logged in successfully");
    //   }
    // } else {
    //   const response = await fetch("/api/adminlogs/new", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: logindata.email,
    //       password: logindata.password,
    //       attempt: "UnSuccessful",
    //       role: "admin",
    //       date: `${day}/${month}/${year}`,
    //       time: `${hours}/${minutes}`,
    //     }),
    //   });
    //   if (response.status === 200) {
    //     alert("Invalid Credentials");
    //   }
    // }
  };
  return (
    <div className="admin-container">
      <div className="admin-container-card">
        <div className="admin-container-card-header">
          <h1>Admin</h1>
        </div>
        <div className="admin_container-card-form">
          <form onSubmit={handlesubmit}>
            <div className="admin_container-card-form-item">
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                required
                id="Email"
                onChange={(e) =>
                  setlogindata({ ...logindata, email: e.target.value })
                }
              />
            </div>
            <div className="admin_container-card-form-item">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                required
                id="password"
                onChange={(e) =>
                  setlogindata({ ...logindata, password: e.target.value })
                }
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
