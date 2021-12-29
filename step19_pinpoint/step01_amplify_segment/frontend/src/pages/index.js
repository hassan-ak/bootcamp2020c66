import React, { useState } from 'react';
import { navigate } from 'gatsby';
export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div>
      <div>Hello world! - Use Pinpoint with gatsby frontend</div>
      <div>
        <label>
          Name: <input type='text' onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:{' '}
          <input type='text' onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <button
          onClick={() => {
            console.log('Button clicked sending record');
          }}
        >
          Click Here
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            console.log('Button clicked sending record');
            navigate('/page2');
          }}
        >
          Go to Page 2
        </button>
      </div>
    </div>
  );
}
