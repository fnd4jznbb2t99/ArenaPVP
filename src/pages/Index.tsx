import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ActiveRounds } from '@/components/ActiveRounds';
import { MyTickets } from '@/components/MyTickets';
import { Winners } from '@/components/Winners';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ActiveRounds />
        <MyTickets />
        <Winners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
