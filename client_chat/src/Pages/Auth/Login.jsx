import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../Styles/AuthCss/Login.module.css";
import Image from './message.jpg'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
import { useChat } from "../../Contexts/ChatContext";
const Login = () => {
  const { handleUserStatus } = useChat();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, LogoutUser, getAllUsers } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Example API endpoint (replace with actual endpoint)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email: email,
        password: password,
      }, { withCredentials: true });

      if (response.status === 200) {

        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({
          userData: response.data.userData,
          JoinedGroups: response.data.JoinedGroups
        }));
        getAllUsers(response.data.userData._id);
        handleUserStatus(response.data.userData._id);
        setIsAuthenticated(true)
        navigate('/')


      }

    } catch (error) {
      // Handle errors here
      console.error(error.message)
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await axios.post("https://chat-app-server-6z4y.onrender.com/api/auth/google", {
        token,
      });

      if (res.status === 200) {
        toast.success('Login Successfully');
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({
          userData: res.data.userData,
          JoinedGroups: res.data.JoinedGroups
        }));
        setIsAuthenticated(true);
        getAllUsers(res.data.userData._id)
        handleUserStatus(res.data.userData._id);
        setTimeout(() => {
          navigate('/');
        }, 0);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (

    <Container fluid className={styles.loginContainer}>
      <Row className={styles.rowContainer}>
        {/* Left Side Image */}
        <Col md={6} className={styles.imageContainer}>
          <motion.img
            src={Image}
            alt="Login Banner"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.loginImage}
          />
        </Col>

        {/* Right Side Form */}
        <Col md={6} className={styles.formContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.formBox}
          >
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Sign in to continue</p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className={styles.inputGroup}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className={styles.inputGroup}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className={styles.linksContainer}>
                <Link to="/forgot-password"><p className={styles.forgotPassword}>Forgot Password?</p></Link>
              </div>

              <Button type="submit" variant="primary" className={styles.loginButton} block disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form>

            <p className={styles.orText}>OR</p>

            <GoogleOAuthProvider clientId='188395877340-no636i8iip83emhvvftlfe5sdkp32k51.apps.googleusercontent.com'>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>

            <p className={styles.signupText}>
              Don't have an account? <span className={styles.signupLink}><Link to={'/signup'}>Sign Up</Link></span>
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;