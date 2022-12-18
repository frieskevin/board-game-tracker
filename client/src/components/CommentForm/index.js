import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { Button } from 'reactstrap';

const CommentForm = ({ gameId }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, gameId },
            });

            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch container"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Comment on this game..."
                    value={commentBody}
                    className="form-input col-12 col-md-9 mb-0"
                    onChange={handleChange}
                ></textarea>

                <Button className="btn col-12 col-md-3 mt-2 mb-5" type="submit">
                    Submit
                </Button>
            </form>

            {/* {error && <div>Something went wrong...</div>} */}
        </div>
    );
};


export default CommentForm;