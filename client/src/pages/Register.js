import React, { useState } from "react";
import { useHistory } from "react-router";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Navbar from './Navbar';

export default function Register({history}) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  // const [password, setPassword] = useState("");
  // const [cPassword, setCPassword] = useState("");

  // const postData = async (e)=> {
  //     e.preventDefault();
  //     console.log(name);
  // }
  // const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "A"
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword,role } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
        role
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid registeration");
      console.log("Invalid Registeration");
    } else {
      window.alert("Registeration successfull Check your email");
      history.push("/login");
    }
  };

  return (
    <>
    <Navbar/>
      <div className="container mt-5" style={{width: "30%"}}>
        <h1>Register Here</h1>
        <form method="POST" >
            <div>
            <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="name"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleInputs}
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputs}
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Phone Number
            </label>
            <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleInputs}
            class="form-control"
          />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Password
            </label>
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputs}
            class="form-control"
          />
          </div>
          <PasswordStrengthMeter password={user.password} />
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Confirm Password
            </label>
            <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            value={user.cpassword}
            onChange={handleInputs}
            class="form-control"
          />
          </div>
          <label for="role">Choose:</label>
          <select name="role" id="role" onChange={handleInputs}>
            <option value="A">Admin</option>
            <option value="S">Student</option>
            <option value="T">Teacher</option>
          </select>
          <button
            type="submit"
            class="btn btn-primary"
            name="signup "
            value="register"
            onClick={postData}
          >
            Submit
          </button>
            </div>

        </form>
      </div>

    </>
  );
}
