// Import libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Import styles
import './index.css';

// Import application components and utilities
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Router
import { BrowserRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo ? this.state.errorInfo.componentStack : ""}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Use ReactDOM.render
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// Report web vitals
reportWebVitals();
