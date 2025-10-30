import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center glow-primary">
              <img src="/favicon.svg" alt="Arena" className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Arena
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
