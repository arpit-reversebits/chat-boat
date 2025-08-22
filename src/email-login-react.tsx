
import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

type EmailLoginProps = {
  onLogin: (email: string) => void;
};

export default function EmailLogin({ onLogin }: EmailLoginProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email);
    }, 1500);
  };

  const isValidEmail = email.includes('@') && email.includes('.');

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <Mail className="icon" />
          </div>
          <h1 className="login-title">Company's Name</h1>
          <p className="login-subtitle">Create and manage your custom chatbots</p>
        </div>
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome back</h2>
            <p>Enter your email to access your dashboard</p>
          </div>
          <div className="login-form-group">
            <label htmlFor="email">Email address</label>
            <div className="login-input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="login-input"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Mail className="input-icon" />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isValidEmail || isLoading}
            className="login-btn"
          >
            {isLoading ? (
              <div className="spinner" />
            ) : (
              <>
                Continue
                <ArrowRight className="arrow-icon" />
              </>
            )}
          </button>
        </div>
        <div className="login-footer">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
