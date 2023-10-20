# React GitHub Repository Search and Server App

## Overview:
This application allows users to search for GitHub repositories and view a list of selected repositories. The app also has a server that proxies requests to an internal repository management system.

### Functionalities:
- Search for GitHub repositories.
- Select and save up to 10 repositories.
- Display the list of saved repositories.
- Sort the list of saved repositories.
- Delete saved repositories.
- Server provides health check and CRUD (minus update) operations for repositories.

## Containerization:

### Requirements:
- Docker installed on your machine.

### Steps to run the  \App using Docker:
in the root of the project run `docker-compose build && docker-compose up`
