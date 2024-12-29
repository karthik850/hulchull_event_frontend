import React from "react";
import ErrorMessage from "./ErrorMessage";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  componentDidMount() {
    // Suppress the warning related to findDOMNode deprecation
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes('findDOMNode')) {
        // Ignore the warning silently
        return;
      }
      // Call the original console.warn for other warnings
      originalWarn(...args);
    };

    // Restore the original console.warn after component unmount
    this.restoreConsoleWarn = () => {
      console.warn = originalWarn;
    };
  }

  componentWillUnmount() {
    // Restore the original console.warn
    if (this.restoreConsoleWarn) {
      this.restoreConsoleWarn();
    }
  }

  componentDidCatch(error, info) {
    if (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorMessage>{this.props.message}</ErrorMessage>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
