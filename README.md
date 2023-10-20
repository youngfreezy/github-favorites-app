# React GitHub Repository Search and Server App

## Overview:
This application allows users to search for GitHub repositories and view a list of selected repositories. The app also has a server that proxies requests to an internal repository management system.

### Functionalities:
- Search for GitHub repositories.
- Select and save up to 10 repositories.
- Display the list of saved repositories.
- Sort the list of saved repositories.
- Delete saved repositories.
- Server provides health check and CRUD operations for repositories.

## Containerization:

### Requirements:
- Docker installed on your machine.

### Steps to run the  App using Docker:
in the root of the project run `docker-compose build && docker-compose up`

### Steps to run the server using Docker:
1. Navigate to server dir
2. build the docker image: docker build -t github-fav-repos-server -f Dockerfile .
3. docker run -d -p 4000:4000 github-fav-repos-server
