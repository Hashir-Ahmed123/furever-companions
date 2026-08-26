import { useEffect, useState } from "react";
import { MapPin, Clock, Megaphone } from "lucide-react";

const UPDATES = [
  "New vaccination camp this weekend!",
  "Adoption drive at Riverside Park — 20 pets looking for homes.",
  "Tip: fresh water stations reduce urinary issues in cats.",
  "Free microchipping day announced for 3 October.",
  "Puppy socialisation workshop has 4 places left.",
];

export function Ticker() {
  const [now, setNow] = useState<Date | null>(null);
  const [location, setLocation] = useState("Locating you…");
  const [updateIndex, setUpdateIndex] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const clock = setInterval(() => setNow(new Date()), 1000);
    const rotate = setInterval(() => setUpdateIndex((i) => (i + 1) % UPDATES.length), 5000);
    return () => {
      clearInterval(clock);
      clearInterval(rotate);
    };
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocation("Location unavailable on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation(
          `Near ${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°`,
        ),
      () => setLocation("Location off — showing nationwide pet updates"),
      { timeout: 8000 },
    );
  }, []);

  const items = [
    { icon: MapPin, text: location },
    {
      icon: Clock,
      text: now
        ? now.toLocaleString(undefined, { dateStyle: "full", timeStyle: "medium" })
        : "Loading date & time…",
    },
    { icon: Megaphone, text: UPDATES[updateIndex] },
  ];

  const row = (key: string) => (
    <div key={key} className="flex w-1/2 shrink-0 items-center justify-around gap-10 px-6">
      {items.map(({ icon: Icon, text }, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm">
          <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-b border-border bg-plum py-2 text-plum-foreground">
      <div className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
