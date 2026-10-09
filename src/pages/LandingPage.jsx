
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import './LandingPage.css';

const services = [
  {
    icon: ClipboardCheck,
    title: 'Requests without the runaround',
    description:
      'Submit leave, gate pass, hostel, and certificate requests, then follow their progress from one place.',
    accent: 'violet',
  },
  {
    icon: Bell,
    title: 'Campus updates that find you',
    description:
      'Keep notices, reminders, and important announcements together, so the next step is easy to spot.',
    accent: 'blue',
  },
  {
    icon: CalendarDays,
    title: 'Your day, a little more organized',
    description:
      'See the student tools you need for attendance, timetables, fees, and everyday campus life.',
    accent: 'green',
  },
  {
    icon: LayoutDashboard,
    title: 'A clearer view for campus teams',
    description:
      'Give administrators one workspace to review requests, publish notices, and coordinate services.',
    accent: 'orange',
  },
];

const steps = [
  {
    number: '01',
    title: 'Choose your portal',
    description: 'Sign in to the student or administrator experience.',
    icon: GraduationCap,
  },
  {
    number: '02',
    title: 'Find what you need',
    description: 'Open your campus tools, updates, and service requests.',
    icon: BookOpen,
  },
  {
    number: '03',
    title: 'Keep things moving',
    description: 'Track progress and stay in the loop as things change.',
    icon: Check,
  },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <a
          className="landing-brand"
          href="#home"
          onClick={closeMenu}
        >
          <span className="landing-brand-mark" aria-hidden="true">
            <GraduationCap size={23} strokeWidth={2.1} />
          </span>

          <span>
            Campus<span className="landing-brand-accent">Connect</span>
          </span>
        </a>

        <button
          className="landing-menu-toggle"
          type="button"
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          aria-controls="landing-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          className={`landing-nav${menuOpen ? ' is-open' : ''}`}
          id="landing-navigation"
          aria-label="Main navigation"
        >
          <a href="#platform" onClick={closeMenu}>
            Platform
          </a>

          <a href="#how-it-works" onClick={closeMenu}>
            How it works
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a
            className="landing-nav-signin"
            href="mailto:support@campusconnect.edu"
            onClick={closeMenu}
          >
            Contact support
          </a>

          <Link
            className="landing-nav-cta"
            to="/login"
            onClick={closeMenu}
          >
            Sign in <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </header>

      <main>
        <section className="landing-hero" id="home">
          <div
            className="landing-hero-photo"
            aria-hidden="true"
          />

          <div
            className="landing-hero-orbit landing-hero-orbit-one"
            aria-hidden="true"
          />

          <div
            className="landing-hero-orbit landing-hero-orbit-two"
            aria-hidden="true"
          />

          <div className="landing-hero-inner">
            <div className="landing-hero-copy">
              <p className="landing-eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                YOUR CAMPUS, IN SYNC
              </p>

              <h1>
                Campus life,
                <br />
                <span>all in one place.</span>
              </h1>

              <p className="landing-hero-description">
                Less time chasing paperwork. More time for what matters.
                CampusConnect brings student services, campus updates, and
                everyday essentials together.
              </p>

              <div className="landing-hero-actions">
                <Link
                  className="landing-button landing-button-light"
                  to="/login"
                >
                  Explore your portal
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                <a
                  className="landing-text-link"
                  href="#platform"
                >
                  Discover the platform{' '}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="landing-hero-assurance">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>
                  One convenient home for your campus services
                </span>
              </div>
            </div>

            {/* Campus Overview dashboard preview removed */}
          </div>

          <a
            className="landing-scroll-cue"
            href="#platform"
            aria-label="Scroll to platform features"
          >
            <span />
          </a>
        </section>

        <section
          className="landing-platform landing-section"
          id="platform"
        >
          <div className="landing-section-heading">
            <p className="landing-section-kicker">
              A BETTER CAMPUS DAY
            </p>

            <h2>
              All the moving parts.{' '}
              <span>Moving together.</span>
            </h2>

            <p>
              The everyday campus essentials students and administrators
              need, connected in one straightforward experience.
            </p>
          </div>

          <div className="landing-service-grid">
            {services.map(
              ({ icon: Icon, title, description, accent }) => (
                <article
                  className="landing-service-card"
                  key={title}
                >
                  <span
                    className={`landing-service-icon ${accent}`}
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </span>

                  <h3>{title}</h3>
                  <p>{description}</p>

                  <Link
                    to="/login"
                    className="landing-card-link"
                    aria-label={`Explore ${title.toLowerCase()}`}
                  >
                    Explore
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              )
            )}
          </div>
        </section>

        <section className="landing-about" id="about">
          <div className="landing-about-inner">
            <div
              className="landing-about-art"
              aria-hidden="true"
            >
              <div className="landing-about-orb" />

              <div className="landing-about-card landing-about-card-main">
                <span className="landing-about-card-icon">
                  <ClipboardCheck size={20} />
                </span>

                <div className="landing-about-card-lines">
                  <i />
                  <i />
                  <i />
                </div>

                <span className="landing-about-check">
                  <Check size={16} />
                </span>
              </div>

              <div className="landing-about-card landing-about-card-small">
                <Bell size={17} />
                <span>Updates in one place</span>
              </div>

              <span className="landing-about-spark landing-about-spark-one">
                ✳
              </span>

              <span className="landing-about-spark landing-about-spark-two">
                ✳
              </span>
            </div>

            <div className="landing-about-copy">
              <p className="landing-section-kicker">
                BUILT AROUND CAMPUS LIFE
              </p>

              <h2>
                Good campus days start with fewer loose ends.
              </h2>

              <p>
                Finding a form, checking an announcement, or following
                up on a request shouldn’t take your whole day.
                CampusConnect makes campus services easier to find
                and simpler to follow.
              </p>

              <ul>
                <li>
                  <Check size={16} />
                  Student tools that are easy to find
                </li>

                <li>
                  <Check size={16} />
                  Clearer updates on requests and notices
                </li>

                <li>
                  <Check size={16} />
                  A dedicated workspace for campus teams
                </li>
              </ul>

              <Link
                className="landing-button landing-button-dark"
                to="/login"
              >
                See your campus portal
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="landing-how landing-section"
          id="how-it-works"
        >
          <div className="landing-section-heading">
            <p className="landing-section-kicker">
              SIMPLE BY DESIGN
            </p>

            <h2>
              Find your way in <span>three steps.</span>
            </h2>

            <p>
              Everything starts with the portal that’s right for you.
            </p>
          </div>

          <div className="landing-steps">
            {steps.map(
              ({ number, title, description, icon: Icon }) => (
                <article
                  className="landing-step"
                  key={number}
                >
                  <div className="landing-step-top">
                    <span className="landing-step-icon">
                      <Icon size={21} aria-hidden="true" />
                    </span>

                    <span className="landing-step-number">
                      {number}
                    </span>
                  </div>

                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              )
            )}
          </div>
        </section>

        <section
          className="landing-portals"
          aria-labelledby="landing-portals-title"
        >
          <div className="landing-portals-inner">
            <div className="landing-portals-heading">
              <p className="landing-section-kicker">
                YOUR CAMPUS STARTS HERE
              </p>

              <h2 id="landing-portals-title">
                Choose your portal.
              </h2>

              <p>
                Pick your role and get to the tools made for you.
              </p>
            </div>

            <div className="landing-portal-actions">
              <Link
                className="landing-portal-card"
                to="/login?role=student"
              >
                <span className="landing-portal-icon student">
                  <GraduationCap size={22} />
                </span>

                <span className="landing-portal-copy">
                  <strong>Student portal</strong>
                  <small>
                    Classes, services, updates, and more
                  </small>
                </span>

                <ArrowUpRight
                  size={19}
                  className="landing-portal-arrow"
                />
              </Link>

              <Link
                className="landing-portal-card"
                to="/login?role=admin"
              >
                <span className="landing-portal-icon admin">
                  <Building2 size={21} />
                </span>

                <span className="landing-portal-copy">
                  <strong>Administrator portal</strong>
                  <small>
                    Campus operations in one workspace
                  </small>
                </span>

                <ArrowUpRight
                  size={19}
                  className="landing-portal-arrow"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-main">
          <a
            className="landing-brand landing-footer-brand"
            href="#home"
          >
            <span className="landing-brand-mark" aria-hidden="true">
              <GraduationCap size={22} strokeWidth={2.1} />
            </span>

            <span>
              Campus<span className="landing-brand-accent">Connect</span>
            </span>
          </a>

          <p>
            One campus. Every service. A little more in sync.
          </p>

          <a
            className="landing-footer-contact"
            href="mailto:support@campusconnect.edu"
          >
            Need a hand? Contact support
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="landing-footer-bottom">
          <span>
            © {new Date().getFullYear()} CampusConnect. Built for campus life.
          </span>

          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;