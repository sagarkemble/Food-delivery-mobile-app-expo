# Food Delivery App

**Demo Link:** [Watch Demo](https://drive.google.com/file/d/11W0NxJzV2MzF0FvTfYAAj3nb6OAUFg5B/view?usp=sharing)

A React Native mobile application built with Expo, demonstrating a complete navigation flow using React Navigation (Stack, Drawer, and Bottom Tabs) for a food delivery platform.

## Features

- **Authentication Flow:** Sign In & Sign Up screens.
- **Onboarding:** Welcome screens for new users.
- **Main App:** Bottom tabs for Home, Search, Cart, and Orders.
- **Side Drawer:** Profile management and Settings.
- **Context API:** Global state management for user data.

## Tech Stack

- **React Native** & **Expo**
- **TypeScript**
- **React Navigation v7** (Stack, Drawer, Bottom Tabs)
- **Context API** (State Management)
- **Husky** & **Commitlint** (Git Hooks & Linting)

## Installation

1. **Install dependencies:**
   Make sure you are in the project root directory and run:

   ```sh
   npm install
   ```

   _(Note: You can also use `bun intall` or `yarn install` as lockfiles are present)_

2. **Start the Expo server:**

   ```sh
   npm start
   ```

3. **Run the App:**
   - Press `a` in the terminal to run on an **Android** emulator/device.
   - Press `i` in the terminal to run on an **iOS** simulator.
   - Or scan the QR code using the **Expo Go** app on your physical device.

## Project Structure

- `src/screens/` - Application UI screens (Home, Cart, Profile, etc.)
- `src/navigator/` - React Navigation configurations
- `src/context/` & `src/hooks/` - Global state management
- `src/restaurantData.ts` - Local mock data
