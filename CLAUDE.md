# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build
```bash
npm run build
```
Compiles TypeScript files to JavaScript in the `lib` directory.

### Lint
```bash
npm run lint
```
Runs ESLint to check code style and quality.

### Test
```bash
npm test
```
Runs the test suite using Mocha with TypeScript support and code coverage via nyc.

### Development
```bash
npm run watch
```
Starts TypeScript compiler in watch mode for development.

## Architecture Overview

Mobile MCP is a Model Context Protocol server that enables AI agents to interact with iOS and Android devices through accessibility APIs and screenshots. The architecture follows a clean separation of concerns:

### Core Components

1. **MCP Server Layer** (`src/server.ts`, `src/index.ts`)
   - Implements the MCP protocol using either stdio or SSE transport
   - Exposes tools for device interaction as MCP-compliant endpoints
   - Entry point supports both CLI and server modes

2. **Platform Abstraction** (`src/robot.ts`)
   - Defines the `Robot` interface that all platform implementations must follow
   - Common types like `ScreenElement`, `SwipeDirection`, `Button`
   - `ActionableError` for user-friendly error messages

3. **Platform Implementations**
   - **Android** (`src/android.ts`): Uses ADB for device communication
     - `AndroidRobot`: Implements Robot interface for Android devices
     - `AndroidDeviceManager`: Manages device discovery and selection
   - **iOS** (`src/ios.ts`): Uses go-ios and WebDriverAgent
     - `IosRobot`: Implements Robot interface for iOS devices  
     - `IosManager`: Manages device discovery and selection
   - **iOS Simulator** (`src/iphone-simulator.ts`): Uses simctl for simulator control
     - `SimulatorIosRobot`: Special implementation for iOS simulators

4. **Supporting Utilities**
   - `src/webdriver-agent.ts`: HTTP client for WebDriverAgent communication
   - `src/image-utils.ts`: Image processing utilities
   - `src/png.ts`: PNG encoding/decoding
   - `src/logger.ts`: Logging utilities

### Key Design Patterns

- **Strategy Pattern**: Different robot implementations (Android, iOS, Simulator) implement the same Robot interface
- **Manager Pattern**: Device managers handle discovery and initialization
- **Error Handling**: ActionableError provides user-friendly messages for common issues
- **Transport Flexibility**: Supports both stdio (for IDE integration) and SSE (for web clients)

### External Dependencies

- Requires platform tools:
  - Android: ADB (Android Debug Bridge)
  - iOS: go-ios, WebDriverAgent
  - iOS Simulator: Xcode command line tools
- Uses MCP SDK for protocol implementation
- Express for SSE server mode