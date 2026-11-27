import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback, title } = this.props;

    if (hasError) {
      if (fallback) return fallback;
      return (
        <section className="section">
          <h2>{title || 'Section Error'}</h2>
          <p>Failed to load content. Please refresh.</p>
        </section>
      );
    }

    return children;
  }
}