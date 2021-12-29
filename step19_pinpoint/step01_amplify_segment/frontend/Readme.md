# Amplify Segment

## Steps to code

1. Create a new directory by using `mkdir frontend` and naviagte to the newly created directory using `cd frontend`. Use `yarn init` to initilize an yarn project in the directory which creates a "package.json" file with the following content

   ```json
   {
     "name": "frontend",
     "version": "1.0.0",
     "description": "AWS pinpoint using amplify",
     "main": "index.js",
     "author": "Hassan Ali Khan",
     "license": "MIT",
     "private": true
   }
   ```

   Install gatsby, react and react dom using `yarn add gatsby react react-dom`. This will update packge.json and create node_modules.json along with yarn.lock. Update "package.json" to add scripts

   ```json
   "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "clean": "gatsby clean"
   }
   ```

   Create gatsby-config.js

   ```js
   module.exports = {
     plugins: [],
   };
   ```

   create "src/pages/index.js"

   ```js
   import React from 'react';
   export default function Home() {
     return <div>Home Page</div>;
   }
   ```

   create "src/pages/404.js"

   ```js
   import React from 'react';
   export default function Error() {
     return <div>Error Page</div>;
   }
   ```

   create ".gitignore"

   ```
   node_modules/
   .cache
   public/
   ```

   To run the site use `gatsby develop`

2. Update "src/pages/index.js" to edit the landing page to add a form to get name and email, a button to console msg on internet and a button to navigate to next page

   ```js
   import React, { useState } from 'react';
   import { navigate } from 'gatsby';
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
   ```

3. Create "src/pages/page2.js" to define another page

   ```js
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
   ```
