import React, { useState } from "react";
import { Box, Typography, Input, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapperout = styled(Box)({
  overflow: "hidden",
  maxWidth: "400px",
  background: "#f0f0f0",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.2)",
  margin: "auto",
  marginTop: "50px",
});

const TitleTexttop = styled(Box)({
  display: "flex",
  width: "200%",
  marginBottom: "20px",
});

const TitleBox = styled(Box)({
  width: "50%",
  fontSize: "28px",
  fontWeight: 600,
  textAlign: "center",
  cursor: "pointer",
  color: "#333",
});

const SlideControler = styled(Box)({
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

const FieldBox = styled(Box)({
  height: "50px",
  width: "100%",
  marginTop: "15px",
});

const InputFild = styled(Input)({
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

const Signup = ({ setToken }) => {
  const [singupToggle, setsingupToggle] = useState(false);

  const navigate = useNavigate();

  const toggleSignupCard = () => {
    setsingupToggle(!singupToggle);
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const loginUser = async (userData) => {
     

    try {
      const res = await axios.post(
        "https://hospital-server-masai.onrender.com/login",
        userData
      );
      const token = res.data.token;

      setToken(token);
      localStorage.setItem("token", token);

      alert("Login Successful");
      navigate("/onboard");
    } catch (error) {
      console.log(error);
      alert(`Invalid Credentials`);
    }
    setUserData({
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  const signupUser = async (userData) => {
    try {
      const res = await axios.post(
        "https://hospital-server-masai.onrender.com/signup",
        userData
      );
      alert("Signup Successful");
      setsingupToggle(!singupToggle);
    } catch (error) {
      console.log(error);

      alert(`Signup failed`);
    }
    setUserData({
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (singupToggle) {
      signupUser(userData);
    } else {
      loginUser(userData);
    }
  };

  return (
    <Wrapperout>
      <TitleTexttop>
        {singupToggle ? (
          <TitleBox width="50%" onClick={toggleSignupCard}>
            Signup Form
          </TitleBox>
        ) : (
          <TitleBox width="50%" onClick={toggleSignupCard}>
            Login Form
          </TitleBox>
        )}
      </TitleTexttop>
      <SlideControler>
        <input type="radio" style={{ display: "none" }} />
        <input type="radio" style={{ display: "none" }} />
        <label
          onClick={toggleSignupCard}
          style={{
            height: "100%",
            width: "100%",
            textAlign: "center",
            zIndex: 1,
            marginTop: "5px",
            color: singupToggle ? "#333" : "#fff",
            cursor: "pointer",
            backgroundColor: singupToggle ? "#fff" : "#0073e6",
            borderRadius: "5px",
          }}
        >
          Login
        </label>
        <label
          onClick={toggleSignupCard}
          style={{
            height: "100%",
            width: "100%",
            textAlign: "center",
            zIndex: 1,
            marginTop: "5px",
            color: !singupToggle ? "#333" : "#fff",
            cursor: "pointer",
            backgroundColor: !singupToggle ? "#fff" : "#0073e6",
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
            left: singupToggle ? "50%" : 0,
            borderRadius: "5px",
            transition: "left 0.3s ease",
          }}
        ></Box>
      </SlideControler>
      <Box>
        <form onSubmit={onFormSubmit}>
          <FieldBox>
            <InputFild
              type="text"
              placeholder="Email Address"
              name="email"
              required
              onChange={handleUserData}
            />
          </FieldBox>
          <FieldBox>
            <InputFild
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleUserData}
            />
          </FieldBox>

          {singupToggle ? (
            <FieldBox>
              <InputFild
                type="password"
                placeholder="Confirm password"
                required
                onChange={handleUserData}
                name="confirmpassword"
              />
            </FieldBox>
          ) : (
            ""
          )}

          {
  !singupToggle &&<PassLink>
            <Typography textAlign="left" marginTop="7px" color="#2279d9">
              Forgot password?
            </Typography>
          </PassLink>
}
          <Btn marginTop="20px">
            <BtnLayer />
            <SubmitButton type="submit">
              {singupToggle ? "Sing up" : "Login"}
            </SubmitButton>
          </Btn>
          {singupToggle ? (
            <Box marginTop="10px">
              Not a member ?{" "}
              <span
                onClick={toggleSignupCard}
                style={{ color: "#2279d9", cursor: "pointer" }}
              >
                Signup now
              </span>
            </Box>
          ) : (
            <Box marginTop="10px">
              Already have an account?
              <span
                onClick={toggleSignupCard}
                style={{ color: "#2279d9", cursor: "pointer" }}
              >
                Login
              </span>
            </Box>
          )}
        </form>
      </Box>
    </Wrapperout>
  );
};

export default Signup;
