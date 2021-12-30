# Amplify Segment

## Reading Materila

- [Integrating the AWS mobile SDKs or JavaScript library with your application](https://docs.aws.amazon.com/pinpoint/latest/developerguide/integrate-sdk.html)
- [Registering endpoints in your application](https://docs.aws.amazon.com/pinpoint/latest/developerguide/integrate-endpoints.html)

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

4. Create the project an amplify project using `amplify init`

5. Install aws amplify in the app using `yarn add aws-amplify`

6. Create an identity pool with un-auth enabled.
7. Update un-auth poilcy.
8. Update "index.tsx" to configure amplify

```js
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';

const amplifyConfig = {
  Auth: {
    identityPoolId: 'COGNITO_IDENTITY_POOL_ID',
    region: 'us-west-2',
  },
};
//Initialize Amplify
Auth.configure(amplifyConfig);

const analyticsConfig = {
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: 'ed46861429224c4ca0feee765cedba3e',
    // Amazon service region
    region: 'us-west-2',
    mandatorySignIn: false,
  },
};

Analytics.configure(analyticsConfig);
```

9. Update "index.tsx" to record an event on click

```js
<button
  onClick={() => {
    console.log('Button clicked sending record');
    Analytics.record({
      name: 'ButtonClickedHome',
      attributes: { name: name, email: email },
    });
  }}
>
  Click Here
</button>
```

```js
<button
  onClick={() => {
    console.log('Button clicked sending record');
    Analytics.record({
      name: 'MoveToPage2',
      attributes: { name: 'Page2Movement' },
    });
    navigate('/page2');
  }}
>
  Go to Page 2
</button>
```

```js
Analytics.updateEndpoint({
  userAttributes: {
    interests: ['football', 'basketball', 'AWS'],
    // ...
  },
  attributes: {
    // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
    hobbies: ['piano', 'hiking'],
  },
});
Analytics.record({
  name: 'Home',
  attributes: { genre: 'Rock', year: '1989' },
});
```

10. Same way update "page.js"
11. Build using `gastby build`
12. `amplify serve`
