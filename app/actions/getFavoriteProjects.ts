import { Prisma } from "@prisma/client";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteProjects() {
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return [];
        }

        const favorites = await prisma?.project.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavorites = favorites?.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites || [];

    } catch(error:any){
        throw new Error(error)
    }
}