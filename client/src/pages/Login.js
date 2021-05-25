import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
export default function  Login({history}){
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();

    const res = await  fetch('/signIn',{
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
          const data  = res.json();
          if(res.status === 400 ||  !data) {
            window.alert("Invalid Credentials")
          }else {
            window.alert("Login successfull")
          }

//     fetch('/signIn',{
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
// .then(function(response){ return response.json(); })
// .then(function(data) {
//     const items = data;
//     console.log(items)
//     if(items === undefined){
//       window.alert("Logged in");
//     }

  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5"  style={{width: "30%"}}>
        <h1>Login</h1>
        <br />
        <form method="POST">
          <div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Password
              </label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
              />
            </div>
            <button onClick={loginUser} class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

