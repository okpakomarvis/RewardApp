# Daily Rewards System Web Application

## Overview
This web application is a subscription-based platform that incentivizes user engagement through a Daily Rewards system. Users can earn rewards daily based on their subscription level, with bonus rewards for consecutive logins. The application is built with a React js frontend and a Node.js backend, ensuring a modular, scalable, and testable codebase.

## Features
* User Authentication: Users can sign up and log in to access the platform.
* Subscription Levels: Three subscription levels are available—Basic, Premium, and VIP—each offering different daily rewards.
* Daily Rewards: Users can claim rewards once every 24 hours, with a bonus on the 7th consecutive day of logging in.
* Responsive Dashboard: A user-friendly dashboard displays subscription details, available rewards, and a countdown to the next reward.
* JWT Authentication: Secure API endpoints using JWT tokens.
* Unit-Testing: Comprehensive testing to ensure functionality accros the backend
* End-to-End : Comprehensive testing to ensure functionality on frontend.

## Technology Stack
### Frontend:
* React.js: For building the user interface.
* Bootstrap: For responsive and consistent styling across devices.
* Redux: For data fetching and state management.
* Cypress: For end-to-end testing.
### Backend:
* Node.js: For server-side logic.
* Express.js: For handling API requests and routing.
* JWT: For secure user authentication.
* Mongodb Atlas: For storing user data and reward states.

## Installation and Setup
### Prerequisites:
* Node.js: v14 or higher
* npm: v6 or higher
* Mongodb atlas: any version
  
1. Clone the Repository
```bash
git clone https://github.com/okpakomarvis/RewardApp.git
cd RewardApp
```
2. Backend Setup
* Navigate to the backend directory:
  
```bash
cd backend or git checkout backend
```
* Install dependencies:
```bash
npm install
```
Create a .env file with the following variables if .env file is not found on the rootfolder and add the your connecting settings:
* Install dependencies:
```env
PORT=5000
JWT_SECRET=Your_secret_key
MONGO_URI= your_Mongodb_connect_string_Url
```
* Start the backend server:
```bash
npm start
```
3. Frontend Setup
* Navigate to the frontend directory:
```bash
cd frontend or git checkout frontend
```
* Install dependencies:
```bash
npm install
```
* Start the React development server:
```bash
npm start
```
4. Running Tests
### Backend Tests
*Run the unit tests:
```bash
npm run test
```
### Frontend Tests
* Run Cypress end-to-end tests:
*Run the unit tests:
```bash
npx cypress open
```
## Usage
1. Signup and Login
* Visit the application homepage.
* Sign up with a new account or log in if you already have one.
2. Accessing the Dashboard
* After logging in, you’ll be redirected to the dashboard.
* The dashboard will display your current subscription level, available rewards, and a countdown to the next reward.
3. Claiming Rewards
* Click the "Claim Reward" button to claim your daily reward.
* If you maintain a streak of consecutive logins, a bonus reward will be given on the 7th day.
4. Logout
* You can log out of your account using the "Logout" button on the navigation bar.
## API Endpoints
### Authentication
* POST /api/auth/register: Register a new user.
* POST /api/auth/login: Authenticate a user and return a JWT.
### User and Rewards
* GET /api/users/profile: Fetch the authenticated user's details.
* GET /api/rewards/status: Fetch the user's daily reward status.
* POST /api/rewards/claim: Claim the daily reward.
* POST /api/rewards//reset: Reset streak 
