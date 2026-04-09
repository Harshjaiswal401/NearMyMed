import React from 'react';

interface PageLayoutProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'cyan';
  children: React.ReactNode;
  headerGradient?: string;
  accentColor?: string;
}

const badgeStyles: Record<string, string> = {
  blue: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  red: 'bg-red-500/15 text-red-300 border border-red-500/30',
  green: 'bg-green-500/15 text-green-300 border border-green-500/30',
  purple: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
  orange: 'bg-orange-500/15 text-orange-300 border border-orange-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
};

export function PageLayout({
  icon,
  title,
  subtitle,
  badge,
  badgeColor = 'blue',
  children,
  headerGradient = 'from-blue-600/20 via-blue-500/5 to-transparent',
  accentColor = 'blue',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080c14] bg-dark-grid">
      {/* Page Header */}
      <div className={`relative bg-gradient-to-b ${headerGradient} border-b border-white/5`}>
        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-20 -right-20 w-80 h-80 bg-${accentColor}-600/10 rounded-full blur-3xl animate-orb`} />
          <div className={`absolute -bottom-20 -left-20 w-60 h-60 bg-${accentColor}-800/10 rounded-full blur-3xl`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-${accentColor}-500/10 border border-${accentColor}-500/20 rounded-2xl`}>
                {icon}
              </div>
              {badge && (
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${badgeStyles[badgeColor]}`}>
                  {badge}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">{title}</h1>
            {subtitle && (
              <p className="mt-3 text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="animate-fade-in-up">
          {children}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'red' | 'green' | 'violet' | 'cyan' | 'none';
}

export function Card({ children, className = '', hover = false, glow = 'none' }: CardProps) {
  const glowMap: Record<string, string> = {
    blue: 'hover:neon-blue hover:border-blue-500/30',
    red: 'hover:neon-red hover:border-red-500/30',
    green: 'hover:shadow-green-500/20',
    violet: 'hover:neon-violet hover:border-violet-500/30',
    cyan: 'hover:neon-cyan hover:border-cyan-500/30',
    none: '',
  };

  return (
    <div
      className={`glass rounded-2xl ${
        hover ? `hover:bg-white/8 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${glowMap[glow]}` : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-white mb-4">{children}</h2>
  );
}

export function SearchBar({
  placeholder,
  onSearch,
  buttonLabel = 'Search',
  accent = 'blue',
}: {
  placeholder: string;
  onSearch?: (val: string) => void;
  buttonLabel?: string;
  accent?: string;
}) {
  const [value, setValue] = React.useState('');

  const accentMap: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-500 focus-within:ring-blue-500/40',
    red: 'bg-red-600 hover:bg-red-500 focus-within:ring-red-500/40',
    violet: 'bg-violet-600 hover:bg-violet-500 focus-within:ring-violet-500/40',
    cyan: 'bg-cyan-600 hover:bg-cyan-500 focus-within:ring-cyan-500/40',
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 p-1 glass rounded-2xl border border-white/10 ring-2 ring-transparent transition-all focus-within:ring-2 ${accentMap[accent]?.split(' ').slice(2).join(' ') || 'focus-within:ring-blue-500/30'}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(value)}
        placeholder={placeholder}
        className="flex-1 px-5 py-3.5 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
      />
      <button
        onClick={() => onSearch?.(value)}
        className={`${accentMap[accent]?.split(' ').slice(0, 2).join(' ') || 'bg-blue-600 hover:bg-blue-500'} text-white font-semibold px-7 py-3.5 rounded-xl transition shadow-lg text-sm whitespace-nowrap`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export function MapPlaceholder({ label = 'Map View' }: { label?: string }) {
  return (
    <div className="relative glass rounded-2xl overflow-hidden h-72 md:h-96 flex items-center justify-center">
      {/* Fake dark map grid */}
      <div className="absolute inset-0 opacity-30 bg-dark-grid" />
      {/* Glowing roads */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-blue-500/30" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-blue-500/20" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-blue-500/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-blue-500/20" />
      </div>
      {/* Pings */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-300 animate-pulse-blue shadow-lg" />
      </div>
      <div className="absolute top-2/3 left-3/4 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-300 animate-pulse-red shadow-lg" />
      </div>
      {/* Center card */}
      <div className="relative z-10 text-center glass rounded-2xl px-8 py-6 border border-white/10">
        <div className="text-4xl mb-3">🗺️</div>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-slate-400 text-xs mt-1">Location services required</p>
        <button className="mt-3 text-xs bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-500 transition shadow-lg neon-blue">
          Enable GPS
        </button>
      </div>
    </div>
  );
}

export function ChatUI() {
  const [messages, setMessages] = React.useState([
    { role: 'ai', text: "Hello! I'm MedAI, your personal healthcare assistant powered by advanced AI. How can I help you today?" },
  ]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    const aiReply = {
      role: 'ai',
      text: `I understand you're asking about "${input}". Based on my comprehensive medical knowledge, I'm analyzing your query. For the best results, I recommend consulting a licensed healthcare professional for personalized medical advice.`,
    };
    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInput('');
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[520px] glass rounded-2xl border border-white/8 overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-blue-500/5">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg neon-blue">
          AI
        </div>
        <div>
          <p className="font-bold text-white text-sm">MedAI Assistant</p>
          <p className="text-xs text-green-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
            Online · Always ready
          </p>
        </div>
        <span className="ml-auto text-xs bg-blue-500/15 text-blue-300 border border-blue-500/25 px-3 py-1.5 rounded-full font-semibold">
          GPT-Powered
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black mr-2 mt-0.5 flex-shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm shadow-lg neon-blue'
                  : 'glass text-slate-200 rounded-bl-sm border border-white/8'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/8 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your health question..."
          className="flex-1 px-4 py-2.5 glass rounded-xl border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-500 transition shadow-lg neon-blue"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export function EmptyResultCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}

export function InfoBadge({ label, value, color = 'blue' }: { label: string; value: string; color?: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    red: 'bg-red-500/10 border-red-500/20 text-red-300',
    green: 'bg-green-500/10 border-green-500/20 text-green-300',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
  };
  return (
    <div className={`flex flex-col rounded-2xl border p-5 ${colorMap[color] ?? colorMap.blue}`}>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-2xl font-black mt-1">{value}</span>
    </div>
  );
}

export function MedicineCard({
  name,
  brand,
  category,
  price,
  rating,
  trend,
  onClick,
}: {
  name: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  trend: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full glass rounded-2xl p-5 text-left hover:bg-white/8 hover:-translate-y-1 transition-all duration-300 group border border-white/8 hover:border-blue-500/30 hover:neon-blue"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
          💊
        </div>
        <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
          ↑ {trend}
        </span>
      </div>
      <h4 className="font-bold text-white text-sm group-hover:text-blue-300 transition">{name}</h4>
      <p className="text-xs text-slate-500 mt-1">{brand} · {category}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-blue-400 font-black text-sm">{price}</span>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          ⭐ {rating}
        </span>
      </div>
    </button>
  );
}
