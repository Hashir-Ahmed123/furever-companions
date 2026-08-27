import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { getCurrentUser, saveUser, updateUserPet, updateUserVet, clearCurrentUser } from "./userData";

export type UserRole = "owner" | "vet" | "shelter";

export type PetProfile = {
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  vaccination: string;
};

export type VetProfile = {
  name: string;
  specialization: string;
  contact: string;
  photo: string | null;
};

type SessionValue = {
  userName: string;
  role: UserRole | null;
  pet: PetProfile | null;
  vet: VetProfile | null;
  setUser: (name: string, role: UserRole) => void;
  setPet: (pet: PetProfile) => void;
  setVet: (vet: VetProfile) => void;
  reset: () => void;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [pet, setPetState] = useState<PetProfile | null>(null);
  const [vet, setVetState] = useState<VetProfile | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.name);
      setRole(currentUser.role);
      setPetState(currentUser.pet || null);
      setVetState(currentUser.vet || null);
    }
  }, []);

  const value = useMemo<SessionValue>(
    () => ({
      userName,
      role,
      pet,
      vet,
      setUser: (name, nextRole) => {
        setUserName(name);
        setRole(nextRole);
        saveUser(name, nextRole);
      },
      setPet: (petData) => {
        setPetState(petData);
        if (userName && role) {
          updateUserPet(userName, role, petData);
        }
      },
      setVet: (vetData) => {
        setVetState(vetData);
        if (userName && role) {
          updateUserVet(userName, role, vetData);
        }
      },
      reset: () => {
        setUserName("");
        setRole(null);
        setPetState(null);
        setVetState(null);
        clearCurrentUser();
      },
    }),
    [userName, role, pet, vet],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

export const ROLE_LABEL: Record<UserRole, string> = {
  owner: "Pet Owner",
  vet: "Veterinarian",
  shelter: "Shelter Volunteer",
};

export const ROLE_HOME: Record<UserRole, string> = {
  owner: "/owner/intake",
  vet: "/vet/intake",
  shelter: "/shelter/gallery",
};
