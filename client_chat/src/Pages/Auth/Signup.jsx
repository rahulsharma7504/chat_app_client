import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "../../Styles/AuthCss/Login.module.css";
import signUp from './Chat.jpg'
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Image:", image);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container fluid className={styles.loginContainer}>
      <Row className={styles.rowContainer}>
        <Col md={6} className={styles.imageContainer}>
          <motion.img
            src={signUp}
            alt="Signup Banner"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.loginImage}
          />
        </Col>

        <Col md={6} className={styles.formContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.formBox}
          >
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Sign up to get started</p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className={styles.inputGroup}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formEmail" className={styles.inputGroup}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formPassword" className={styles.inputGroup}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formImage" className={styles.inputGroup}>
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
              </Form.Group>

              <Button type="submit" variant="primary" className={styles.loginButton} block disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp