import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Col,
  Label,
  Form,
  Row
} from 'reactstrap';

function LoginModal(args) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
    
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await login({
          variables: { ...formState }
        });
  
        Auth.login(data.login.token)
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Login
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form onSubmit={handleFormSubmit}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col>
                <Label
                  className="visually-hidden"
                  for="exampleEmail"
                >
                  Email
                </Label>
                <Input
                  id="login-email"
                  name="email"
                  placeholder="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Label
                  className="visually-hidden"
                  for="examplePassword"
                >
                  Password
                </Label>
                <Input
                  id="login-password"
                  name="password"
                  placeholder="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Col>
              </Row>
              <Button color="primary" type='submit' value="submit">
            Login
          </Button>
          </Form>
          {error && <div>Login Failed</div>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type='submit'>
            Login
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginModal;