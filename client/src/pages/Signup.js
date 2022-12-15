import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';


const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(CREATE_USER);
  
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
      <main className="">
        <div className="">
          <div className="">
            <h4 className="">Sign Up</h4>
            <div className="">
              <form onSubmit={handleFormSubmit}>
                <input
                  className=""
                  placeholder="Your username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className=""
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className=""
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="btn d-block w-100" type="submit">
                  Submit
                </button>
              </form>
              {error && <div>Sign up failed</div>}
            </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default Signup;
  