import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../Styles/AuthCss/Login.module.css";
import Image from './message.jpg'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log("Email:", email);
      console.log("Password:", password);
      setIsLoading(false);
    }, 2000);
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
              <Link to={'/forgot-password'}><p className={styles.forgotPassword}>Forgot Password?</p></Link>
              </div>

              <Button type="submit" variant="primary" className={styles.loginButton} block disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form>

            <p className={styles.orText}>OR</p>
            <Button
              variant="light"
              className={styles.googleButton}
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className={styles.googleIcon} /> Sign in with Google
            </Button>

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
