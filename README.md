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

### API Endpoints

- Create Short URL

```bash
POST /shorten
{
  "url": "https://www.example.com/some/long/url"
}
```

- Retrieve Original URL

```bash
GET /shorten/abc123
```

```bash
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

- Update Short URL

```bash
PUT /shorten/abc123
{
  "url": "https://www.example.com/some/updated/url"
}
```

```bash
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

- Delete Short URL

```bash
DELETE /shorten/abc123
```

- Delete Short URL

```bash
GET /shorten/abc123/stats
```

```bash
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 10
}
```

- To use short URL, open in your browser. (port assigned or port 3000)

```bash
http://localhost:3000/abc123
```
