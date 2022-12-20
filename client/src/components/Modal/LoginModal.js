import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import {
  Button,
  NavLink,
  NavItem,
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
      })

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
      <NavItem>
        <NavLink onClick={toggle} className='login'>
        <span className='font'>Login</span>
      </NavLink>
      </NavItem>
      
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader className="font" toggle={toggle}>Login!</ModalHeader>
        <ModalBody className="login-modal">
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
                  className="font"
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
                  className="font"
                  name="password"
                  placeholder="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Button className="login-button font" type='submit' value="submit" color='dark'>
              Login
            </Button>
            {error && <div>Login Failed</div>}
            <Button className="login-cancel-button font" color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>

        </ModalFooter>


      </Modal>
    </div>
  );
}

export default LoginModal;