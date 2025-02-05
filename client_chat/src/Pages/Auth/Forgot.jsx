import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/AuthCss/Forgot.module.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Password reset email sent to:", email);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Container fluid className={styles.forgotContainer}>
      <Row className={styles.rowContainer}>
        <Col md={6} className={styles.imageContainer}>
          <motion.img
            src="https://source.unsplash.com/600x800/?security,technology"
            alt="Forgot Password"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.forgotImage}
          />
        </Col>

        <Col md={6} className={styles.formContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.formBox}
          >
            <h2 className={styles.title}>Forgot Password</h2>
            <p className={styles.subtitle}>Enter your email to reset your password</p>

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

              <Button type="submit" variant="primary" className={styles.resetButton} block disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Reset Password"}
              </Button>
            </Form>

            <p className={styles.backToLogin}>
              Remembered your password? <span onClick={() => navigate("/login")} className={styles.loginLink}>Login</span>
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;

