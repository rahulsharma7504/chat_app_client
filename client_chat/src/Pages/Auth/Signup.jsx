import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "../../Styles/AuthCss/Signup.module.css";
import signUp from './Chat.jpg'
import { toast } from 'react-hot-toast';
import axios from 'axios'
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (image) {
        formData.append('image', image);
      }
  
      const res = await axios.post(`http://localhost:4000/api/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.status == 201) {
        setName('');
        setEmail('');
        setPassword('');
        setImage(null);
        // Redirect to login page or dashboard
        navigate('/login');
        toast.success(res.data?.message);

      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error?.response?.data?.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className={styles.signupContainer}>
    <Row className={styles.rowContainer}>
      <Col md={6} className={styles.imageContainer}>
        <motion.img
          src={signUp}
          alt="Signup Banner"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.signupImage}
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
              <Form.Control type="text" name="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formEmail" className={styles.inputGroup}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formPassword" className={styles.inputGroup}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formImage" className={styles.inputGroup}>
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>

            <Button type="submit" variant="primary" className={styles.signupButton} disabled={isLoading}>
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