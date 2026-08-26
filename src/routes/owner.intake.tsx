import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/furever/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/owner/intake")({
  head: () => ({
    meta: [
      { title: "Add Your Pet — FurEver Care" },
      { name: "description", content: "Create a pet profile with species, breed, age and vaccination status." },
      { property: "og:title", content: "Add Your Pet — FurEver Care" },
      { property: "og:description", content: "Start your pet's care profile in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OwnerIntake,
});

const SPECIES = ["Dog", "Cat", "Rabbit", "Bird", "Other"];
const GENDERS = ["Male", "Female"];
const VACC = ["Fully vaccinated", "Partially vaccinated", "Not vaccinated"];

function OwnerIntake() {
  const navigate = useNavigate();
  const { setPet } = useSession();
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    vaccination: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    Object.entries(form).forEach(([k, v]) => {
      if (!v.trim()) next[k] = "Required";
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    setPet(form);
    toast.success(`${form.name}'s profile is ready!`);
    navigate({ to: "/owner/dashboard" });
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Pet Owner"
        title="Tell us about your pet"
        subtitle="We'll use this to build a care dashboard with feeding, grooming, health and training guidance."
      />
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <form
          onSubmit={submit}
          className="grid gap-5 rounded-4xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:p-8"
        >
          <Field label="Pet name" error={errors["name"]}>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Biscuit" className="h-11 rounded-xl" />
          </Field>
          <Field label="Species" error={errors["species"]}>
            <Picker value={form.species} onChange={(v) => set("species", v)} options={SPECIES} placeholder="Choose species" />
          </Field>
          <Field label="Breed" error={errors["breed"]}>
            <Input value={form.breed} onChange={(e) => set("breed", e.target.value)} placeholder="Labrador Mix" className="h-11 rounded-xl" />
          </Field>
          <Field label="Age" error={errors["age"]}>
            <Input value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="2 years" className="h-11 rounded-xl" />
          </Field>
          <Field label="Gender" error={errors["gender"]}>
            <Picker value={form.gender} onChange={(v) => set("gender", v)} options={GENDERS} placeholder="Choose gender" />
          </Field>
          <Field label="Vaccination status" error={errors["vaccination"]}>
            <Picker value={form.vaccination} onChange={(v) => set("vaccination", v)} options={VACC} placeholder="Choose status" />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
              Create pet dashboard
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
    </div>
  );
}

function Picker({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11 w-full rounded-xl">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
