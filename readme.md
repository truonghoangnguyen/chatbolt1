# Chatbolt

A React-based chat application with OpenAI integration.

## Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd chatbolt
```

2. Install dependencies
```bash
npm install
```

## Development

You have two options to run the project:

### Option 1: Run everything together
```bash
npm run dev
```

### Option 2: Run frontend and API separately

1. Run frontend:
```bash
npm run dev
```

2. In a separate terminal, run API:
```bash
npm run dev:apiOPENAI_API_KEY=your_api_key_here
```

3. Configure API URL in `src/utils/openai.ts`:
```typescript
// For production/deployment
const API_URL = '/api/chat';

// For local development
// const API_URL = "http://localhost:3000/api/chat"
```

## Deployment

The project is configured for deployment on Vercel. Push your changes to GitHub and connect your repository to Vercel for automatic deployments.

## Environment Variables

Create a `.env` file in the root directory with:
```
OPENAI_API_KEY=your_api_key_here
```

## Embedding

To embed the chat in a WordPress site, use:
```html
<iframe src="https://your-deployed-url.vercel.app/" width="100%" height="600px" style="border:none;"></iframe>