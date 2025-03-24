/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Component } from 'react';
import styles from './page.module.scss';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // error logging using services like sentry, bugsnag can be done here.
    console.log({ error, errorInfo });
  }
  render() {
    if ((this.state as any).hasError) {
      return (
        <div className={styles.error_page__wrapper}>
          <h1>Sorry, an error occurred.</h1>
          <p>Please try again later.</p>
        </div>
      );
    }
    return (this.props as any).children;
  }
}
export default ErrorBoundary;
