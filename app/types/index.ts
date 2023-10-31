import { Project, User } from "@prisma/client";

export type SafeProject = Omit<
    Project,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit<
    User, 
    "createdAt" | "updatedAt" | "emailVerified"
    > & {
        createdAt: string;
        updatedAt: string;
        emailVerified: string | null; 
    }