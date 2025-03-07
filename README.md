# 🔐 NextAuth Credentials Manager

A modern authentication system built with Next.js 14, featuring secure credential-based authentication and user management.

## 🌟 Overview

NextAuth Credentials Manager is a robust authentication solution that provides a secure and user-friendly login system. Built with Next.js and TypeScript, it implements best practices for authentication and session management.

## ✨ Features

- 🔒 Secure credential-based authentication
- 👤 User registration with data validation
- 🔑 Password management with encryption
- 🛡️ Protected dashboard routes
- 🔄 Session management
- ⚡ Real-time form validation
- 🎨 Modern UI with Radix UI components
- 📱 Responsive design

## 🛠️ Tech Stack

- Next.js 15
- TypeScript
- NextAuth.js
- Prisma
- PostgreSQL
- Zod Validation
- Radix UI
- Tailwind CSS
- Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/iritman/next-auth-credentials.git
cd next-auth-credentials
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

```env
DATABASE_URL="your_sqlserver_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 🔍 Features in Detail

### Authentication

- Secure login with username/password
- JWT-based session management
- Protected routes with middleware
- Session persistence

### User Management

- User registration with data validation
- Password change functionality
- Secure password hashing
- User profile information

### Security

- Form validation with Zod
- Password encryption with bcrypt
- Protected API routes
- Secure session handling

### UI/UX

- Clean and modern interface
- Loading states and feedback
- Error handling and messages
- Responsive design for all devices

## 📝 API Routes

- `/api/auth/signup` - User registration
- `/api/auth/login` - User authentication
- `/api/auth/change-password` - Password management
- `/api/auth/[...nextauth]` - NextAuth configuration

## 🔧 Configuration

The project uses several key configurations:

- NextAuth.js for authentication
- Prisma for database management
- Zod for schema validation
- Radix UI for components
- Tailwind CSS for styling

## 👏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for beautiful components
- NextAuth.js for authentication solutions
- Prisma team for the database toolkit

## 🌟 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. 🚀

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For any questions or feedback, feel free to reach out:

- 📩 Email: [iritman@gmail.com](mailto:iritman@gmail.com)
- 🔗 LinkedIn: [Naiem Yousefifard](https://www.linkedin.com/in/naiem-yousefifard-11086729b)

Happy coding! 🎉
