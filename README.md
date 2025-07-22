# E-Commerce Frontend 🛒

This is the frontend application for a full-featured e-commerce platform built with React.js and TypeScript. It integrates with a MERN stack backend to provide a seamless shopping experience.

## Features 🚀

### User Interface
- Responsive design with SCSS styling
- Product browsing with search and filters
- Shopping cart and wishlist management
- Secure checkout and order tracking
- User authentication via Google OAuth

### Admin Dashboard
- Real-time analytics with Chart.js visualizations (bar, line, pie charts)
- Management interfaces for products, orders, users, and inventory
- Coupon and category management

### Technical Highlights
- **State Management:** Redux Toolkit and RTK Query for efficient data handling
- **Notifications:** React Hot Toast
- **Icons:** React Icons
- **Build Tool:** Vite for fast development
- **Linting:** ESLint with TypeScript support

## Dependencies 📦

### Production Dependencies
- `@reduxjs/toolkit`: ^2.8.2
- `6pp`: ^1.3.10
- `axios`: ^1.10.0
- `chart.js`: ^4.5.0
- `firebase`: ^11.9.1
- `framer-motion`: ^12.22.0
- `moment`: ^2.30.1
- `react`: ^18.2.0
- `react-chartjs-2`: ^5.3.0
- `react-dom`: ^18.2.0
- `react-hot-toast`: ^2.5.2
- `react-icons`: ^5.5.0
- `react-redux`: ^9.2.0
- `react-router-dom`: ^7.6.2
- `react-table`: ^7.8.0
- `sass`: ^1.89.2

### Dev Dependencies
- `@eslint/js`: ^9.25.0
- `@types/react`: ^18.2.0
- `@types/react-dom`: ^18.2.0
- `@types/react-table`: ^7.7.20
- `@vitejs/plugin-react-swc`: ^3.9.0
- `eslint`: ^9.25.0
- `eslint-plugin-react-hooks`: ^5.2.0
- `eslint-plugin-react-refresh`: ^0.4.19
- `globals`: ^16.0.0
- `typescript`: ~5.8.3
- `typescript-eslint`: ^8.30.1
- `vite`: ^6.3.5

## Getting Started 🏁

### Prerequisites
- Node.js (v14 or higher)
- Backend server running (see main project README)

### Installation

1. Navigate to this directory:
```bash
cd e-commerce-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```bash
# Backend .env
PORT=
MONGODB_URI=
FIREBASE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Frontend .env
VITE_FIREBASE_KEY=
VITE_SERVER_URL=
VITE_RAZORPAY_KEY=
```

5. Start the development servers
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

## Project Structure 📁

```
MERN-ECOMMERCE-2025/
├── e-commerce-backend/     # Backend server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── app.ts         # Express app
│   └── package.json
│
└── e-commerce-frontend/    # Frontend client
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/        # Page components
    │   ├── redux/        # State management
    │   ├── styles/       # SCSS styles
    │   └── utils/        # Utility functions
    └── package.json
```

## Key Features in Detail 🔑

### Admin Dashboard
- Real-time analytics and reporting
- Comprehensive charts and statistics
- Order and inventory management
- User management system

### Shopping Features
- Intuitive product browsing
- Advanced search and filtering
- Secure checkout process
- Order tracking

### Security Features
- JWT authentication
- Role-based access control
- Secure payment processing
- Input validation

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Thanks to all contributors
- Built with modern web technologies
- Designed for scalability and performance

---
Made with ❤️ by [Gaurav Pal]
