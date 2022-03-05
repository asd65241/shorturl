# Short Url

This is a URL shortening web service project that have similar feature like [TinyUrl](https://tinyurl.com). 

## Usage

1. Git the current repository
  `git clone https://github.com/asd65241/shorturl.git`

2. Go to the folder
  `cd shorturl`

3. Create .env file
  `touch .env`

4. Fill the .env file using the following template

   ```
   MONGODB_KEY = 
   PORT = 
   BASE_URL = 
   ```

5. Run the Dev server
  `npm start`

6. View the Website
  `http://localhost:PORT/`

## Deploy 

### Using Docker Compose

Create a 'docker-compose.yml'

`$ touch docker-compose.yml`

Fill the 'docker-compose.yml' with the following template

```
services:
  shorturl:
      build: .
      image: "shorturl"
      port:
        - 80:8000
      container_name: "shorturl"
      restart: "always"
      networks: 
          - "net"
      environment:
            VIRTUAL_HOST: "YOUR-DOMAIN"
            LETSENCRYPT_HOST: "YOUR-DOMAIN"
            VIRTUAL_PORT: "80"
          
networks:
    net:
        external: true

```

Then, do the following command:

`$ sudo docker-compose up -d`

This will copy your environment variable to the container.

## Task

- [x] Short Url Status
  - [x] Click Origin
  - [x] Click Counter
  - [x] Copy to clipboard button
  - [x] IP History
  - [ ] Timeseries Chart
- [ ] QR code
- [ ] Authentication
- [ ] Table Batch Import/Export
  - [ ] With Batch QRcode generator

## Demo Link

https://s.argle.cc/

