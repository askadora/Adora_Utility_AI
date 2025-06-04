# Adora AI Backend - AI-Powered Business Intelligence Platform

Adora AI is a comprehensive business intelligence platform that leverages artificial intelligence to provide powerful insights, analytics, and automation tools for modern businesses.

![Adora AI Dashboard Preview](./banner.png)

## Features

Adora AI provides a complete suite of business intelligence tools including:

- **AI-Powered Analytics**: Advanced data analysis and insights
- **Real-time Dashboards**: Comprehensive business metrics and KPIs
- **CRM Integration**: Customer relationship management tools
- **Financial Projections**: AI-driven forecasting and planning
- **Chat Interface**: AI assistant for business queries
- **Responsive Design**: Mobile-first, modern UI/UX

Built with modern technologies:
- **Next.js 15**  with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Prisma** for database management
- **NextAuth.js** for authentication

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adoracompany/adora-ai-backend.git
cd adora-ai-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
adora-ai-backend/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── context/            # React context providers
│   ├── layout/             # Layout components
│   └── lib/                # Utility functions
├── public/                 # Static assets
└── prisma/                # Database schema
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

Adora AI Backend is proprietary software. All rights reserved.

## Support

For support and questions, please contact the Adora AI team.
