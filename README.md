# Netflix GPT

Netflix GPT is a modern, scalable web application built with React, designed to replicate core functionalities of a streaming platform like Netflix with advanced features such as AI-powered movie search. The app integrates Firebase for authentication, the IMDb API for categorized movie fetching, and the ChatGPT API for dynamic movie recommendations. It features an intuitive and responsive user interface, ensuring a seamless experience across devices.

## Features

- **Login/Signup**
  - User-friendly sign-in and sign-up forms.
  - Redirects to the browse page upon successful authentication.
- **Browse (Post-Authentication)**
  - Dynamic header with navigation.
  - Main movie section with a background trailer, title, and description.
  - Curated movie suggestions based on categories.
- **Netflix GPT**
  - AI-powered search bar leveraging the ChatGPT API for dynamic movie recommendations.
  - Displays movie suggestions based on user queries.
- **Scalability**
  - Modular architecture for easy feature expansion.
  - Optimized for performance with state management via Redux Toolkit.
- **Responsive Design**
  - Intuitive UI compatible with mobile, tablet, and desktop devices.

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Router DOM, Tailwind CSS
- **Authentication**: Firebase Authentication
- **APIs**:
  - IMDb API for categorized movie data
  - ChatGPT API for AI-driven movie recommendations
- **Build Tools**: Vite , npm

## Prerequisites

Before setting up the project, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase CLI (for Firebase deployment)
- API keys for:
  - IMDb API
  - ChatGPT API
  - Firebase project credentials

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Balu2200/netflix-gpt.git
   cd netflix-gpt
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   Key dependencies include:
   ```json
   "@reduxjs/toolkit": "^2.5.0",
   "react-router-dom": "^7.1.1",
   "tailwindcss": "^3.4.17"
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_IMDB_API_KEY=your_imdb_api_key
   VITE_CHATGPT_API_KEY=your_chatgpt_api_key
   ```

4. **Set up Tailwind CSS**:
   Ensure Tailwind CSS is configured by following the official [Tailwind CSS installation guide](https://tailwindcss.com/docs/guides/vite) for Vite or Create React App.

5. **Start the development server**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Firebase Setup

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Log in to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase**:
   Run the following command in the project root:
   ```bash
   firebase init
   ```
   - Select **Hosting** and **Firestore** (if needed).
   - Choose your Firebase project.
   - Set the public directory to `dist` (for Vite) or `build` (for Create React App).

4. **Deploy to Firebase**:
   After building the project (`npm run build`), deploy it:
   ```bash
   firebase deploy
   ```

## Project Structure

```
netflix-gpt/
├── public/                    # Static assets
├── src/        
│   ├── components/            # Reusable React components
│   ├── hooks/                 # redux store to store slices of movies.             
│   ├── utils/                 # API calls (IMDb, ChatGPT)
│   ├── styles/                # Tailwind CSS and custom styles
│   ├── App.js                 # Main app component
│   ├── main.js                # Entry point
├── .env                       # Environment variables
├── tailwind.config.js         # Tailwind CSS configuration
├── firebase.json              # Firebase configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Running the App

- **Development**:
  ```bash
  npm start
  ```
- **Build**:
  ```bash
  npm run build
  ```
- **Preview Build**:
  ```bash
  npm run preview
  ```

## API Integration

- **IMDb API**: Fetches categorized movie data (e.g., Top 250, Popular, etc.).
- **ChatGPT API**: Powers the Netflix GPT search bar for dynamic, AI-driven movie suggestions.
- **Firebase Authentication**: Handles secure user login/signup with email or Google OAuth.

## Scalability and Performance

- **State Management**: Redux Toolkit ensures efficient state handling for movie data and user sessions.
- **Lazy Loading**: Components and assets are lazily loaded to optimize performance.
- **Modular Code**: Reusable components and services make the app easy to extend.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


## Contact

For questions or feedback, reach out via [balupasumarthi1@gmail.com]