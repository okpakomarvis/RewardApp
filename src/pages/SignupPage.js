import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { register } from '../redux/actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const SignupPage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionLevel, setSubscriptionLevel] = useState('Basic');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, subscriptionLevel));
  };

  if (userInfo) {
    navigate('/dashboard');
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="subscriptionLevel">
          <Form.Label>Subscription Level</Form.Label>
          <Form.Control
            as="select"
            value={subscriptionLevel}
            onChange={(e) => setSubscriptionLevel(e.target.value)}
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" className="mt-3" variant="primary" data-cy="signup-link">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <a href="/login">Login</a>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SignupPage;
