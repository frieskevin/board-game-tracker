
import React, { useState } from 'react';
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

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Sign Up
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Sign Up!</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row className="row-cols-lg-auto g-3 align-items-center">
                            <Col>
                                <div>
                                    <Input
                                        className="username"
                                        placeholder="Username"
                                        type="text"
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
                            />
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button>
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default SignUpModal;