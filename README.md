# Expense Tracker Server

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` file (already done)

3. Start the server:
   ```bash
   npm start
   ```

## Troubleshooting MongoDB Connection Issues

If you're getting MongoDB connection errors, follow these steps:

### 1. IP Whitelist Issue
- Go to your MongoDB Atlas dashboard
- Navigate to Network Access
- Add your current IP address to the IP Access List
- You can also add `0.0.0.0/0` for development (allows all IPs - not recommended for production)

### 2. Check Your Current IP
- Visit https://whatismyipaddress.com/ to see your current IP
- Add this IP to your MongoDB Atlas whitelist

### 3. Verify Credentials
- Make sure the username and password in the .env file are correct
- The password should be the database user password, not your MongoDB Atlas account password

### 4. Test Connection
- Visit `http://localhost:3000/api/health` to check server and database status

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## Common Fixes Applied

1. Removed deprecated MongoDB options (`useNewUrlParser`, `useUnifiedTopology`)
2. Added proper error handling to all routes
3. Added database connection monitoring
4. Added health check endpoint
5. Improved error messages and logging

