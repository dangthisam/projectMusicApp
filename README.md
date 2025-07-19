# 🚀 ConvertJsToTS - Modern Node.js API Template

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Deploy Status](https://img.shields.io/badge/Deploy-Live-brightgreen?style=for-the-badge)](https://convertjstots.onrender.com/)

> A production-ready Node.js + Express + TypeScript project template designed for modern web development. Built with scalability, maintainability, and developer experience in mind.

## ✨ Features

- 🔥 **Modern Stack**: Built with Node.js, Express, and TypeScript
- 🏗️ **RESTful Architecture**: Scalable API structure for real-world applications
- ☁️ **Cloud Ready**: Pre-configured for deployment on Render, Vercel, and similar platforms
- 📋 **Sample Endpoints**: Complete task management API examples
- 🔒 **Environment Variables**: Secure configuration with `.env` support
- 📁 **Organized Structure**: Clean, maintainable folder organization
- 🚀 **Developer Friendly**: Hot reload, TypeScript support, and modern tooling

## 🌐 Live Demo

**🔗 Main Demo**: [https://convertjstots.onrender.com/](https://convertjstots.onrender.com/)

**🎵 Music App Demo**: [https://projectmusicapp.onrender.com/topics](https://projectmusicapp.onrender.com/topics)

## 📁 Project Structure

```
convertJstoTS/
├── 📁 src/
│   ├── 📁 config/          # Configuration files
│   ├── 📁 controllers/     # Route controllers
│   ├── 📁 models/          # Data models
│   ├── 📁 routes/          # API routes
│   ├── 📁 utils/           # Utility functions
│   └── 📄 index.ts         # Application entry point
├── 📄 package.json         # Dependencies and scripts
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 .env                 # Environment variables
├── 📄 .gitignore           # Git ignore rules
└── 📄 README.md            # Project documentation
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/convertJstoTS.git
   cd convertJstoTS
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:8000
   ```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## 📚 API Documentation

### Base URL
```
Local: http://localhost:8000
Production: https://convertjstots.onrender.com/topics
```

### Sample Endpoints

#### Tasks Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get task by ID |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

#### Example Request
```javascript
// Create a new task
fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Complete project',
    description: 'Finish the Node.js API template',
    priority: 'high'
  })
})
```

## 🌍 Deployment

### Deploy to Render

1. Fork this repository
2. Connect your GitHub account to [Render](https://render.com)
3. Create a new Web Service
4. Connect your forked repository
5. Configure environment variables
6. Deploy! 🎉

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your app is live! ⚡

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Node.js](https://nodejs.org/) - JavaScript runtime
- Community contributors and supporters

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/convertJstoTS/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/convertJstoTS/discussions)
- 📧 **Email**: samnv@gmail.com



---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/dangthisam">Nguyễn Văn Sâm</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>