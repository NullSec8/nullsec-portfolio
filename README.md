# nullsec8 Portfolio

A modern, minimalist portfolio website built with Next.js 15, featuring glitch animations, GitHub integration, and a unique "story" page.

## Features

- **Glitch Hero Animation** - Dynamic text glitch effect using Framer Motion
- **GitHub Integration** - Automatically fetches and displays your public repositories
- **Project Filtering** - Filter projects by programming language
- **Story Page** - A unique "A Loser Story" page sharing the developer's journey
- **Responsive Design** - Optimized for all screen sizes
- **Contact Form** - Functional contact form with API route handling
- **Smooth Animations** - Scroll-triggered animations throughout

## Tech Stack

- **Framework:** Next.js 15.2.4 (App Router)
- **UI Library:** React 19.2.4
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4, Framer Motion 11.18
- **GitHub API:** Octokit 5.0.5
- **Linting:** ESLint 9 with Next.js config

## Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```
   Generate a token at: https://github.com/settings/tokens

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/contact/     # Contact form API route
│   ├── story/           # Story page route
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Homepage with GitHub integration
│   ├── loading.tsx      # Loading component for Suspense
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Glitch animation hero section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # GitHub projects showcase
│   ├── Skills.tsx       # Skills display
│   ├── Contact.tsx      # Contact form with API integration
│   └── Navbar.tsx       # Navigation bar
└── lib/
    └── github.ts        # GitHub API integration
```

## Features in Detail

### GitHub Integration
The homepage fetches your public repositories using the GitHub API via Octokit. Repositories are displayed in a responsive grid with filtering by language. Forked repositories are automatically filtered out.

### Contact Form
The contact form submits to `/api/contact` which validates the input and logs submissions. In production, you would extend this to send emails or store in a database.

### Story Page
Visit `/story` to read "A Loser Story" - a candid narrative about the developer's journey through gaming, cracking, coding, and self-discovery.

## License

This project is private. All rights reserved.

---

Built by [nullsec8](https://github.com/nullsec8)
