import React, { useState } from "react";
import { Box, Typography, Input, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)({
  overflow: "hidden",
  maxWidth: "400px",
  background: "#f0f0f0",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.2)",
  margin: "auto",
  marginTop: "50px",
});

const TitleText = styled(Box)({
  display: "flex",
  width: "200%",
  marginBottom: "20px",
});

const Title = styled(Box)({
  width: "50%",
  fontSize: "28px",
  fontWeight: 600,
  textAlign: "center",
  cursor: "pointer",
  color: "#333",
});

const SlideControls = styled(Box)({
  position: "relative",
  display: "flex",
  height: "40px",
  width: "100%",
  overflow: "hidden",
  margin: "20px 0 10px 0",
  justifyContent: "space-between",
  border: "1px solid lightgrey",
  borderRadius: "5px",
});

const Field = styled(Box)({
  height: "50px",
  width: "100%",
  marginTop: "15px",
});

const InputField = styled(Input)({
  height: "100%",
  width: "100%",
  outline: "none",
  paddingLeft: "15px",
  borderBottomWidth: "1px",
  fontSize: "16px",
  backgroundColor: "#f9f9f9",
});

const PassLink = styled(Box)({
  marginTop: "5px",
});

const Btn = styled(Box)({
  height: "50px",
  width: "100%",
  borderRadius: "10px",
  position: "relative",
  overflow: "hidden",
});

const BtnLayer = styled(Box)({
  height: "100%",
  width: "300%",
  position: "absolute",
  left: "-100%",
  background: "linear-gradient(to right, #0059b3, #0073e6)",
  borderRadius: "10px",
  transition: "all 0.4s ease",
});

const SubmitButton = styled(Button)({
  height: "100%",
  width: "100%",
  zIndex: 1,
  position: "relative",
  background: "none",
  border: "none",
  color: "#fff",
  paddingLeft: 0,
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: 500,
  cursor: "pointer",
  textTransform: "capitalize",
});

const Signup = () => {
  const [showSignup, setShowSignup] = useState(false);
  const navigate= useNavigate();

  const toggleForm = () => {
    setShowSignup(!showSignup);
   
  };

  
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const login = async (user) => {
    const {email,password}  = user
    console.log(email,password);
    try {
      const res = await axios.post("https://hospital-server-masai.onrender.com/login", user);
      console.log(res);
   
     
      
        const token = res.data.token;
   console.log(token);
        localStorage.setItem("token", token);
   
        alert("Login Successful");        
        navigate("/onboard");
    } catch (error) {
      console.log(error);
      alert(`Invalid Credentials`);
    }
    setUser({
      email: "",
      password: "",
      confirmpassword: "",
    });
  };


  const signup = async (user) => {
    try {
      const res = await axios.post("https://hospital-server-masai.onrender.com/signup", user);
      console.log(res);
  
        alert("Signup Successful");
        setShowSignup(!showSignup);
         
    } catch (error) {
      console.log(error);
       
      alert(`Signup failed`);
    }
    setUser({
      email: "",
      password: "",
      confirmpassword: "",
    });
  };


  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    if (showSignup) {
       
      signup(user);
    } else {
      
      login(user);
    }
  };

  return (
    <Wrapper>
    <TitleText>
      <Title width="50%" onClick={toggleForm}>
        Login Form
      </Title>
      <Title width="50%" onClick={toggleForm}>
        Signup Form
      </Title>
    </TitleText>
    <SlideControls>
      <input type="radio" style={{ display: "none" }} />
      <input type="radio" style={{ display: "none" }} />
      <label
        onClick={toggleForm}
        style={{
          height: "100%",
          width: "100%",
          textAlign: "center",
          zIndex: 1,
          marginTop: "5px",
          color: showSignup ? "#333" : "#fff",
          cursor: "pointer",
          backgroundColor: showSignup ? "#fff" : "#0073e6",
          borderRadius: "5px",
        }}
      >
        Login
      </label>
      <label
        onClick={toggleForm}
        style={{
          height: "100%",
          width: "100%",
          textAlign: "center",
          zIndex: 1,
          marginTop: "5px",
          color: !showSignup ? "#333" : "#fff",
          cursor: "pointer",
          backgroundColor: !showSignup ? "#fff" : "#0073e6",
          borderRadius: "5px",
        }}
      >
        Signup
      </label>
      <Box
        sx={{
          position: "absolute",
          background: "linear-gradient(to right, #0059b3, #0073e6)",
          height: "100%",
          width: "50%",
          left: showSignup ? "50%" : 0,
          borderRadius: "5px",
          transition: "left 0.3s ease",
        }}
      ></Box>
    </SlideControls>
      <Box>
        <form
          style={{ display: showSignup ? "none" : "block" }}
          onSubmit={onFormSubmit}
        >
          <Field> 
            <InputField type="text" placeholder="Email Address" name="email" required   onChange={handleUserData}/>
          </Field>
          <Field>
            <InputField type="password" placeholder="Password" name="password" required   onChange={handleUserData} />
          </Field>
          <PassLink>
            <Typography textAlign="left" marginTop="7px" color="#2279d9">
              Forgot password?
            </Typography>
          </PassLink>
          <Btn marginTop="20px">
            <BtnLayer />
            <SubmitButton type="submit">Login</SubmitButton>
          </Btn>
          <Box marginTop="10px">
            Not a member ?{" "}
            <span
              onClick={toggleForm}
              style={{ color: "#2279d9", cursor: "pointer" }}
            >
              Signup now
            </span>
          </Box>
        </form>
        <form style={{ display: showSignup ? "block" : "none" }} onSubmit={onFormSubmit}>
          <Field>
            <InputField
              type="text"
              placeholder="Email Address"
              required
              onChange={handleUserData}
              name="email"
            />
          </Field>
          <Field>
            <InputField
              type="password"
              placeholder="Password"
              required
              onChange={handleUserData}
              name="password"
            />
          </Field>
          <Field>
            <InputField
              type="password"
              placeholder="Confirm password"
              required
              onChange={handleUserData}
              name="confirmpassword"
            />
          </Field>
          <Btn marginTop="20px">
            <BtnLayer />
            <SubmitButton type="submit">Signup</SubmitButton>
          </Btn>
          <Box marginTop="10px">
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              style={{ color: "#2279d9", cursor: "pointer" }}
            >
              Login
            </span>
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};

export default Signup;
