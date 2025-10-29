import { Clock, Users, Coins } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useRoundsCount, useRound } from '@/hooks/useLottery';
import { useState, useEffect } from 'react';
import { BuyTicketDialog } from './BuyTicketDialog';

const RoundCard = ({ roundId }: { roundId: number }) => {
  const { data: roundData } = useRound(BigInt(roundId));
  const [showBuyDialog, setShowBuyDialog] = useState(false);

  if (!roundData) {
    return (
      <Card className="glass-card border-border/50 animate-pulse">
        <CardHeader>
          <div className="h-8 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const [name, winningNumber, drawTime, drawn, ticketCount, winnerCount] = roundData as [
    string,
    number,
    bigint,
    boolean,
    bigint,
    bigint
  ];

  const deadline = new Date(Number(drawTime) * 1000);
  const isActive = !drawn && deadline.getTime() > Date.now();

  return (
    <>
      <Card key={roundId} className="glass-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{name || `Round #${roundId}`}</CardTitle>
            <Badge
              className={
                isActive
                  ? 'bg-primary/20 text-primary border-primary/30'
                  : 'bg-muted text-muted-foreground border-muted'
              }
            >
              {drawn ? 'Drawn' : isActive ? 'Active' : 'Closed'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-secondary" />
              <span className="text-muted-foreground">Winning Number</span>
            </div>
            <span className="text-xl font-bold gradient-secondary bg-clip-text text-transparent">
              {drawn && winningNumber ? winningNumber : '???'}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Participants</span>
            </div>
            <span className="text-lg font-semibold">{Number(ticketCount)}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">Deadline</span>
            </div>
            <span className="text-sm font-medium">{deadline.toLocaleString()}</span>
          </div>

          {drawn && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="text-muted-foreground">Winners</span>
              <span className="text-lg font-semibold text-green-500">{Number(winnerCount)}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full gradient-primary text-primary-foreground glow-primary hover:opacity-90 transition-opacity"
            disabled={!isActive}
            onClick={() => setShowBuyDialog(true)}
          >
            {drawn ? 'Round Closed' : isActive ? 'Buy Ticket' : 'Expired'}
          </Button>
        </CardFooter>
      </Card>

      <BuyTicketDialog
        open={showBuyDialog}
        onClose={() => setShowBuyDialog(false)}
        roundId={BigInt(roundId)}
        roundName={name || `Round #${roundId}`}
      />
    </>
  );
};

export const ActiveRounds = () => {
  const { data: totalRounds } = useRoundsCount();
  const [rounds, setRounds] = useState<number[]>([]);

  useEffect(() => {
    if (totalRounds) {
      const count = Number(totalRounds);
      const roundIds = Array.from({ length: count }, (_, i) => i);
      setRounds(roundIds);
    }
  }, [totalRounds]);

  return (
    <section id="rounds" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Active Lottery Rounds</h2>
          <p className="text-muted-foreground">
            Choose a round and buy your encrypted tickets
          </p>
        </div>

        {rounds.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No active rounds yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {rounds.map((roundId) => (
              <RoundCard key={roundId} roundId={roundId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
