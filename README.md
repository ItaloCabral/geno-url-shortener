
# Geno URL Shortener

Geno URL Shortener is a simple URL shortening service built with Node.js, Express, and MongoDB. It allows users to create short links for long URLs and redirect to the original URLs using the short links.

You can test teh functionality [right here](https://geno-ti.com.br)

## Table of Contents

- [Geno URL Shortener](#geno-url-shortener)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
  - [API Endpoints](#api-endpoints)
    - [List All Links](#list-all-links)
    - [Create a Short Link](#create-a-short-link)
    - [Redirect to Original URL](#redirect-to-original-url)
    - [Health Check](#health-check)
  - [Development](#development)
  - [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/italocabral/geno-url-shortener.git
    cd geno-url-shortener
    ```

2. Install dependencies:

    ```sh
    yarn
    ```

    or

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

    ```env
    MONGODB_URI=<your-mongodb-connection-string>
    PORT=<port-number>
    ```

4. Build the project:

    ```sh
    yarn build
    ```

## Usage

Start the server:

```sh
yarn start
```

For development, use:

```sh
yarn dev
```

## Testing

Run tests using Vitest:

```sh
yarn test
```

Generate test coverage report:

```sh
yarn coverage
```

## API Endpoints

### List All Links

- **URL:** `/links/:userId`
- **Method:** `GET`
- **Description:** List all short links for a user.
- **Response:**

  ```json
  [
    {
      "userId": "user-id",
      "url": "original-url",
      "shortUrl": "short-url"
    }
  ]
  ```

### Create a Short Link

- **URL:** `/links`
- **Method:** `POST`
- **Description:** Create a new short link.
- **Request Body:**

  ```json
  {
    "userId": "user-id",
    "url": "original-url"
  }
  ```

- **Response:**

  ```json
  {
    "userId": "user-id",
    "url": "original-url",
    "shortUrl": "short-url"
  }
  ```

### Redirect to Original URL

- **URL:** `/link/:endpoint`
- **Method:** `GET`
- **Description:** Redirect to the original URL using the short link.
- **Response:** Redirects to the original URL.

### Health Check

- **URL:** `/check`
- **Method:** `GET`
- **Description:** Check if the server is running.
- **Response:**

  ```json
  {
    "message": "Up and running!"
  }
  ```

## Development

To start the development server with live reloading:

```sh
yarn dev
```

## License

This project is licensed under the MIT License.
