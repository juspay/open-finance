# Contributing to Euler Demo App

Thank you for your interest in contributing! Here's how you can help.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/euler-demo-app.git
   cd euler-demo-app
   ```
3. **Create a branch** for your change:
   ```bash
   git checkout -b my-feature
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```
5. **Make your changes**, then verify the build passes:
   ```bash
   pnpm run build
   ```

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request against the `staging` branch of the upstream repository.
3. Provide a clear description of the change and the motivation behind it.
4. Ensure the build passes before requesting review.

## Coding Conventions

- Use TypeScript for all new code.
- Follow the existing project structure — components in `components/`, containers in `container/`, shared code in `src/shared/`.
- Use CSS Modules (`.module.css`) for styling.
- Keep components focused and small.

## Reporting Issues

- Use GitHub Issues to report bugs or request features.
- Include steps to reproduce, expected behavior, and actual behavior.
- Screenshots or screen recordings are welcome for UI issues.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
