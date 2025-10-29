import { Trophy, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

// Mock data - replace with actual blockchain data
const mockWinners = [
  {
    roundId: 0,
    winner: '0x742d...9c4e',
    prize: '15 ETH',
    winningNumbers: '5, 12, 19, 26, 33, 40',
    date: '2025-10-28',
  },
];

export const Winners = () => {
  return (
    <section id="winners" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-secondary" />
            Recent Winners
          </h2>
          <p className="text-muted-foreground">Congratulations to our lucky winners!</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          {mockWinners.map((winner, idx) => (
            <Card key={idx} className="glass-card border-secondary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Award className="w-6 h-6 text-secondary" />
                    Round #{winner.roundId}
                  </CardTitle>
                  <Badge className="gradient-secondary text-secondary-foreground">
                    Winner
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground block mb-1">Winner Address</span>
                    <span className="font-mono text-lg font-semibold">{winner.winner}</span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <span className="text-sm text-muted-foreground block mb-1">Prize</span>
                    <span className="text-xl font-bold gradient-secondary bg-clip-text text-transparent">
                      {winner.prize}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground block mb-2">Winning Numbers</span>
                  <div className="flex gap-2 flex-wrap">
                    {winner.winningNumbers.split(', ').map((num, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold glow-primary"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground text-right">
                  Drawn on {winner.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
