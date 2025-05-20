# Project Cost Tracker

This project is a mini web application built as part of a Frontend Developer Internship evaluation task. 
It allows users to manage a project, its items, and all associated costs with real-time updates and secure authentication.

## Features

- Add, edit, and delete items with their costs
- Add, edit, and delete other costs with descriptions and amounts
- Display total project cost (sum of items and other costs)
- State management using Redux Toolkit
- UI built with Chakra UI for a clean and responsive design
- Data persistence using Firebase Firestore
- User authentication with Firebase Authentication (Google Sign-In)
- Bonus features:
  - Data persistence with localStorage
  - Cost filters and sorting options
  - Responsive design for mobile and desktop

## Technologies Used

- React with Hooks and component-based architecture
- Redux Toolkit for state management
- Chakra UI for styling
- Firebase (Authentication and Firestore) for backend services
- TypeScript for type safety
- Vite as the build tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account and project setup

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-cost-tracker/project-cost-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Update the `src/firebaseConfig.ts` file with your Firebase project credentials.
   - Add your local development URL and deployed site URL to Firebase Authentication authorized domains.

### Running Locally

Start the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:3000` (or the port shown in the terminal).

### Building for Production

Build the project:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview -- --host
```

### Deployment

Deploy the built project to any static hosting service such as Netlify, Vercel, or GitHub Pages.

For Netlify deployment:

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:

   ```bash
   netlify deploy
   ```

3. Follow the prompts to select the `dist` folder and configure your site.

4. Publish the site:

   ```bash
   netlify deploy --prod
   ```

## Troubleshooting

- If login fails on the deployed site, ensure your hosting domain is added to the Firebase Authentication authorized domains list.
- Check firewall settings if hosting locally and others cannot access the preview server.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the project maintainer.
