# GitHub Copilot Instructions for shadcn-ts-app

## Project Overview

This is a React application built with TypeScript, Vite, and shadcn/ui component library. The project includes:
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables
- **Routing**: React Router v7
- **Additional Libraries**: DHTMLX Gantt, dhx-grid
- **Icons**: Lucide React

## Technology Stack

- **React 19.1.1** - Latest React version with modern features
- **TypeScript 5.9** - Strict type checking
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Beautifully designed component library
- **React Router 7** - Client-side routing
- **ESLint** - Code linting with TypeScript support
- **Prettier 3.6.2** - Code formatting

## Code Style and Conventions

### TypeScript
- Use TypeScript for all new files (`.ts`, `.tsx`)
- Prefer explicit types over `any` (avoid using `any`)
- Use React component type definitions: `React.ComponentProps<T>`
- Import types using `type` keyword: `import { type ClassValue } from "clsx"`

### React Components
- Use functional components with hooks
- Use default exports for page components
- Use named exports for reusable UI components and utilities
- Component file names should match component names (PascalCase for components)
- Use the `cn()` utility from `@/lib/utils` for conditional className merging

### File Organization
- **Components**: `src/components/` - Reusable components
  - `src/components/ui/` - shadcn/ui components
  - `src/components/*.tsx` - App-specific components (e.g., nav-main, app-sidebar)
- **Pages**: `src/app/dashboard/` - Page components
- **Hooks**: `src/hooks/` - Custom React hooks
- **Utils**: `src/lib/` - Utility functions
- **Routes**: `src/routes.tsx` - Route configuration

### Import Aliases
Use path aliases defined in `tsconfig.json` and `components.json`:
- `@/components` - Component imports
- `@/lib/utils` - Utility functions
- `@/components/ui` - UI component imports
- `@/lib` - Library imports
- `@/hooks` - Custom hooks

Example:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
```

### shadcn/ui Component Patterns

When creating or modifying shadcn/ui components:
1. Use `data-slot` attributes for semantic structure
2. Merge classNames using the `cn()` utility
3. Spread props appropriately: `{...props}`
4. Follow the Radix UI primitive patterns
5. Include proper TypeScript types using `React.ComponentProps<T>`

Example component structure:
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

function ComponentName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="component-name"
      className={cn(
        "base-classes",
        "variant-classes",
        className
      )}
      {...props}
    />
  )
}
```

### Styling with Tailwind CSS
- Use Tailwind utility classes for styling
- Use the `cn()` utility from `@/lib/utils` to merge classes
- Follow the shadcn/ui design system (New York style)
- CSS variables are enabled for theming
- Base color: neutral
- Use Tailwind's responsive prefixes (md:, lg:, etc.)
- Use dark mode classes when needed (dark:)

### Component Exports
- **Single component**: Use `export default` for page components
- **Multiple exports**: Use named exports for UI components
- Avoid exporting non-component values from component files to maintain Fast Refresh compatibility

Note: Some existing files may have Fast Refresh warnings due to exporting non-component values alongside components. When creating new component files, ensure only components are exported.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Component Installation

This project uses shadcn/ui CLI for component management:

```bash
# Install a new shadcn/ui component
npx shadcn@latest add [component-name]
```

Configuration is stored in `components.json` with New York style.

## Key Dependencies

### UI & Styling
- `@radix-ui/*` - Unstyled, accessible UI primitives
- `lucide-react` - Icon library
- `tailwindcss` - CSS framework
- `class-variance-authority` - Managing component variants
- `tailwind-merge` & `clsx` - Merging Tailwind classes

### Third-party Libraries
- `dhtmlx-gantt` - Gantt chart component
- `dhx-grid` - Grid component
- React Router for navigation

## Project Structure

```
src/
├── app/
│   └── dashboard/
│       ├── page.tsx      # Main dashboard layout
│       ├── grid.tsx      # Grid page component
│       └── gnatt.tsx     # Gantt chart page component
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── app-sidebar.tsx   # Application sidebar
│   ├── nav-main.tsx      # Main navigation
│   ├── nav-projects.tsx  # Projects navigation
│   ├── nav-user.tsx      # User navigation
│   └── team-switcher.tsx # Team switching component
├── hooks/
│   └── use-mobile.ts     # Mobile detection hook
├── lib/
│   └── utils.ts          # Utility functions (cn, etc.)
├── App.tsx               # Root App component
├── main.tsx              # Application entry point
└── routes.tsx            # Route configuration
```

## Routing

Routes are defined in `src/routes.tsx` using React Router's `createBrowserRouter`:
- Layout route: `/` renders the dashboard page
- Child routes: `/grid`, `/gantt`
- Use `<Outlet />` for rendering child routes

## Best Practices

1. **Type Safety**: Always use TypeScript types, avoid `any`
2. **Accessibility**: shadcn/ui components are built on Radix UI for accessibility
3. **Composition**: Build complex UIs by composing smaller components
4. **Utilities**: Use the `cn()` utility for className management
5. **Imports**: Use path aliases (@/*) for cleaner imports
6. **Consistency**: Follow existing patterns in the codebase
7. **Fast Refresh**: Keep component files free of non-component exports when possible

## Common Patterns

### Creating a new page component
```typescript
import { ComponentA } from "@/components/ui/component-a"
import { ComponentB } from "@/components/component-b"

export default function PageName() {
  return (
    <div className="container mx-auto p-4">
      {/* Page content */}
    </div>
  )
}
```

### Creating a new UI component
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export function ComponentName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("default-classes", className)}
      {...props}
    />
  )
}
```

### Using the sidebar layout
The main layout uses SidebarProvider and includes:
- `<AppSidebar />` - Main sidebar
- `<SidebarInset>` - Content area
- `<SidebarTrigger />` - Toggle button
- `<Outlet />` - Child route rendering

## Notes

- The project uses Vite's Fast Refresh for hot module replacement
- ESLint is configured with TypeScript and React plugins
- Some existing components may have linting warnings - focus on new code quality
- The project uses CSS variables for theming (see `src/index.css`)
