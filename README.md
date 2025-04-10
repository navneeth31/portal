# University Portal

A modern, responsive web application for managing university operations and student information.

## Features

- 🎓 Student Management System
- 📝 Course Registration
- 📅 Academic Calendar
- 📚 Course Materials
- 📱 Mobile Responsive Design
- 🔐 Secure Authentication
- 🎨 Modern UI with Material Design

## Tech Stack

- **Frontend**: React.js with Material-UI
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Routing**: React Router
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/navneeth31/portal.git
```

2. Install dependencies:
```bash
cd portal
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:
- Frontend: `npm start`
- Backend: `npm run backend`

## Project Structure

```
portal/
├── backend/           # Backend server code
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── assets/     # Images and static files
│   │   └── styles/     # Global styles and themes
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies
└── README.md          # This file
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Material-UI for the design system
- Framer Motion for smooth animations
- Styled Components for styling
- React Router for navigation
