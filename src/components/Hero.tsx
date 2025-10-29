import { Shield, Lock, Trophy } from 'lucide-react';
import { Button } from './ui/button';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-float">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Powered by FHE Encryption</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow-pulse">
          Decentralized Lottery
          <br />
          with Privacy
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Experience a fully transparent lottery system where your numbers remain private until the draw, 
          secured by Fully Homomorphic Encryption technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="gradient-primary text-primary-foreground glow-primary hover:opacity-90 transition-opacity">
            Buy Tickets Now
          </Button>
          <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
            Learn How It Works
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 mx-auto glow-primary">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Private Numbers</h3>
            <p className="text-sm text-muted-foreground">
              Your lottery numbers are encrypted and remain hidden until the draw
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 mx-auto glow-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tamper-Proof</h3>
            <p className="text-sm text-muted-foreground">
              FHE ensures computations happen on encrypted data without decryption
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-4 mx-auto glow-secondary">
              <Trophy className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fair Winners</h3>
            <p className="text-sm text-muted-foreground">
              Smart contracts automatically verify and announce winners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
