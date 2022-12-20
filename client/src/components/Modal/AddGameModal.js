import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import { useMutation } from '@apollo/client';
import { ADD_GAME} from '../../utils/mutations';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from 'reactstrap';

function AddGameModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formState, setFormState] = useState({
        title: '',
        username: '',
        winner: '',
        score: '',
        gameNotes: '',
        link: '',
        image: '',
    });

    const [addGame, { error }] = useMutation(ADD_GAME);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        

        try {
            await addGame({
                variables: { ...formState },
            });

        } catch (error) {
            console.log(error)
        }

        //clear form state
        setFormState({
            title: '',
            username: '',
            winner: '',
            score: '',
            gameNotes: '',
            link: '',
            image: '',
        });

    };

    return (
        <div>
            <div className="button-div font" >
            <Button color="danger" onClick={toggle} className='lg m-1 add-game-button font'>
                Add Game!
            </Button>
            </div>
            <Modal isOpen={modal} toggle={toggle} fullscreen>
                <ModalHeader size="lg" className="font game-modal-header" toggle={toggle}>Add Game!</ModalHeader>
                <ModalBody className="addGameModal">
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="game-label font" for="title">
                                        Game Title
                                    </Label>
                                    <Input
                                        id="title"
                                        className="font"
                                        name="title"
                                        placeholder="Add Your Game's Title Here"
                                        type="text"
                                        value={formState.title}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="game-label font" for="username">
                                        Players
                                    </Label>
                                    <Input
                                        id="username"
                                        className="font"
                                        name="username"
                                        placeholder="Add the Players Here"
                                        type="text"
                                        value={formState.username}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label className="font game-label" for="gameModalWinner">
                                Winner
                            </Label>
                            <Input
                                id="winner"
                                className="font"
                                name="winner"
                                placeholder="Who Won?"
                                type="Text"
                                value={formState.winner}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="game-label font" for="score">
                                Score
                            </Label>
                            <Input
                                id="score"
                                className="font"
                                name="score"
                                placeholder="What was the score?"
                                type="text"
                                value={formState.score}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="game-label font" for="gameNotes">
                                Game Notes
                            </Label>
                            <Input
                                id="gameNotes"
                                className="font"
                                name="gameNotes"
                                placeholder="Anything you would like to remember for next Game?"
                                type="textarea"
                                value={formState.gameNotes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="game-label font" for="link">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            className="font"
                                            name="link"
                                            placeholder="Add a link to the game rules."
                                            type="text"
                                            value={formState.link}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="game-label font" for="image">
                                            Image
                                        </Label>
                                        <Input
                                            id="image"
                                            className="font"
                                            name="image"
                                            placeholder="Add an image of your Game."
                                            type="text"
                                            value={formState.image}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {' '}
                            <Button onClick={toggle} className="submit-button" type="submit" value="submit" color='dark'>
                                Add Game
                            </Button>
                            <Button className="signup-cancel-button" onClick={toggle}>
                                Cancel
                            </Button>
                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddGameModal;