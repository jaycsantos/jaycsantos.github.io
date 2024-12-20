import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tags } from '../Tags';

jest.mock('motion/react', () => ({
  motion: {
    ul: ({ children, whileInView, variants, initial, ...props }) => (
      <ul {...props}>{children}</ul>
    ),
    li: ({ children, variants, ...props }) => <li {...props}>{children}</li>,
  },
}));

describe('Tags Component', () => {
  it('renders tags correctly', () => {
    const tags = ['React', 'TypeScript', 'Next.js'];
    render(<Tags tags={tags} />);

    tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const tags = ['React'];
    const customClass = 'custom-class';
    const { container } = render(<Tags tags={tags} className={customClass} />);

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('renders children when provided', () => {
    const tags = ['React'];
    const childText = 'Child Component';
    render(
      <Tags tags={tags}>
        <span>{childText}</span>
      </Tags>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('renders empty list when no tags provided', () => {
    const { container } = render(<Tags tags={[]} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});
