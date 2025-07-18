# URL Shortening Service

JavaScript solution for [URL Shortening Service](https://roadmap.sh/projects/url-shortening-service) from [roadmap.sh](https://roadmap.sh/).

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
  "url": "https://roadmap.sh/projects/url-shortening-service"
}
```

- Retrieve Original URL

```bash
GET /shorten/roa823
```

```bash
{
  "_id": "687a909b42dee4616f1c5730",
  "url": "https://roadmap.sh/projects/url-shortening-service",
  "shortCode": "roa823",
  "createdAt": "2025-07-18T18:21:15.414Z",
  "updatedAt": "2025-07-18T18:21:15.414Z"
}
```

- Update Short URL

```bash
PUT /shorten/roa823
{
  "url": "https://roadmap.sh/backend/projects"
}
```

```bash
{
  "_id": "687a909b42dee4616f1c5730",
  "url": "https://roadmap.sh/backend/projects",
  "shortCode": "roa823",
  "createdAt": "2025-07-18T18:21:15.414Z",
  "updatedAt": "2025-07-18T18:24:03.654Z"
}
```

- Delete Short URL

```bash
DELETE /shorten/roa823
```

- Get URL Statistics

```bash
GET /shorten/roa823/stats
```

```bash
{
  "_id": "687a92b142dee4616f1c5732",
  "url": "https://roadmap.sh/projects/url-shortening-service",
  "shortCode": "roa823",
  "createdAt": "2025-07-18T18:30:09.195Z",
  "updatedAt": "2025-07-18T18:30:09.195Z",
  "accessCount": 7
}
```
