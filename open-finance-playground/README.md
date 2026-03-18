# Euler Demo App

A Next.js demo application showcasing Open Finance payment flows — including PIX (PISP, QR, Biometrico, Automatico), card payments, and Click to Pay — built with the Juspay payment orchestration platform.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v10+

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/juspay/euler-demo-app.git
   cd euler-demo-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in the required values:

   | Variable | Description |
   |----------|-------------|
   | `API_KEY` | Your Juspay API key |
   | `JUSPAY_DOMAIN` | Juspay API domain URL |

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   └── open-finance/     # Open Finance payment flow pages & components
├── shared/
│   ├── components/       # Reusable UI components
│   ├── containers/       # Page-level container components
│   └── hooks/            # Custom React hooks
public/
├── demoapp/              # Static assets (images, icons, animations)
```

## Building for Production

```bash
pnpm build
pnpm start
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [MIT License](./LICENSE).
