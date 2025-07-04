# Smart Shopping Assistant

A revolutionary shopping companion that optimizes your shopping experience by combining an intelligent shopping list manager with advanced store navigation. This application uses cutting-edge algorithms to create the most efficient shopping routes, saving you time and reducing frustration while shopping.

URL: [smart-grocery-list](https://spensiero.github.io/smart-grocery-list/)

## Key Benefits

- **Time-saving Navigation**: Automatically generates the most efficient shopping route based on your list
- **Smart Organization**: Groups similar items together and suggests optimal shopping order
- **Real-time Assistance**: Provides instant guidance and product location information
- **Interactive Map**: Visualizes your shopping path and product locations in real-time
- **User-Friendly Interface**: Clean, intuitive design that works on any device
- **Accessibility**: Built with accessibility in mind, ensuring everyone can use it effectively

## Features

- Interactive shopping list management
- Store navigation with optimized paths
- Real-time product location tracking
- Store map visualization
- Path optimization algorithm
- User-friendly interface with modern design
- Responsive layout for all devices
- Accessibility-first approach
- Loading states and feedback
- Interactive guides and tutorials

## Technologies & Architecture

### Frontend Framework
- React 19 with TypeScript for robust component-based architecture
- Vite as the build tool for fast development experience

### UI & Styling
- Tailwind CSS for utility-first styling
- Radix UI components for accessible UI elements
- Lucide React for modern icons
- Tailwind Merge for efficient class handling

### State Management & Data
- Zustand for global state management
- React Query for efficient data fetching and caching
- Class Variance Authority for component variants

### Development Tools
- ESLint for code quality and consistency
- Vitest for testing
- TypeScript for type safety

## Development Considerations

### Performance
- Optimized component rendering using React's best practices
- Efficient state management with Zustand
- Code splitting and lazy loading for better initial load times
- Tailwind CSS with proper configuration for minimal bundle size

### Accessibility
- Built using Radix UI components which are WCAG compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Color contrast considerations

### User Experience
- Smooth animations using Tailwind's animation utilities
- Responsive design for all screen sizes
- Intuitive navigation system
- Clear visual feedback for user actions

### Testing
- Comprehensive unit testing with Vitest
- Integration testing with React Testing Library
- Jest DOM for DOM assertions
- Proper test coverage for critical components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## Project Structure

- `/src`: Main source code
  - `/components`: Reusable UI components
    - `/storeMap`: Store mapping and navigation components
    - `/groceryItems`: Shopping list related components
    - `/guide`: User guidance system
    - `/header`: Navigation components
    - `/main`: Main application layout
    - `/selectedProducts`: Product selection components
    - `/spinner`: Loading indicators
    - `/shadcn`: Custom UI components
  - `/utils`: Helper functions and utilities
    - Path optimization algorithms
    - Store map configuration
    - Type definitions
  - `/App.tsx`: Main application component
- `/public`: Static assets
- `/node_modules`: Project dependencies

## Development Guidelines

- All new features should include corresponding tests
- Follow TypeScript best practices
- Maintain consistent code style
- Keep components small and focused
- Document complex logic, especially path optimization algorithms
- Consider accessibility in all new features
- Use consistent naming conventions
- Follow React best practices for component organization
- Maintain proper separation of concerns between components and utilities

## License

This project is proprietary and confidential. All rights reserved.
"# smart-grocery-list" 
