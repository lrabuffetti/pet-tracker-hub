# Developer & AI Agent Rules

Welcome to the project. This workspace consists of a Next.js web application (root) and a React Native Expo application (`/nativeapp`).

Please follow these guidelines strictly when working on this codebase.

---

## 1. Tech Stack Overview

* **Web Application (Root)**
  * **Framework**: Next.js v16.2.6 (Note: This is a modified version with breaking changes)
  * **Styling**: Tailwind CSS v4 / PostCSS
  * **Core**: React 18.2.0, React DOM 18.2.0, TypeScript
  * **Build/Dev Tooling**: Next CLI (`next dev`, `next build`, `eslint`)

* **Native Mobile Application (`/nativeapp`)**
  * **Framework**: Expo v56 (React Native 0.85.3, React 19.2.3)
  * **Routing**: Expo Router (v56.2.5)
  * **Animation**: React Native Reanimated (v4.3.1)
  * **Platform Support**: iOS, Android, and Web (`react-native-web`)

* **Workspace Architecture & Execution**
  * **Package Management**: The root uses standard `npm`. The mobile app uses `npx expo install` exclusively within the `/nativeapp` directory.
  * **Execution Scope**: Never execute mobile terminal commands (e.g., `npx expo start`) from the repository root. Always change directory (`cd nativeapp`) first.

---

## 2. Critical Version Guidelines

> [!WARNING]
> Next.js version 16.2.6 contains breaking changes. Do not rely solely on pre-2026 training data for Next.js APIs.
> Before making changes to the Next.js app, consult the local guides at `node_modules/next/dist/docs/`.

> [!IMPORTANT]
> Expo is using version v56.0.0.
> Before writing code for the native app, refer to the exact versioned docs at [docs.expo.dev/versions/v56.0.0](https://docs.expo.dev/versions/v56.0.0/).

---

## 3. Code Quality & Formatting Rules

* **TypeScript & Typing**:
  * Avoid using `any` unless absolutely necessary and documented.
  * Use strict type checking and proper type definitions for React/React Native components.
  * Ensure props and states are fully typed.

* **React Native / Expo Components**:
  * Leverage `expo-symbols` for icons.
  * Use `react-native-reanimated` for smooth performance-oriented animations.
  * Follow Expo Router guidelines for navigation and layout files (`_layout.tsx`, `+html.tsx`, etc.).
  * Respect platform-specific nuances (e.g. touchable targets minimum size of 44x44 dp on mobile, safe areas on iOS/Android).

* **Web / Next.js Styling & UI**:
  * Use modern web design principles (dynamic hover states, rich color palettes, HSL colors).
  * Do not use standard plain colors. Use smooth gradients and vibrant transitions.
  * Use modern layouts (Flexbox, Grid) and container queries.
  * Maintain clean Tailwind CSS utility classes and extract custom classes or components where appropriate.

* **Linting & Formatting**:
  * Run `npm run lint` before committing to check for formatting and rule violations.
  * Respect the `.prettierrc` configuration file.

* **Cross-Platform Isolation Rules (CRITICAL)**
  * **Strict Dependency Separation**: Never import DOM/Web-only components or elements (e.g., `<div>`, `<a>`, `window`, `document`) into any file under the `/nativeapp` directory. 
  * **Strict Native Separation**: Never import React Native components (`<View>`, `<Text>`) or Expo hooks into the root Next.js application.
  * **Universal Code Integration**: If writing shared utilities, business logic, or TypeScript interfaces intended for both platforms, extract them into a separate shared directory or ensure they use strict environment gating (`Platform.OS === 'web'`).

* **Route Synchronization & Mental Models**
  * **URL Parity**: Ensure that dynamic paths match conceptually. If creating a dynamic route on the web (`app/product/[id]/page.tsx`), create the corresponding path on mobile (`nativeapp/app/product/[id].tsx`).
  * **Navigation Hooks Mapping**: 
    * In Next.js files, only use Next.js navigation utilities (`useParams()`, `useRouter()`).
    * In Expo files, only use Expo Router utilities (`useLocalSearchParams()`, `useRouter()`). Do not cross-contaminate.

---

## 4. Verification & Testing

* **Build Checks**:
  * Make sure changes build successfully (`npm run build` for web, or checking TS compilation for native).
* **Manual Verification**:
  * Run target platforms to confirm layout correctness, responsive design, and smooth user flow.

* **Automated Agent Pre-Flight Checks**
  * **Pre-commit Script Validation**: Before declaring a task complete, the agent must run TypeScript compiler checks for *both* environments to catch isolated compilation errors.

  * **Expo Router Routing Map Audit**: When creating, deleting, or altering files inside `/nativeapp/app/`, verify that the file-system layout correctly updates the app's link boundaries without causing dangling layout mismatches or broken root contexts (`_layout.tsx`).
