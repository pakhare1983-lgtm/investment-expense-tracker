# Deployment Guide

## Local Development

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/pakhare1983-lgtm/investment-expense-tracker.git
   cd investment-expense-tracker
   ```

2. Backend setup
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. Frontend setup (in another terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm start
   ```

## Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/pakhare1983-lgtm/investment-expense-tracker.git
   cd investment-expense-tracker
   ```

2. Update environment variables
   ```bash
   # Update docker-compose.yml with your values
   ```

3. Run with Docker Compose
   ```bash
   docker-compose up -d
   ```

4. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

5. Stop the services
   ```bash
   docker-compose down
   ```

## Production Deployment

### AWS Deployment

1. **Frontend (S3 + CloudFront)**
   - Build the frontend: `npm run build`
   - Upload to S3 bucket
   - Configure CloudFront distribution

2. **Backend (EC2 + PM2)**
   - Deploy to EC2 instance
   - Install Node.js and dependencies
   - Use PM2 for process management
   - Configure Nginx as reverse proxy

3. **Database (MongoDB Atlas)**
   - Create MongoDB Atlas cluster
   - Update MONGODB_URI in .env

### Heroku Deployment

1. Create Heroku apps
   ```bash
   heroku create investment-tracker-api
   heroku create investment-tracker-ui
   ```

2. Set environment variables
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set MONGODB_URI=your_mongodb_uri
   ```

3. Deploy
   ```bash
   git push heroku main
   ```

## Environment Variables

Create `.env` files in backend and frontend directories:

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=your_frontend_url
```

**Frontend (.env)**
```
REACT_APP_API_URL=your_api_url/api
REACT_APP_ENV=production
```

## Monitoring

- Use PM2 for backend process monitoring
- Set up CloudWatch for AWS resources
- Configure error tracking with Sentry
- Set up logging with Winston or Morgan

## Backup Strategy

- Daily automated MongoDB backups
- Weekly full backups to cloud storage
- Database replication for high availability

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Enable database authentication
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up API key authentication
- [ ] Regular security audits
- [ ] Keep dependencies updated