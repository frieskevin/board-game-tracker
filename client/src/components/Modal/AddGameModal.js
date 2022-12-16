import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../../utils/mutations';
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
    Row,
    Col,
} from 'reactstrap';

function AddGameModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formState, setFormState] = useState({ 
        title: '', 
        username: '', 
        winner:'', 
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
        event.preventDefault();

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
            winner:'', 
            score: '',
            gameNotes: '',
            link: '',
            image: '',
        });
     };

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Add Game!
            </Button>
            <Modal isOpen={modal} toggle={toggle} fullscreen>
                <ModalHeader className="text-center" toggle={toggle}>Game Card</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="title">
                                        Game Title
                                    </Label>
                                    <Input
                                        id="title"
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
                                    <Label for="username">
                                        Players
                                    </Label>
                                    <Input
                                        id="username"
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
                            <Label for="gameModalWinner">
                                Winner
                            </Label>
                            <Input
                                id="winner"
                                name="winner"
                                placeholder="Who Won?"
                                type="Text"
                                value={formState.winner}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="score">
                                Score
                            </Label>
                            <Input
                                id="score"
                                name="score"
                                placeholder="What was the score?"
                                type="text"
                                value={formState.score}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gameNotes">
                                Game Notes
                            </Label>
                            <Input
                                id="gameNotes"
                                name="gameNotes"
                                placeholder="Anything you would like to rememeber for next Game?"
                                type="textarea"
                                value={formState.gameNotes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="link">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
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
                                        <Label for="image">
                                            Image
                                        </Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            placeholder="Add an image of your Game."
                                            type="text"
                                            value={formState.image}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button color="primary" type="submit" value="submit">
                        Add Game
                    </Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                   {' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddGameModal;