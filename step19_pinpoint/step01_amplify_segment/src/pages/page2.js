import React from 'react';

export default function Page2() {
  return (
    <div>
      <div>We are on Page 2 detection</div>
      <div>
        <button
          onClick={() => {
            console.log('Button clicked sending record');
          }}
        >
          Click Here for Page 2 Event
        </button>
      </div>
    </div>
  );
}
