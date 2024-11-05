# Chat App

A mobile chat application built using React Native and Expo, designed to provide seamless messaging experiences, including image sharing, location sharing, and offline message access. This app also supports screen reader functionality for users with visual impairments.

## User Stories

The app is built to fulfill the following user needs:

**New User Access:** As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.<br>
**Message Exchange:** As a user, I want to be able to send messages to my friends and family members to exchange the latest news.<br>
**Image Sharing:** As a user, I want to send images to my friends to show them what I’m currently doing.<br>
**Location Sharing:** As a user, I want to share my location with my friends to show them where I am.<br>
**Offline Access:** As a user, I want to be able to read my messages offline so I can reread conversations at any time.<br>
**Accessibility:** As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Key Features
**User Onboarding:** A Start page where users can enter their name and choose a background color for the chat screen before joining the chat.<br>
**Chat Interface:** A Chat page displaying the conversation, including an input field and a submit button for sending messages.<br>
**Multimedia Communication:** Users can send images and share their location within the chat interface.<br>
**Data Persistence:** Messages and other data are stored both online and offline, allowing users to access previous conversations even when offline.

## Technical Requirements
This app is built using the following technologies and practices:

**React Native:** The app is written using React Native for mobile development.<br>
**Expo:** The app is developed using Expo for streamlined development and deployment.<br>
**Firestore Database:** Chat conversations are stored in Google Firestore for online access and persistence.<br>
**Firebase Authentication:** The app uses Firebase for anonymous user authentication.<br>
**Local Storage:** Conversations are also stored locally, allowing users to read messages offline.<br>
**Firebase Cloud Storage:** Images sent within the chat are stored in Firebase Cloud Storage.<br>
**Location Sharing:** Users can share their location, which is displayed as a map view in the chat.<br>
**Gifted Chat Library:** The chat interface and functionality are built using the Gifted Chat library.<br>
**Comments and Documentation:** The codebase is well-documented with comments for clarity and ease of understanding.

## Setup
Follow these steps to set up the project locally:

1. Clone the repository:

```bash
git clone https://github.com/elodloic/ChatApp.git
cd ChatApp#

2. Install dependencies:

Make sure to have Node.js v18.20.4 installed. Then run this command in a terminal to install the dependencies in the project folder:
```bash
npm install#

Then install the Expo CLI as a global dependency (if you haven't already):
```bash
npm install -g expo-cli#

Configure Firebase: Go to Firebase Console, create a new project, and add a web app. Then copy your Firebase config credentials. Finally, add them to the "Firebase credentials" section of the "App.js" file:

```bash
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID"#

Run the app locally:
```bash
npm run start#

## How to Use
1. On the Start page, enter your name and select a background color.
2. Click the "Join Chat" button to enter the chat room.
3. Use the input field to type and send messages.
4. Click the image or location icons to share images from your gallery, take new photos, or share your current location.
