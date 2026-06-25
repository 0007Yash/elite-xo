import { useEffect, useRef } from 'react';
import { Bot, Zap, Shield, Music, Crown, ExternalLink, BadgeCheck, Code2, Users, CalendarDays } from 'lucide-react';
import bannerImg from '@assets/InShot_20250519_234540673_1782304436790.gif';
import avatarGif from '@assets/discord_fake_avatar_decorations_1782309224367_1782309401791.gif';
import eliteLogo from '@assets/026ba5a194cf2c9d4e6278071e8b5627_1782309319626.webp';

interface ParticleData {
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: 'dot' | 'ring' | 'star';
  drift: number;
}

interface ShootingStarData {
  top: number;
  left: number;
  delay: number;
  duration: number;
}

const ParticleBackground = () => {
  const particlesRef = useRef<ParticleData[]>([]);
  const starsRef = useRef<ShootingStarData[]>([]);

  if (particlesRef.current.length === 0) {
    const types: Array<'dot' | 'ring' | 'star'> = ['dot', 'dot', 'dot', 'ring', 'ring', 'star'];
    particlesRef.current = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 8,
      size: 2 + Math.random() * 5,
      type: types[Math.floor(Math.random() * types.length)],
      drift: (Math.random() - 0.5) * 80,
    }));
  }

  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 5 }, (_, i) => ({
      top: 5 + Math.random() * 40,
      left: -10 - i * 5,
      delay: i * 4 + Math.random() * 3,
      duration: 6 + Math.random() * 4,
    }));
  }

  return (
    <div className="particle-bg">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Shooting stars */}
      {starsRef.current.map((s, i) => (
        <div
          key={`star-${i}`}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          className={`particle particle-${p.type}`}
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

interface BotData {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  inviteUrl: string;
  stats: string;
  features: string[];
}

const bots: BotData[] = [
  {
    name: 'Kyraa.xo',
    description: 'Kyraa.xo is a fast, powerful, and Discord music bot high-quality music Kyraa.xo keeps the vibes going.',
    icon: <Music className="w-8 h-8" />,
    color: 'from-red-500 to-red-700',
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1410402936487411774',
    stats: '2.4M servers',
    features: ['24/7', 'No Prefix', 'Hi-Fi Music'],
  },
  {
    name: 'Moonify.xo',
    description: 'Moonify.xo is a High-quality music playback directly in your voice channels from YouTube, Spotify, and SoundCloud.',
    icon: <Music className="w-8 h-8" />,
    color: 'from-red-400 to-red-600',
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1400143994893111426',
    stats: '1.8M servers',
    features: ['24/7', 'No Prefix', 'Hi-Fi Music'],
  },
  {
    name: 'Miko.xo',
    description: 'Miko.xo is a powerful Discord music bot that delivers high-quality audio, smooth playback, and lightning-fast performance.',
    icon: <Music className="w-8 h-8" />,
    color: 'from-red-600 to-red-800',
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1517198731672555540',
    stats: '3.1M servers',
    features: ['24/7', 'No Prefix', 'Hi-Fi Music'],
  },
  {
    name: 'Feather.xo',
    description: 'Feather.xo is a feature-rich Discord music bot built for smooth playback, high-quality audio, and an exceptional listening experience.',
    icon: <Music className="w-8 h-8" />,
    color: 'from-red-500 to-red-700',
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1516725854271438908',
    stats: '1.2M servers',
    features: ['24/7', 'No Prefix', 'Hi-Fi Music'],
  },
];

const BotCard = ({ bot, index }: { bot: BotData; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl p-6 flex flex-col h-full opacity-0"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`bot-logo-container w-16 h-16 rounded-xl flex items-center justify-center text-red-400`}>
          {bot.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{bot.name}</h3>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {bot.features.map((feature, i) => (
          <span key={i} className="text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20 px-3 py-1 rounded-full">
            {feature}
          </span>
        ))}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
        {bot.description}
      </p>

      <a
        href={bot.inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gradient w-full py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        Invite {bot.name}
      </a>
    </div>
  );
};

const OwnerSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="glass-card-strong rounded-2xl overflow-hidden opacity-0 mb-16">
      {/* Banner */}
      <div className="h-48 relative overflow-hidden">
        <img
          src={bannerImg}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140505]/80 via-transparent to-transparent" />
      </div>

      {/* Owner Info */}
      <div className="p-6 relative">
        {/* Avatar with online dot */}
        <div className="absolute -top-12 left-6">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full border-4 border-[#140505] avatar-glow overflow-hidden">
              <img
                src={avatarGif}
                alt="Owner Avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#140505]" />
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left: name, bio */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white">!@.YxSH</h2>
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck className="w-3 h-3" />
                Verified Developer
              </span>
            </div>
            <p className="text-red-400 text-sm font-medium mb-3">Bot Developer &amp; Server Owner</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Bot Developer passionate about creating high-performance Discord bots with advanced music,
              moderation, utility, and automation features. Focused on delivering reliable, scalable, and
              user-friendly solutions that enhance server management and community engagement. 🚀💻
            </p>
          </div>

          {/* Right: stat cards */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <Code2 className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-white text-sm font-medium">TypeScript, Node.js, Go</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <Users className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-white text-sm font-medium">Managing 50k+ Users</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <CalendarDays className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-white text-sm font-medium">Joined Oct 2017</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const botsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (botsRef.current) observer.observe(botsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="gradient-bg min-h-screen relative">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src={eliteLogo} alt="Elite.xo" className="h-12 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-red-300">Development</span>
            <a
              href="https://discord.gg/RRtu4qyP8y"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-200"
            >
              Support
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-4">
        <div ref={heroRef} className="max-w-4xl mx-auto text-center opacity-0">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-300 text-sm font-medium">Premium Discord Bots</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight glow-text">
            <span className="gradient-text">Elite.xo</span>
            <br />
            <span className="text-white/90">Development</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Crafting the next generation of Discord bots. From advanced moderation
            to immersive music experiences, we power the servers that matter.
          </p>
        </div>
      </section>

      {/* Owner Section */}
      <section className="relative z-10 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <OwnerSection />
        </div>
      </section>

      {/* Bots Section */}
      <section className="relative z-10 px-4 pb-16">
        <div ref={botsRef} className="max-w-7xl mx-auto opacity-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="gradient-text">Bots</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each bot is designed for a specific purpose, built with premium quality and performance in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bots.map((bot, index) => (
              <BotCard key={bot.name} bot={bot} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-500/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={eliteLogo} alt="Elite.xo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-gray-500 text-sm">
            Premium Discord bots crafted with excellence.
          </p>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Elite.xo Development. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
