import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PawPrint, Menu, Users, Clock3 } from "lucide-react";
import { Ticker } from "./Ticker";
import { useSession, firstName, ROLE_LABEL } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type NavItem = { to: string; label: string };

const OWNER_NAV: NavItem[] = [
  { to: "/owner/dashboard", label: "Pet Dashboard" },
  { to: "/owner/products", label: "Shop" },
  { to: "/owner/emergency", label: "Emergency" },
];
const VET_NAV: NavItem[] = [{ to: "/vet/dashboard", label: "Vet Dashboard" }];
const SHELTER_NAV: NavItem[] = [
  { to: "/shelter/gallery", label: "Adopt" },
  { to: "/shelter/stories", label: "Success Stories" },
  { to: "/shelter/events", label: "Events" },
  { to: "/shelter/contact", label: "Shelter Contact" },
];
const COMMON_NAV: NavItem[] = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/feedback", label: "Feedback" },
];

function LiveClock() {
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-sky-foreground tabular-nums">
      <Clock3 className="h-3.5 w-3.5" aria-hidden />
      {time}
    </span>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let base = 1200 + Math.floor(Math.random() * 800);
    setCount(base);
    const id = setInterval(() => {
      base += Math.floor(Math.random() * 3) + 1;
      setCount(base);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-xs font-semibold text-sage-foreground tabular-nums">
      <Users className="h-3.5 w-3.5" aria-hidden />
      {count === null ? "—" : count.toLocaleString()} visitors
    </span>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { userName, role } = useSession();
  const [open, setOpen] = useState(false);

  const roleNav = role === "owner" ? OWNER_NAV : role === "vet" ? VET_NAV : role === "shelter" ? SHELTER_NAV : [];
  const nav = [...roleNav, ...COMMON_NAV];

  const links = (onClick?: () => void) =>
    nav.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        onClick={onClick}
        activeProps={{ className: "text-primary after:w-full" }}
        className="relative py-1 text-sm font-semibold text-foreground/80 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
      >
        {item.label}
      </Link>
    ));

  return (
    <div className="flex min-h-screen flex-col">
      <Ticker />
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <PawPrint className="h-5.5 w-5.5" aria-hidden />
              </span>
              <span className="hidden font-display text-xl font-bold sm:block">FurEver Care</span>
            </Link>
            <div className="min-w-0">
              {userName ? (
                <p className="truncate text-sm font-bold text-plum">
                  Welcome, {firstName(userName)}
                  {role && (
                    <span className="ml-2 rounded-full bg-blush px-2.5 py-0.5 text-[11px] font-semibold text-blush-foreground shadow-sm">
                      {ROLE_LABEL[role]}
                    </span>
                  )}
                </p>
              ) : (
                <p className="truncate text-sm text-muted-foreground">They Deserve Forever Love</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 xl:flex">
              <LiveClock />
              <VisitorCounter />
            </div>
            <nav className="hidden items-center gap-6 lg:flex">{links()}</nav>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden rounded-xl" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="font-display text-xl">Menu</SheetTitle>
                <nav className="mt-8 flex flex-col gap-5">{links(() => setOpen(false))}</nav>
                <div className="mt-6 flex flex-wrap gap-3">
                  <LiveClock />
                  <VisitorCounter />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="page-enter flex-1">{children}</main>

      <footer className="mt-20 border-t border-border/60 bg-cream/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="space-y-1">
            <p className="font-display text-lg font-bold text-plum">
              FurEver Care
            </p>
            <p className="text-muted-foreground">They Deserve Forever Love</p>
          </div>
          <nav className="flex flex-wrap gap-5">{links()}</nav>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-3xl font-extrabold text-plum sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
