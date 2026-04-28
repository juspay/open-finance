# Open Finance Playground
Everything you need to know about PIX with Open Finance: Become an expert in ITP/PISP, Biometric PIX, and Automatic PIX.

## Stack
- Next.js

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v10+

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/juspay/open-finance.git
   cd open-finance/open-finance-playground
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
