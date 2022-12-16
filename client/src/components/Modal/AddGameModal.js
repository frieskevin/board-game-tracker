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
        gameModalTitle: '', 
        gameModalUsername: '', 
        gameModalWinner:'', 
        gameModalScore: '',
        gameModalNotes: '',
        gameModalLink: '',
        gameModalImage: '',
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
                variables: {...formState }
            })
            console.log(formState);
        } catch (error) {
            console.log(error)
        }
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
                                    <Label for="gameModalTitle">
                                        Game Title
                                    </Label>
                                    <Input
                                        id="gameModalTitle"
                                        name="gameModalTitle"
                                        placeholder="Add Your Game's Title Here"
                                        type="text"
                                        value={formState.gameModalTitle}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="gameModalUsername">
                                        Players
                                    </Label>
                                    <Input
                                        id="gamemodalUsername"
                                        name="gameModalUsername"
                                        placeholder="Add the Players Here"
                                        type="text"
                                        value={formState.gameModalUsername}
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
                                id="gameModalWinner"
                                name="gameModalWinner"
                                placeholder="Who Won?"
                                type="Text"
                                value={formState.gameModalWinner}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gameModalScore">
                                Score
                            </Label>
                            <Input
                                id="gameModalScore"
                                name="gameModalScore"
                                placeholder="What was the score?"
                                type="text"
                                value={formState.gameModalScore}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gameModalNotes">
                                Game Notes
                            </Label>
                            <Input
                                id="gameModalNotes"
                                name="gameModalNotes"
                                placeholder="Anything you would like to rememeber for next Game?"
                                type="textarea"
                                value={formState.gameModalNotes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="gameModalLink">
                                            Link
                                        </Label>
                                        <Input
                                            id="gameModalLink"
                                            name="gameModalLink"
                                            placeholder="Add a link to the game rules."
                                            type="text"
                                            value={formState.gameModalLink}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="gameModalImage">
                                            Image
                                        </Label>
                                        <Input
                                            id="gameModalImage"
                                            name="gameModalImage"
                                            placeholder="Add an image of your Game."
                                            type="text"
                                            value={formState.gameModalImage}
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