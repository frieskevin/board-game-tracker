import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import SignUpModal from '../components/Modal/SignUpModal';


const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
  
    // update state based on form input changes
    const handleChange = event => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value
      });
    };
  
    // submit form
    const handleFormSubmit = async event => {
      event.preventDefault();
  
      try {
        // execute addUser mutation and pass in variable data from from
        const { data } = await addUser({
          variables: { ...formState }
        });
  
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
     <>
      { <SignUpModal /> }
     </>
    );
  };
  
  export default Signup;
  