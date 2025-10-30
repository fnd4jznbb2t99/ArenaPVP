import { Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAccount } from 'wagmi';
import { useRoundsCount, useUserTickets, useIsWinner, useRound } from '../hooks/useLottery';
import { useMemo } from 'react';

interface TicketData {
  id: string;
  roundId: bigint;
  ticketIndex: number;
  encrypted: boolean;
  status: 'pending' | 'drawn' | 'winner';
  roundName: string;
}

// Hook to fetch tickets for a single round
function useRoundTickets(roundId: bigint, userAddress: `0x${string}` | undefined) {
  const { data: ticketIndices } = useUserTickets(roundId, userAddress);
  const { data: isWinner } = useIsWinner(roundId, userAddress);
  const { data: roundData } = useRound(roundId);

  return useMemo(() => {
    const tickets: TicketData[] = [];

    if (ticketIndices && Array.isArray(ticketIndices) && ticketIndices.length > 0) {
      const [name, , , drawn] = roundData || ['Unknown', 0n, 0n, false, 0n, 0n];

      ticketIndices.forEach((ticketIdx) => {
        const status = drawn ? (isWinner ? 'winner' : 'drawn') : 'pending';
        tickets.push({
          id: `TKT-${Number(roundId)}-${Number(ticketIdx)}`,
          roundId,
          ticketIndex: Number(ticketIdx),
          encrypted: true,
          status,
          roundName: String(name),
        });
      });
    }

    return tickets;
  }, [ticketIndices, isWinner, roundData, roundId]);
}

export const MyTickets = () => {
  const { address } = useAccount();
  const { data: roundsCount } = useRoundsCount();

  // Fetch tickets from all rounds
  const round0Tickets = useRoundTickets(0n, address);
  const round1Tickets = useRoundTickets(1n, address);
  const round2Tickets = useRoundTickets(2n, address);
  const round3Tickets = useRoundTickets(3n, address);
  const round4Tickets = useRoundTickets(4n, address);

  // Combine all tickets
  const allTickets = useMemo(() => {
    if (!address) return [];
    const count = Number(roundsCount || 0);
    const ticketArrays = [round0Tickets, round1Tickets, round2Tickets, round3Tickets, round4Tickets];
    return ticketArrays.slice(0, count).flat();
  }, [address, roundsCount, round0Tickets, round1Tickets, round2Tickets, round3Tickets, round4Tickets]);

  if (!address) {
    return (
      <section id="my-tickets" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">My Tickets</h2>
            <p className="text-muted-foreground">Connect your wallet to view your tickets</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="my-tickets" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">My Tickets</h2>
          <p className="text-muted-foreground">View your encrypted lottery tickets</p>
        </div>

        {allTickets.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>You don't have any tickets yet</p>
            <p className="text-sm mt-2">Buy a ticket to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {allTickets.map((ticket) => (
              <Card key={ticket.id} className="glass-card border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-primary" />
                      {ticket.id}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      Round #{Number(ticket.roundId)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{ticket.roundName}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Number</span>
                      <span className="text-xs text-muted-foreground">Ticket #{ticket.ticketIndex}</span>
                    </div>
                    <div className="font-mono text-sm">
                      <span className="text-muted-foreground">••••••</span>
                    </div>
                    {ticket.encrypted && (
                      <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-xs">
                        FHE Encrypted
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <span className="text-xs text-muted-foreground">Status</span>
                    <Badge
                      className={`text-xs ${
                        ticket.status === 'winner'
                          ? 'bg-green-500/20 text-green-500 border-green-500/30'
                          : ticket.status === 'drawn'
                          ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                          : 'bg-accent/20 text-accent border-accent/30'
                      }`}
                    >
                      {ticket.status === 'winner' ? '🏆 Winner!' : ticket.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
