# URL Shortening

A URL shortening service that creates a six-character path: three letters and three numbers. This website is developed on the backend with Node.js, Express Js, TypeScript, and MongoDB, while the frontend uses HTML, CSS, and JavaScript.

## Requirements

- Node.js must be installed.
- MongoDB must be installed.

## How to run

Perform the following steps:

- To install dependencies, run in console:

```bash
npm install
```

- To build the project, run in console:

```bash

npm run build
```

- To start the project, run in console:

```bash
npm run start
```

- To use URL Shortening, open in your browser. (port assigned or port 3000)

```bash
http://localhost:3000/
```

### API Endpoints

- Create Short URL

```bash
POST /shorten
{
  "url": "https://expressjs.com/"
}
```

- Retrieve Original URL

```bash
GET /shorten/exp823
```

```bash
{
  "_id": "687a909b42dee4616f1c5730",
  "url": "hhttps://expressjs.com/",
  "shortCode": "exp823",
  "createdAt": "2025-07-18T18:21:15.414Z",
  "updatedAt": "2025-07-18T18:21:15.414Z"
}
```

- Update Short URL

```bash
PUT /shorten/exp823
{
  "url": "https://expressjs.com/"
}
```

```bash
{
  "_id": "687a909b42dee4616f1c5730",
  "url": "https://expressjs.com/",
  "shortCode": "exp823",
  "createdAt": "2025-07-18T18:21:15.414Z",
  "updatedAt": "2025-07-18T18:24:03.654Z"
}
```

- Delete Short URL

```bash
DELETE /shorten/exp823
```

- Get URL Statistics

```bash
GET /shorten/exp823/stats
```

```bash
{
  "_id": "687a92b142dee4616f1c5732",
  "url": "https://expressjs.com/",
  "shortCode": "exp823",
  "createdAt": "2025-07-18T18:30:09.195Z",
  "updatedAt": "2025-07-18T18:30:09.195Z",
  "accessCount": 7
}
```
