# Report

[![Coverage Status](https://coveralls.io/repos/github/decentraland/report/badge.svg?branch=main)](https://coveralls.io/github/decentraland/report?branch=main)

A UI that allows Decentraland players to report other players. Players must be authenticated via their Decentraland wallet to verify their identity before submitting a report.

## Table of Contents

- [Features](#features)
- [Dependencies & Related Services](#dependencies--related-services)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the UI](#running-the-ui)
- [Testing](#testing)

- **Player Reporting**: Allows authenticated Decentraland players to report other players for rule violations or misconduct.
- **Authentication**: Requires players to authenticate with their Decentraland wallet to verify identity before submitting a report.

## Dependencies & Related Services

This service interacts with the following services:

- **[Decentraland Auth](https://github.com/decentraland/auth)**: Player authentication and identity verification
- **Intercom API**: Report submission and moderation management

## Getting Started

### Prerequisites

Before running this service, ensure you have the following installed:

- **Node.js**: Version 24.x or higher

<!-- List any other dependencies that are required to run the UI -->

### Installation

1. Clone the repository:

```bash
git clone https://github.com/decentraland/report.git
cd report
```

2. Install dependencies:

```bash
npm install
```

### Configuration

The UI uses the `@dcl/ui-env` module to configure the environment in which it the UI will run.

All of these different configurations are located under the `/src/config/env` directory, where a `json` file can be found for each environment.
This package automatically loads the environment file for each site in production (zone, today, org) and can be configured to run on a different
environment while live by using the `?env=` query parameter with the desired environment, i.e: `?env=prod`.

In order to configure the starting environment of the site in the development mode, copy the create a new `.env` file based on the `.default.env`.
The `.default.env` also contains other variables that are usually modified at build time.

### Running the UI

Running the start command will result in the Vite development server to start.

```bash
npm run start
```

## Testing

This UI contains tests that assert the behavior of components, stores and business logic.

### Running tests

Run all tests:

```bash
npm run test
```

Run all tests with coverage:

```bash
npm run test:coverage
```

### Test Structure

Tests are written in files named along the file they're testing, but with a different extension.

```bash

```

## AI Agent Context

For detailed AI Agent context, see [docs/ai-agent-context.md](docs/ai-agent-context.md).

---
