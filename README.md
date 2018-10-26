<p align="center">
  <a href="https://directus.io" target="_blank" rel="noopener noreferrer">
    <img src="https://user-images.githubusercontent.com/522079/43096167-3a1b1118-8e86-11e8-9fb2-7b4e3b1368bc.png" width="140" alt="Directus Logo"/>
  </a>
</p>

<h1 align="center">
  Directus Javascript SDK
</h1>

<h3 align="center">
  <a href="https://directus.io">Website</a> • 
  <a href="https://docs.directus.io">Docs</a> • 
  <a href="https://docs.directus.io/api/reference.html">API Reference</a> • 
  <a href="https://docs.directus.io/app/user-guide.html">User Guide</a> • 
  <a href="https://directus.app">Demo</a> • 
  <a href="https://docs.directus.io/supporting-directus.html">Contribute</a>
</h3>

<p>&nbsp;</p>

> _This codebase is a work-in-progress. The repo is here as a placeholder for anyone interested in contributing to the software development kit. Pull-requests and contributions are welcome!_

<p>&nbsp;</p>

## Installation

Install the package using [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com/):
`npm install directus-sdk-javascript --production` or `yarn add directus-sdk-javascript`

Or download the repo and include `/dist/remote.js` into your document:
`<script src="/dist/remote.js"></script>`

Or use a service that distributes npm packages like [unpkg](https://unpkg.org):
`<script src="https://unpkg.com/directus-sdk-javascript/dist/remote.js"></script>`

## Usage

Create a new client passing it the options needed to create a connection:

```javascript
// Only in Node / non-bundled version:
const RemoteInstance = require('directus-sdk-javascript/remote');

// Or (es6+):
import { RemoteInstance } from 'directus-sdk-javascript';

const client = new RemoteInstance({
  url: 'http://instance.directus.io/',
  version: '1.1', // optional, only need to update if different from default
  accessToken: [user-token] // optional, can be used without on public routes
});
```

The client provides methods for each API endpoint. Every endpoint returns a promise which resolves the APIs JSON on success and rejects on an error:

```javascript
client.getItems('projects')
  .then(res => console.log(res))
  .catch(err => console.log(err));
```


Get and update the current logged in user:

```javascript
client.getMe()
  .then(res => console.log(res))
  .catch(err => console.log(err));

client.updateMe({first_name: 'John', last_name: 'Doe'})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```


Custom api endpoints, implemented on the server under `customs/endpoints`, are also available. Here is an example for calling the `http://instance.directus.io/api/example` endpoint:

```javascript
client.getApi('example')
  .then(res => console.log(res))
  .catch(err => console.log(err));

client.postApi('example', {custom_var: 'value'})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

Since the SDK uses promises, you can also use it with [async/await](https://www.youtube.com/watch?v=9YkUCxvaLEk):
```javascript
const projects = await client.getItems('projects');
```

Check [the official API docs for a complete overview of all endpoints and available methods](https://docs.directus.io/api/reference.html)

<p>&nbsp;</p>

----

<p align="center">
  Directus is released under the <a href="http://www.gnu.org/copyleft/gpl.html">GPLv3</a> license. <a href="http://rangerstudio.com">RANGER Studio LLC</a> owns all Directus trademarks and logos on behalf of our project's community. Copyright © 2006-2018, <a href="http://rangerstudio.com">RANGER Studio LLC</a>.
</p>
