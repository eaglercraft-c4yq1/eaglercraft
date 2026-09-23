import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  Circle,
  ExternalLink,
  Grid2X2,
  MessageCircle,
  Minus,
  Music2,
  Play,
  RefreshCw,
  Rocket,
  Settings,
  ShoppingBag,
  Star,
  Twitter,
  UserRound,
  Users,
  X,
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: LucideIcon;
};

type NewsItem = {
  title: string;
  subtitle: string;
  artwork: string;
  icon: LucideIcon;
  iconTone?: string;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: Play },
  { label: 'Account', icon: UserRound },
  { label: 'Modpacks', icon: Grid2X2 },
  { label: 'Marketplace', icon: ShoppingBag },
];

const newsItems: NewsItem[] = [
  {
    title: 'Premium for $2.50/M',
    subtitle: '-25% discount',
    artwork: 'premium',
    icon: Star,
    iconTone: 'red',
  },
  {
    title: 'Launcher Release Announcement',
    subtitle: 'A fresh start',
    artwork: 'release',
    icon: ExternalLink,
  },
  {
    title: 'New Custom Content Mod',
    subtitle: 'Community pick',
    artwork: 'mod',
    icon: ExternalLink,
    iconTone: 'yellow',
  },
  {
    title: 'New Cosmetics for Premium User',
    subtitle: 'New items available',
    artwork: 'cosmetics',
    icon: ExternalLink,
  },
];

function RailButton({
  item,
  active,
  onClick,
  testId,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
  testId: string;
}) {
  const Icon = item.icon;
  return (
    <button
      className={`rail-button${active ? ' active' : ''}`}
      type="button"
      title={item.label}
      aria-label={item.label}
      aria-pressed={active}
      data-testid={testId}
      onClick={onClick}
    >
      <Icon size={18} strokeWidth={1.55} />
    </button>
  );
}

function SocialBar() {
  return (
    <div className="utility-social" aria-label="Community links">
      <button className="utility-action" type="button" title="Twitter" data-testid="button-twitter">
        <Twitter />
      </button>
      <button className="utility-action" type="button" title="Community chat" data-testid="button-community">
        <MessageCircle />
      </button>
      <button className="utility-action" type="button" title="Music" data-testid="button-music">
        <Music2 />
      </button>
      <button className="utility-action" type="button" title="Video channel" data-testid="button-video">
        <Play />
      </button>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [selectedNews, setSelectedNews] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [toast, setToast] = useState('');

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    notify('Preparing Minecraft 1.20.1...');
    window.setTimeout(() => {
      setIsLaunching(false);
      notify('Minecraft 1.20.1 is ready to launch');
    }, 1500);
  };

  return (
    <main className="launcher" data-testid="launcher-shell">
      <aside className="rail" aria-label="Launcher navigation">
        <div className="brand" data-testid="brand-mark">
          <div className="brand-mark" aria-label="Launcher home">
            <Circle size={18} strokeWidth={1.2} />
          </div>
        </div>

        <nav className="rail-nav">
          {navItems.map((item) => (
            <RailButton
              key={item.label}
              item={item}
              active={activeNav === item.label}
              onClick={() => {
                setActiveNav(item.label);
                if (item.label !== 'Home') notify(`${item.label} is coming into focus`);
              }}
              testId={`button-nav-${item.label.toLowerCase()}`}
            />
          ))}
        </nav>

        <div className="rail-bottom">
          <RailButton
            item={{ label: 'Settings', icon: Settings }}
            active={activeNav === 'Settings'}
            onClick={() => {
              setActiveNav('Settings');
              notify('Launcher settings selected');
            }}
            testId="button-nav-settings"
          />
        </div>
      </aside>

      <section className="workspace">
        <header className="utility">
          <SocialBar />
          <span className="utility-divider" aria-hidden="true" />
          <span className="online" data-testid="status-online">
            <i aria-hidden="true" />
            1,245 players online now
          </span>
          <span className="premium" data-testid="status-premium">
            <Star size={11} />
            Premium Profile
          </span>
          <span className="utility-spacer" />
          <button
            className="utility-action"
            type="button"
            title="Notifications"
            data-testid="button-notifications"
            onClick={() => notify('You are all caught up')}
          >
            <Bell />
          </button>
          <button
            className="utility-action"
            type="button"
            title="Account alerts"
            data-testid="button-alerts"
            onClick={() => notify('No new account alerts')}
          >
            <Circle />
          </button>
          <button className="utility-action" type="button" title="Minimize" data-testid="button-minimize" onClick={() => notify('Launcher minimized')}>
            <Minus />
          </button>
          <button className="utility-action" type="button" title="Close" data-testid="button-close" onClick={() => notify('You can close the launcher from your desktop')}>
            <X />
          </button>
        </header>

        <div className="content">
          <div className="hero-row">
            <section className="hero" aria-labelledby="hero-title" data-testid="hero-minecraft">
              <div className="hero-grid" aria-hidden="true" />
              <div className="hero-copy">
                <h1 className="hero-title" id="hero-title">Minecraft 1.20.1</h1>
                <p className="hero-kicker">Custom Modpack</p>
                <p className="hero-description">
                  The Minecraft Trails &amp; Tales update, previously referred to as the 1.20 update,
                  was originally introduced during the 2022 Minecraft Live show.
                </p>
                <div className="hero-controls">
                  <button
                    className={`launch-button${isLaunching ? ' loading' : ''}`}
                    type="button"
                    data-testid="button-launch"
                    onClick={handleLaunch}
                  >
                    <Rocket size={13} />
                    {isLaunching ? 'LOADING WORLD' : 'LAUNCH 1.20.1'}
                  </button>
                  <button className="sync-button" type="button" title="Check for updates" data-testid="button-sync" onClick={() => notify('Your launcher is up to date')}>
                    <RefreshCw />
                  </button>
                </div>
              </div>
            </section>

            <aside className="profile-card" aria-label="Player profile" data-testid="profile-card">
              <div className="avatar-scene" aria-hidden="true">
                <div className="avatar-head" />
              </div>
              <p className="avatar-name" data-testid="text-username">docy</p>
              <div className="profile-actions">
                <button className="profile-action" type="button" data-testid="button-manage-account" onClick={() => notify('Account management opened')}>
                  Manage Account
                </button>
                <button className="profile-action secondary" type="button" data-testid="button-friends" onClick={() => notify('Friends list is empty')}>
                  <Users size={11} style={{ marginRight: 5 }} />
                  Your Friends
                </button>
                <button className="profile-action muted" type="button" data-testid="button-logout" onClick={() => notify('Logout is disabled in this preview')}>
                  Log out
                </button>
              </div>
            </aside>
          </div>

          <div className="section-heading">
            <h2>Latest News</h2>
            <button type="button" data-testid="button-view-all-news" onClick={() => notify('Showing the latest announcements')}>
              View all
            </button>
          </div>

          <section className="news-grid" aria-label="Latest news" data-testid="news-grid">
            {newsItems.map((item, index) => {
              const NewsIcon = item.icon;
              return (
                <article
                  className={`news-card${selectedNews === index ? ' selected' : ''}`}
                  key={item.title}
                  data-testid={`card-news-${index}`}
                  onClick={() => {
                    setSelectedNews(index);
                    notify(item.title);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setSelectedNews(index);
                      notify(item.title);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedNews === index}
                >
                  <div className={`news-art ${item.artwork}`} aria-hidden="true" />
                  <div className="news-content">
                    <div>
                      <p className="news-title">{item.title}</p>
                      <span className="news-label">{item.subtitle}</span>
                    </div>
                    <span className={`news-icon${item.iconTone ? ` ${item.iconTone}` : ''}`}>
                      <NewsIcon />
                    </span>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
      {toast ? <div className="toast" role="status" data-testid="status-toast">{toast}</div> : null}
    </main>
  );
}

export default App;