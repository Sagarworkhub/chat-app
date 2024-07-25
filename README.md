# Chat App

A full-stack chat application built using the MERN stack: MongoDB, Express, React, and Node.js.

## Features

- **User Authentication:** Login and Sign up pages for user registration and authentication.
- **Profile Management:**
  - After successful sign up, users are redirected to a profile page to upload an image, enter their name, and select a profile color.
  - If a user logs out before completing their profile, they will be prompted to complete their profile data on the next login.
- **Chat Functionality:**
  - **Direct Messages:**
    - Users can click the plus icon next to Direct Messages to open a popup where they can search for and select users to chat with.
    - Users can send text messages, emojis, images, and files in the chat. Both sender and receiver can view and download these files and images.
  - **Channels:**
    - Users can click the plus icon next to Channels to open a popup window where they can create a new channel by typing a channel name and selecting multiple users as members.
    - Channels have the same functionality as direct messages, allowing users to send text, emojis, images, and files, and download them.
- **Profile and Logout:**
  - User's name is displayed at the bottom left side of the chat page.
  - From there, users can edit their profile or logout.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sagarworkhub/chat-app.git
   cd chat-app
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. Open `.env` file in the `server` change the following environment variables according to your configuration:

   ```env
   PORT=port_to_run_server
   JWT_KEY=your_jwt_secret
   ORIGIN=your_client_application_running_url
   DATABASE_URL=your_mongodb_connection_string
   ```

2. Open `.env` file in the `client` change the following environment variables if needed for any client-side configuration.

   ```env
   VITE_SERVER_URL=your_server_application_running_url
   ```

### Running the Application

1. Start the server:

   ```bash
   cd server
   npm run dev
   ```

2. Start the client:

   ```bash
   cd ../client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Sign up:** Create a new account using the sign up page.
2. **Login:** Log in with your credentials.
3. **Complete Profile:** Upload an image, enter your name, and select a profile color.
4. **Chat:**
   - Click the plus icon next to Direct Messages to start a new chat.
   - Click the plus icon next to Channels to create a new group chat.
5. **Profile Management:** Edit your profile or log out from the bottom left side of the chat page.

## Testing

You can test the chat functionality by following these steps:

1. Open the client app in two different browsers or browser tabs.
2. Create two different users or log in with two different users.
3. Click the plus icon next to Direct Messages from one user, search for the other user, select them, and send a message, image, or file.
4. Both users should be able to see and download the sent message, image, or file.
5. You can also create a channel with multiple users and chat with them, testing the same sending and receiving functionalities.