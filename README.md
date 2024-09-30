# Pre-Requisites

1. Install the latest node version **v22.7.0**

## Client Dependencies
1. Navigate to the client directory

``cd /client-sq``

2. Install client dependencies
``npm i``


## Server Dependencies
1. Navigate to the server directory

``cd /client-sq``

2. Install server dependencies
``npm i``

# Client and Server Integration Setup
In order to integrate the client and server projects, we need to set up a couple of things
1. Creating an App in Spotify Developers
2. Setting up environmental variables

### Creating an App in Spotify Developers
Go to the https://developer.spotify.com. Create an account if not yet created. Once you create an account or if you have an account already:
1. Go to the dashboard: https://developer.spotify.com/dashboard
2. Click on the "Create App" button (This should be on the top right if the UI doesn't change)
3. Fill in the information. When you reach `redirect URIs`, you will place in the the <b>base url </b> of your client project with the `/auth` route appended. <br/><br/>
Example if client is running in <b>local host </b>: `http://localhost:3000/auth`
4. For the `Which API/SDKs are you planning to use?`, select the <b> Web API </b> checkbox
5. Agree to the Developer Terms of Services
6. Click the Save Butoton

### Setting up environmental variables
There are two .env files that needs to be created.
1. Inside the root of the `client-sq` directory
2. Inside the root of the `server-sq` directory

For the sake of the examples below. Assume the following:
1. The <b>client</b> runs in `http://localhost:3000`
2. The <b>server</b> runs in `http://localhost:3001`

#### Client Project

There are 2 variables needed in this project
1. `REACT_APP_CLIENT_ID` - This is the Client ID that Spotify provides when you create a Spotify App
2. `REACT_APP_API_URL` - This is the base URL of the server. Ex: `http://localhost:3001`


#### Server Project
There are 3 variables needed in this project

1. `REACT_APP_CLIENT_ID` - This is the Client ID that Spotify provides when you create a Spotify App
2. `CLIENT_SECRET` - This is the Client Secret that Spotify provides when you create a Spotify App
3. `SITE_URL` - This is the base URL of the client project. Ex: `http://localhost:3000`

<b>Congratulations! You have set up the project and it should be working as intended <b/>
