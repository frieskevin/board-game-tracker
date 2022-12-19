import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
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
    const [addUser] = useMutation(ADD_USER);


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
            Auth.login(data.addUser.token);
            console.log(data.addUser.token, "in signup modal");
        } catch (e) {
            console.error(e);
        }
        // clear form values
        setFormState({
            email: '',
            password: '',
            username: ''
        });
        const loggedIn = Auth.loggedIn();
        if (loggedIn) {
            <Navigate to="/dashboard" />
        };

    };


    return (
        <div>
            <Button color="danger" onClick={toggle} className='m-1'>
                Sign Up
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader className="font" toggle={toggle}>Sign Up!</ModalHeader>
                <ModalBody className="signup-modal-body">
                    <Form onSubmit={handleFormSubmit}>
                        <Row className="row-cols-lg-auto g-3 align-items-center">
                            <Col>
                                <div>
                                    <Input
                                        id="signUp-username"
                                        className="font"
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
                                    for="examplePassword">
                                    Password
                                </Label>
                                <Input
                                    id="examplePassword"
                                    className="font"
                                    name="password"
                                    placeholder="password"
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
                                className="font"
                                name="email"
                                placeholder="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </Row>
                        <Button className="submit-button" type="submit" value="submit" color='dark'>
                            Submit
                        </Button>
                        <Button className="signup-cancel-button" color="secondary" onClick={toggle}>
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

export default SignUpModal;