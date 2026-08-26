import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — FurEver Care" },
      { name: "description", content: "Share your thoughts about FurEver Care. We'd love to hear from you." },
      { property: "og:title", content: "Feedback — FurEver Care" },
      { property: "og:description", content: "Help us improve your pet care experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Feedback,
});

function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email";
    if (!form.message.trim()) next.message = "Please enter your feedback";
    
    setErrors(next);
    if (Object.keys(next).length) return;
    
    toast.success("Thank you for your feedback!", {
      description: "This is a demo — no data was actually sent.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Your voice matters"
        title="Share your feedback"
        subtitle="Tell us what you love about FurEver Care and what we can improve."
      />
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <form onSubmit={submit} className="grid gap-5 rounded-4xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Sarah Ahmed"
              className="h-11 rounded-xl"
            />
            {errors.name && <p className="text-xs font-semibold text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="sarah@example.com"
              className="h-11 rounded-xl"
            />
            {errors.email && <p className="text-xs font-semibold text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Your feedback</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Share your thoughts, suggestions, or report an issue..."
              rows={6}
              className="rounded-xl resize-none"
            />
            {errors.message && <p className="text-xs font-semibold text-destructive">{errors.message}</p>}
          </div>

          <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
            Submit feedback
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            This is a demo form — no data is actually stored or sent.
          </p>
        </form>
      </div>
    </AppShell>
  );
}
