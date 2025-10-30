import { Trophy, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useRoundsCount, useRound, useWinners } from '../hooks/useLottery';

interface WinnerData {
  roundId: number;
  roundName: string;
  winningNumber: number;
  winners: string[];
  drawTime: bigint;
  drawn: boolean;
}

// Component to fetch and display winner data for a single round
function RoundWinnerCard({ roundId }: { roundId: bigint }) {
  const { data: roundData } = useRound(roundId);
  const { data: winners } = useWinners(roundId);

  if (!roundData || !roundData[3]) return null; // Not drawn yet

  const [name, winningNumber, drawTime, drawn] = roundData;

  if (!drawn) return null;

  const winnerData: WinnerData = {
    roundId: Number(roundId),
    roundName: String(name),
    winningNumber: Number(winningNumber),
    winners: (winners as string[]) || [],
    drawTime,
    drawn,
  };

  return (
    <Card className="glass-card border-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Award className="w-6 h-6 text-secondary" />
            Round #{winnerData.roundId}
          </CardTitle>
          <Badge className="gradient-secondary text-secondary-foreground">
            Winner
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{winnerData.roundName}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {winnerData.winners.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground block mb-1">Winner Address</span>
                <span className="font-mono text-sm font-semibold">
                  {winnerData.winners[0].slice(0, 6)}...{winnerData.winners[0].slice(-4)}
                </span>
                {winnerData.winners.length > 1 && (
                  <span className="text-xs text-muted-foreground block mt-1">
                    +{winnerData.winners.length - 1} more
                  </span>
                )}
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <span className="text-sm text-muted-foreground block mb-1">Winners</span>
                <span className="text-xl font-bold gradient-secondary bg-clip-text text-transparent">
                  {winnerData.winners.length}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground block mb-2">Winning Number</span>
              <div className="flex items-center justify-center">
                <div className="px-8 py-4 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-3xl glow-primary">
                  {winnerData.winningNumber.toString().padStart(6, '0')}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No winners for this round</p>
            <div className="mt-4 p-4 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground block mb-2">Winning Number</span>
              <div className="flex items-center justify-center">
                <div className="px-8 py-4 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-3xl glow-primary">
                  {winnerData.winningNumber.toString().padStart(6, '0')}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground text-right">
          Drawn on {new Date(Number(winnerData.drawTime) * 1000).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}

export const Winners = () => {
  const { data: roundsCount } = useRoundsCount();

  const totalRounds = Number(roundsCount || 0);

  // If no rounds exist yet
  if (totalRounds === 0) {
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
          <div className="text-center text-muted-foreground max-w-md mx-auto">
            <p>No lottery rounds created yet</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

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
          {Array.from({ length: totalRounds }, (_, i) => (
            <RoundWinnerCard key={`round-${i}`} roundId={BigInt(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};
