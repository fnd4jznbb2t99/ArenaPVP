import { Ticket, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { Button } from './ui/button';

// Mock data - replace with actual blockchain data
const mockTickets = [
  {
    id: 'TKT-001',
    roundId: 1,
    numbers: '7, 14, 21, 28, 35, 42',
    encrypted: true,
    status: 'pending',
  },
  {
    id: 'TKT-002',
    roundId: 1,
    numbers: '3, 17, 23, 31, 38, 44',
    encrypted: true,
    status: 'pending',
  },
];

export const MyTickets = () => {
  const [revealedTickets, setRevealedTickets] = useState<Set<string>>(new Set());

  const toggleReveal = (ticketId: string) => {
    setRevealedTickets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ticketId)) {
        newSet.delete(ticketId);
      } else {
        newSet.add(ticketId);
      }
      return newSet;
    });
  };

  return (
    <section id="my-tickets" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">My Tickets</h2>
          <p className="text-muted-foreground">View your encrypted lottery tickets</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockTickets.map((ticket) => (
            <Card key={ticket.id} className="glass-card border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    {ticket.id}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Round #{ticket.roundId}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Numbers</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReveal(ticket.id)}
                      className="h-8 w-8 p-0"
                    >
                      {revealedTickets.has(ticket.id) ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="font-mono text-sm">
                    {revealedTickets.has(ticket.id) ? (
                      <span>{ticket.numbers}</span>
                    ) : (
                      <span className="text-muted-foreground">•• •• •• •• •• ••</span>
                    )}
                  </div>
                  {ticket.encrypted && (
                    <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-xs">
                      FHE Encrypted
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                    {ticket.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
