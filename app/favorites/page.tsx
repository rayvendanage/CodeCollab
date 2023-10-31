import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteProjects from "../actions/getFavoriteProjects";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {

    const favProjects = await getFavoriteProjects();
    const currentUser = await getCurrentUser();

    if(favProjects?.length == 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite projects">
                </EmptyState>
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <FavoritesClient
                favProjects={favProjects}
                currentUser={currentUser}>

            </FavoritesClient>

        </ClientOnly>
    )
}

export default FavoritesPage;