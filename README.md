# Ripple Rush

[cloudflarebutton]

A visually stunning 10-second click speed test where each click creates a beautiful, interactive water ripple effect.

## About The Project

Ripple Rush is an aesthetically driven click-speed test application designed to be both a fun game and a piece of interactive art. The core challenge is simple: users have 10 seconds to click as many times as possible. However, the experience is elevated by a stunning visual feedback system. The main interaction area is a digital 'puddle' of water. Each mouse click sends a beautifully rendered, animated ripple across the surface, originating from the cursor's position.

The application follows a simple game loop: a start screen, a 10-second active game phase, and a results screen displaying the final score (clicks per second). The entire experience is wrapped in a whimsical, illustrative art style, using custom fonts and a calming color palette to create a delightful and engaging user interaction.

## Key Features

*   **Interactive Canvas:** A digital "puddle" that creates beautiful ripple effects on each click.
*   **Click Speed Test:** A 10-second challenge to test your clicking speed.
*   **Real-time Feedback:** See your click count and the timer update in real-time.
*   **Game States:** Seamless transitions between 'Idle', 'Running', and 'Finished' game states.
*   **Visual Polish:** A beautiful, illustrative art style with smooth animations powered by Framer Motion.
*   **Responsive Design:** A flawless experience on desktops, tablets, and mobile devices.

## Built With

This project is built with a modern, high-performance tech stack:

*   [React](https://reactjs.org/)
*   [Vite](https://vitejs.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [shadcn/ui](https://ui.shadcn.com/)
*   [Framer Motion](https://www.framer.com/motion/)
*   [Zustand](https://zustand-demo.pmnd.rs/)
*   [Cloudflare Workers](https://workers.cloudflare.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your_username/ripple_rush.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd ripple_rush
    ```
3.  Install dependencies:
    ```sh
    bun install
    ```

## Usage

To run the application in development mode, execute the following command. This will start a local server, typically on `http://localhost:3000`.

```sh
bun run dev
```

Open your browser and navigate to the local server address to see the application in action.

## Project Structure

The project is organized into three main directories:

*   `src/`: Contains all the frontend React application code, including pages, components, hooks, and styles. The main game logic resides in `src/pages/HomePage.tsx`.
*   `worker/`: Contains the Cloudflare Worker backend code. For this project, it serves the static assets and provides a basic API structure, though the core game is client-side.
*   `shared/`: Contains types and interfaces shared between the frontend and the worker, ensuring type safety across the stack.

## Deployment

This application is designed to be deployed seamlessly to the Cloudflare network.

1.  Build the project for production:
    ```sh
    bun run build
    ```
2.  Deploy to Cloudflare Workers using the Wrangler CLI:
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[cloudflarebutton]