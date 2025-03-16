# E-Commerce Frontend Application

A modern, responsive e-commerce frontend application built with React, TypeScript, and Material-UI.

## Features

### Authentication
- User registration with form validation
- Secure login with password visibility toggle
- Protected routes for authenticated users
- Persistent user sessions

### Theme
- Dynamic light/dark mode toggle
- Custom orange theme in light mode
- Blue accent theme in dark mode
- Glassmorphism effects for modern UI
- Responsive design for all screen sizes

### Shopping Experience
- Product listing with grid layout
- Product details view
- Shopping cart functionality
  - Add/remove items
  - Update quantities
  - Cart persistence per user
  - Real-time total calculation

### UI/UX Features
- Modern glassmorphism design
- Smooth animations and transitions
- Responsive navigation
- Loading states and error handling
- Form validation with helpful error messages

## Technologies Used  

- **React 18** - Frontend library
- **TypeScript** - Type safety and better developer experience
- **Material-UI (MUI)** - UI component library
- **Redux Toolkit** - State management
- **React Router** - Navigation and routing
- **Formik** - Form handling
- **Yup** - Form validation
- **Vite** - Build tool and development server

### Demo (Images of the Website)
<img width="1429" alt="Screenshot 2025-03-16 at 6 13 52 PM" src="https://github.com/user-attachments/assets/f84bfd09-c002-4f95-a695-0cb2022f75da" />
<img width="1118" alt="Screenshot 2025-03-16 at 6 14 39 PM" src="https://github.com/user-attachments/assets/8c00a028-0fc4-4c33-9229-b48286568c9e" />
<img width="1112" alt="Screenshot 2025-03-16 at 6 14 44 PM" src="https://github.com/user-attachments/assets/aa7fdc36-5c3f-43b7-867d-6530ce03218a" />
<img width="1114" alt="Screenshot 2025-03-16 at 6 14 49 PM" src="https://github.com/user-attachments/assets/5e2e55bc-f387-4b55-96b7-073004f72721" />




## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── auth/          # Authentication components
│   ├── cart/          # Shopping cart components
│   └── products/      # Product-related components
├── store/             # Redux store configuration
│   └── slices/        # Redux slices
├── types/             # TypeScript type definitions
├── assets/            # Static assets
└── App.tsx           # Main application component
```

## Features in Detail

### Authentication
- Email and password validation
- Password requirements:
  - Minimum 8 characters
  - Maximum 16 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- User-specific cart persistence
- Protected routes for authenticated users

### Theme Customization
- Light Mode:
  - Primary color: #B84000 (Deep Orange)
  - Secondary color: #D65108 (Light Orange)
  - Background: Light gradient
- Dark Mode:
  - Primary color: #1E88E5 (Blue)
  - Secondary color: Dark theme colors
  - Background: Dark gradient

### Shopping Cart
- Per-user cart storage
- Real-time quantity updates
- Persistent cart data
- Clear cart on logout
- Cart badge with item count


