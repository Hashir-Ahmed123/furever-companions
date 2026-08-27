import { type UserRole, type PetProfile, type VetProfile } from "./session";

export type UserProfile = {
  id: string;
  name: string;
  role: UserRole;
  createdAt: string;
  pet: PetProfile | null;
  vet: VetProfile | null;
};

const STORAGE_KEY = "furever_users";
const CURRENT_USER_KEY = "furever_current_user";

// Get all users from localStorage
export function getAllUsers(): UserProfile[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return [];
  }
}

// Save all users to localStorage
export function saveAllUsers(users: UserProfile[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
}

// Get current user from localStorage
export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading current user from localStorage:", error);
    return null;
  }
}

// Save current user to localStorage
export function saveCurrentUser(user: UserProfile | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user !== null) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error("Error saving current user to localStorage:", error);
  }
}

// Find user by name and role
export function findUser(name: string, role: UserRole): UserProfile | null {
  const users = getAllUsers();
  return users.find((u) => u.name.toLowerCase() === name.toLowerCase() && u.role === role) || null;
}

// Create or update user
export function saveUser(name: string, role: UserRole, pet: PetProfile | null = null, vet: VetProfile | null = null): UserProfile {
  const users = getAllUsers();
  let user = findUser(name, role);
  
  if (user) {
    // Update existing user
    if (pet !== null) user.pet = pet;
    if (vet !== null) user.vet = vet;
  } else {
    // Create new user
    user = {
      id: `${role}-${Date.now()}`,
      name,
      role,
      createdAt: new Date().toISOString(),
      pet: pet || null,
      vet: vet || null,
    };
    users.push(user);
  }
  
  saveAllUsers(users);
  saveCurrentUser(user);
  return user;
}

// Update user's pet data
export function updateUserPet(name: string, role: UserRole, pet: PetProfile): UserProfile {
  return saveUser(name, role, pet);
}

// Update user's vet data
export function updateUserVet(name: string, role: UserRole, vet: VetProfile): UserProfile {
  return saveUser(name, role, undefined, vet);
}

// Clear current user session
export function clearCurrentUser(): void {
  saveCurrentUser(null);
}

// Export all users as JSON file
export function exportUsersAsJson(): void {
  if (typeof window === "undefined") return;
  try {
    const users = getAllUsers();
    const dataStr = JSON.stringify(users, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `furever-users-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting users:", error);
  }
}

// Import users from JSON file
export function importUsersFromJson(file: File): Promise<UserProfile[]> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window not available"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const users = JSON.parse(content) as UserProfile[];
        saveAllUsers(users);
        resolve(users);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

// Export current user as JSON file
export function exportCurrentUserAsJson(): void {
  if (typeof window === "undefined") return;
  try {
    const user = getCurrentUser();
    if (!user) {
      console.error("No current user to export");
      return;
    }
    const dataStr = JSON.stringify(user, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `furever-user-${user.name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting current user:", error);
  }
}
