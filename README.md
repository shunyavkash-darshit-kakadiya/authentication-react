# 🔐 Authentication React

A secure, modern authentication system built with React and Vite, featuring email/password login, Google OAuth, two-factor authentication (2FA), and comprehensive device management.

## ✨ Features

### 🔑 Authentication Methods
- **Email & Password Authentication** - Traditional login with secure password handling
- **Google OAuth Integration** - Seamless login with Google accounts
- **Auto Session Expiry** - Sessions automatically expire after 3 days for enhanced security

### 🛡️ Two-Factor Authentication (2FA)
- **TOTP/HOTP Support** - Compatible with Google Authenticator and similar apps
- **Device Trust** - Remember trusted devices for 15 days
- **Enhanced Security** - Additional layer of protection for user accounts

### 📱 Device Management
- **Active Sessions Tracking** - View all devices/locations where you're logged in
- **Selective Logout** - Log out from current device or all devices at once
- **Device Fingerprinting** - Secure device identification using FingerprintJS

### 🔒 Security Standards
- High-security password requirements
- Cross-browser compatibility
- Protection against common vulnerabilities
- Secure cookie handling
- Device-based authentication tracking

## 🚀 Tech Stack

- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM 7.11.0
- **State Management:** Zustand 5.0.9
- **UI Components:** Material-UI (MUI) 7.3.6
- **OAuth:** @react-oauth/google 0.13.4
- **Device Fingerprinting:** FingerprintJS 5.0.1
- **Date Handling:** Day.js 1.11.19
- **Code Quality:** ESLint with custom configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd authentication-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and configure the following:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with host flag |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Automatically fix ESLint issues |

## 📁 Project Structure

```
authentication-react/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, and other assets
│   ├── components/      # Reusable components
│   │   └── Modal/       # Modal component
│   ├── constants/       # Constants and configuration
│   │   ├── apiList.js   # API endpoints
│   │   └── environment.js
│   ├── hooks/           # Custom React hooks
│   │   └── useDeviceInfo.js
│   ├── layouts/         # Layout components
│   │   └── header/
│   ├── pages/           # Page components
│   │   ├── Auth/        # 2FA modals
│   │   ├── Dashboard/
│   │   ├── Google/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── Test/
│   ├── services/        # API services
│   │   └── apiService.js
│   ├── stores/          # Zustand state management
│   │   └── useAuth.js
│   └── utils/           # Utility functions
│       ├── cookie.js
│       └── deviceInfo.js
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Configuration

### Google OAuth Setup
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized JavaScript origins and redirect URIs
5. Copy the Client ID to your `.env` file

### API Integration
Configure your backend API endpoints in `src/constants/apiList.js`

## 🔐 Security Features

- **Password Security:** High-standard password requirements and encryption
- **Session Management:** Automatic expiration and secure token handling
- **Device Fingerprinting:** Unique device identification for enhanced security
- **2FA Implementation:** Industry-standard TOTP/HOTP authentication
- **Cookie Security:** Secure, HttpOnly cookies for sensitive data
- **Cross-Browser Protection:** CSRF and XSS protection mechanisms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name

---

## 📋 Workflow

* 		Authentication System
    * 		Login with email and password
    * 		Login with Google
* 		Login should auto expire every 3 days
* 		Add 2FA
    * 		(TOTP/HOTP) -. Example Google Authenticator
    * 		15 days same device
* 		Keep the security standard high for password and cross browser and sensitive things
* 		Add the functionality of showing how many places/device user logged in
    * 		Logout from current device and all device functionality should be there

---

⭐ Star this repo if you find it helpful!