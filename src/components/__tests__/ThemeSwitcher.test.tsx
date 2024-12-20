import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ThemeProvider } from 'next-themes';

const mockSetTheme = jest.fn();
let mockTheme = 'light';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ThemeSwitcher Component', () => {
  beforeEach(() => {
    mockTheme = 'light';
    mockSetTheme.mockClear();
  });

  // Unit Tests
  describe('Unit Tests', () => {
    it('renders without crashing', () => {
      render(
        <ThemeProvider attribute="class">
          <ThemeSwitcher />
        </ThemeProvider>
      );
      expect(screen.getByLabelText('Switch theme')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <ThemeProvider attribute="class">
          <ThemeSwitcher className="custom-class" />
        </ThemeProvider>
      );
      expect(screen.getByLabelText('Switch theme').parentElement).toHaveClass('custom-class');
    });

    it('displays sun icon in light mode', () => {
      const { container } = render(
        <ThemeProvider attribute="class">
          <ThemeSwitcher />
        </ThemeProvider>
      );
      expect(container.querySelector('.dark\\:hidden')).toBeInTheDocument();
    });
  });

  // Integration Tests
  describe('Integration Tests', () => {
    it('switches to dark theme when in light mode', () => {
      mockTheme = 'light';
      
      render(
        <ThemeProvider attribute="class">
          <ThemeSwitcher />
        </ThemeProvider>
      );

      const button = screen.getByLabelText('Switch theme');
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('switches to light theme when not in light mode', () => {
      mockTheme = 'dark';
      
      render(
        <ThemeProvider attribute="class">
          <ThemeSwitcher />
        </ThemeProvider>
      );

      const button = screen.getByLabelText('Switch theme');
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('switches to light theme when in system mode', () => {
      mockTheme = 'system';
      
      render(
        <ThemeProvider attribute="class">
          <ThemeSwitcher />
        </ThemeProvider>
      );

      const button = screen.getByLabelText('Switch theme');
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });
});
