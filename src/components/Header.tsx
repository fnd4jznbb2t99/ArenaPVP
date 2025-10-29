import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Ticket } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center glow-primary">
              <Ticket className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Arena
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#rounds" className="text-muted-foreground hover:text-foreground transition-colors">
              Active Rounds
            </a>
            <a href="#my-tickets" className="text-muted-foreground hover:text-foreground transition-colors">
              My Tickets
            </a>
            <a href="#winners" className="text-muted-foreground hover:text-foreground transition-colors">
              Winners
            </a>
          </nav>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};
