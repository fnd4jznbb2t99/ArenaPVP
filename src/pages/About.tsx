import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Ticket, Trophy, Zap, Lock, Eye, Users, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About ArenaPVP
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The world's first privacy-preserving lottery platform powered by Fully Homomorphic Encryption (FHE)
          </p>
        </div>

        {/* What is ArenaPVP */}
        <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-6 h-6 text-primary" />
              What is ArenaPVP?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              ArenaPVP is a revolutionary blockchain-based lottery platform that ensures complete privacy
              for all participants. Unlike traditional lotteries where your numbers might be visible,
              ArenaPVP uses cutting-edge Fully Homomorphic Encryption (FHE) technology to keep your
              lucky numbers completely private throughout the entire process.
            </p>
            <p>
              Built on Ethereum's Sepolia testnet using Zama's fhEVM 0.8.0, ArenaPVP represents the
              future of fair and transparent gaming where privacy and verifiability coexist.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="w-6 h-6 text-primary" />
              How It Works
            </CardTitle>
            <CardDescription>Understanding the lottery mechanism</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg mt-1 shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">1. Round Creation</h3>
                    <p className="text-sm text-muted-foreground">
                      Admin creates lottery rounds with a specific deadline. Each round has a unique ID
                      and accepts encrypted ticket submissions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg mt-1 shrink-0">
                    <Ticket className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">2. Buy Tickets</h3>
                    <p className="text-sm text-muted-foreground">
                      Players choose a lucky number (1-100) and submit it. Your number is encrypted
                      client-side using FHE before being sent to the blockchain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg mt-1 shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">3. Draw & Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      After the deadline, admin draws a winning number. Winners are verified off-chain
                      by comparing encrypted values, maintaining complete privacy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg mt-1 shrink-0">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">4. Winners Announced</h3>
                    <p className="text-sm text-muted-foreground">
                      Winning addresses are published on-chain. Winners can verify their win without
                      revealing their chosen numbers to others.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 border border-primary/10">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  How It Works - Video Demo
                </h4>
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-primary/20">
                  <video
                    controls
                    className="w-full h-full"
                    poster="/demovedio.mp4"
                  >
                    <source src="/demovedio.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FHE Technology */}
        <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lock className="w-6 h-6 text-primary" />
              FHE Technology
            </CardTitle>
            <CardDescription>Privacy-preserving cryptography explained</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-lg">What is Fully Homomorphic Encryption?</h3>
              <p className="text-muted-foreground mb-4">
                Fully Homomorphic Encryption (FHE) is a revolutionary cryptographic technique that allows
                computations to be performed on encrypted data without ever decrypting it. This means
                your lottery numbers remain private throughout the entire process - from submission to
                winner verification.
              </p>
            </div>

            <Separator />

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-primary/10">
                <Lock className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Complete Privacy</h4>
                <p className="text-sm text-muted-foreground">
                  Your chosen numbers are encrypted on your device and never revealed, even during verification
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-primary/10">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Verifiable Results</h4>
                <p className="text-sm text-muted-foreground">
                  All operations are performed on-chain, ensuring transparency and tamper-proof results
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-primary/10">
                <Users className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Fair for Everyone</h4>
                <p className="text-sm text-muted-foreground">
                  No one, not even the admin, can see or manipulate your numbers before the draw
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
              <h4 className="font-semibold mb-2">Technical Implementation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>Zama fhEVM 0.8.0:</strong> Ethereum Virtual Machine with built-in FHE operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>euint32 Type:</strong> Encrypted 32-bit unsigned integers for storing numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>Client-side Encryption:</strong> Numbers are encrypted in your browser using Zama Relayer SDK</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>On-chain Verification:</strong> Winner matching performed on encrypted values</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How to Participate */}
        <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="w-6 h-6 text-primary" />
              How to Participate
            </CardTitle>
            <CardDescription>Start playing in just a few steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Connect Wallet" and select MetaMask or any supported wallet. Make sure you're
                    connected to Sepolia testnet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Test ETH</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit a Sepolia faucet (like{" "}
                    <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      sepoliafaucet.com
                    </a>
                    ) to get free test ETH for gas fees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Choose an Active Round</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse active lottery rounds on the home page. Check the deadline and number of
                    participants before joining.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Buy Your Ticket</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Buy Ticket", enter your lucky number (1-100), and confirm the transaction.
                    Your number will be automatically encrypted!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Wait for Results</h3>
                  <p className="text-sm text-muted-foreground">
                    After the round deadline, the admin will draw the winning number. Check back to see
                    if you won!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-8 rounded-lg border border-primary/10 mt-6">
              <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Video Tutorial
              </h4>
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-primary/10">
                <video
                  controls
                  className="w-full h-full"
                  poster="/demovedio.mp4"
                >
                  <source src="/demovedio.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Fairness */}
        <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Shield className="w-6 h-6 text-primary" />
              Security & Fairness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              <strong>Transparent Smart Contract:</strong> All lottery logic is implemented in an
              open-source Solidity smart contract deployed on Sepolia testnet. Anyone can verify the code.
            </p>
            <p>
              <strong>Immutable Records:</strong> Once submitted, your encrypted ticket cannot be modified
              or deleted. All transactions are permanently recorded on the blockchain.
            </p>
            <p>
              <strong>No Single Point of Failure:</strong> The lottery runs entirely on-chain. There's no
              centralized server that could manipulate results or access your data.
            </p>
            <p>
              <strong>Auditable Process:</strong> Every step from ticket purchase to winner announcement
              can be independently verified using blockchain explorers.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-primary/10">
          <p>Built with Zama fhEVM • Secured by Ethereum • Powered by FHE</p>
          <p className="mt-2">
            Contract Address:{" "}
            <code className="bg-muted px-2 py-1 rounded text-xs">
              {import.meta.env.VITE_CONTRACT_ADDRESS}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
