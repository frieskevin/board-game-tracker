import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'
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

function SignUpModal(args) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
    
  
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
        const { data } = await addUser({
          variables: { ...formState }
        });
  
        console.log(data);
        Auth.Login(data.adduser.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
        username: ''
      });
    };

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Sign Up
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Sign Up!</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleFormSubmit}>
                        <Row className="row-cols-lg-auto g-3 align-items-center">
                            <Col>
                                <div>
                                    <Input
                                        id="signUp-username"
                                        placeholder="username"
                                        name="username"
                                        type="text"
                                        value={formState.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Label
                                    className="visually-hidden"
                                    for="examplePassword"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="password!"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Label
                                className="visually-hidden"
                                for="exampleEmail"
                            >
                                Email
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </Row>
                        <Button type="submit" value="submit">
                        Submit
                    </Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                   
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default SignUpModal;