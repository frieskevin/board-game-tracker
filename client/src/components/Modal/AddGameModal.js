import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Row,
    Col,
} from 'reactstrap';

function AddGameModal(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Add Game!
            </Button>
            <Modal isOpen={modal} toggle={toggle} fullscreen>
                <ModalHeader className="text-center" toggle={toggle}>Game Card</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Game Title
                                    </Label>
                                    <Input
                                        id="game-title"
                                        name="game-modal-title"
                                        placeholder="Add Your Game's Title Here"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Players">
                                        Players
                                    </Label>
                                    <Input
                                        id="players"
                                        name="players-game-modal"
                                        placeholder="Add the Players Here"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Winner
                            </Label>
                            <Input
                                id="winner"
                                name="winner-game-modal"
                                placeholder="Who Won?"
                                type="Text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Score">
                                Score
                            </Label>
                            <Input
                                id="score"
                                name="score-game-modal"
                                placeholder="What was the score?"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Game-notes">
                                Game Notes
                            </Label>
                            <Input
                                id="Game-notes-textarea"
                                name="game-notes-modal"
                                placeholder="Anything you would like to rememeber for next Game?"
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="game-link">
                                            Link
                                        </Label>
                                        <Input
                                            id="game-link"
                                            name="game-link-in-modal"
                                            placeholder="Add a link to the game rules."
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="game-image">
                                            Image
                                        </Label>
                                        <Input
                                            id="image-in-modal"
                                            name="image-in-modal"
                                            placeholder="Add an image of your Game."
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Add Game
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddGameModal;