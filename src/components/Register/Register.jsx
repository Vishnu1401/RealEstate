import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; 
import photo from '../../assets/page5.png'
function Register() {
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phonenumber: "",
    password: "",
    email: "",
    roleid: "",
    address: "",
  });

  const [errorpassword, setErrorpassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageU, setErrorMessageU] = useState(null);
  const [errorMessageP, setErrorMessageP] = useState(null);
  const [insert, setInsert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const insertdata = async () => {
      const response = await axios.post("http://localhost:8080/register", formdata);
      if (response.data.success) {
        alert(response.data.success);
        navigate("/login");
      } else if (response.data.failed) {
        alert(response.data.failed);
      }
    };
    if (insert) {
      insertdata();
    }
  }, [insert]);

  const handleInput = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!formdata.firstname || !formdata.lastname) {
      alert("Enter firstname and lastname");
      return;
    }

    if (!formdata.username) {
      alert("Username cannot be empty");
      return;
    }

    if (!formdata.password) {
      alert("Password cannot be empty");
      return;
    }

    const errorMessageFinal = errorMessage || errorMessageP || errorMessageU || errorpassword;
    if (errorMessageFinal) {
      alert(errorMessageFinal);
      return;
    }
    setInsert(true);
  };

  const handlePassword = (e) => {
    if (formdata.password !== e.target.value) {
      setErrorpassword("Passwords should match");
    } else {
      setErrorpassword("");
    }
  };

  const validateName = (e) => {
    if (/\d/.test(e.key) || e.key === " ") {
      e.preventDefault();
    }
  };

  const validateUser = (e) => {
    let value = e.target.value;
    if (value.length < 8) {
      setErrorMessageU("Min: 8 characters for username");
    } else if (value.length > 12) {
      setErrorMessageU("Max: 12 characters for username");
    } else {
      setErrorMessageU("");
    }
    handleInput(e);
  };

  const validateEmail = (e) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!regex.test(e.target.value)) {
      setErrorMessage("Enter a valid email");
    } else {
      setErrorMessage("");
    }
    handleInput(e);
  };

  const handlePhoneNumber = (e) => {
    let regex = /^[6-9]{1}[0-9]{9}$/;
    if (!regex.test(e.target.value)) {
      setErrorMessageP("Enter a valid 10-digit phone number");
    } else {
      setErrorMessageP("");
    }
    handleInput(e);
  };

  const handlePhoneNumberpress = (e) => {
    if (!/^[0-9]$/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
     <center>
        <div className="one" style={
            {background:`url(${photo}) center/cover no-repeat`}
        }>
            <div className="over"></div>
            <form className="form" onSubmit={handleForm}>
      <legend>REGISTER</legend>

      <div className="block">
        <label htmlFor="firstname">Enter First Name:</label>
        <div className="subblock">
        <input type="text" name="firstname" id="firstname" onKeyDown={validateName} onChange={handleInput} />
        </div>
      </div>

      <div className="block">
        <label htmlFor="lastname">Enter Last Name:</label>
        <div className="subblock">
        <input type="text" name="lastname" id="lastname" onKeyDown={validateName} onChange={handleInput} />
        </div>
      </div>

      <div className="block">
        <label htmlFor="username">Enter Username:</label>
        <div className="subblock">
        <input type="text" name="username" id="username" onChange={validateUser} />
        <div className="error-message">{errorMessageU}</div>
        </div>
      </div>

      <div className="block">
        <label htmlFor="phonenumber">Phone Number:</label>
        <div className="subblock">
        <input type="text" name="phonenumber" id="phonenumber" onKeyDown={handlePhoneNumberpress} onChange={handlePhoneNumber} />
        <div className="error-message">{errorMessageP}</div>
        </div>
      </div>

      <div className="block">
        <label htmlFor="email">Enter Email:</label>
        <div className="subblock">
        <input type="email" name="email" id="email" onChange={validateEmail} />
        <div className="error-message">{errorMessage}</div>
        </div>
      </div>

      <div className="block">
        <label htmlFor="password">Enter Password:</label>
      <div className="subblock">
      <input type="password" name="password" id="password" onChange={handleInput} />
      </div>
      </div>

      <div className="block">
        <label htmlFor="repassword">Re-Enter Password:</label>
        <div className="subblock">
        <input type="password" name="repassword" id="repassword" onChange={handlePassword} />
        <div className="error-message">{errorpassword}</div>
        </div>
      </div>

      <div className="block">
        <label htmlFor="role">Select Role:</label>
        <div className="subblock">
        <select name="roleid" id="roleid" onChange={handleInput}>
          <option value="0">Select Role</option>
          <option value="1">Agent</option>
          <option value="2">Buyer</option>
        </select>
        </div>
      </div>

      <div className="block">
        <label htmlFor="address">Enter Address:</label>
       <div className="subblock">
       <textarea name="address" id="address" onChange={handleInput}></textarea>
       </div>
      </div>

      <button style={{borderRadius:"20px"}}>Register</button>

      <div className="link-container">
        <span>Already have an account? </span>
        <Link to="/login" className="link" title="switch to login page">Login</Link>
      </div>
    </form>
        </div>
     </center>
  );
}

export default Register;
