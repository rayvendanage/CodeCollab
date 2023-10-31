import Container from "../components/Container";
import Heading from "../components/Heading";
import ProjectCard from "../components/projects/ProjectCard";
import { SafeProject, SafeUser } from "../types";

type FavoritesClientProps = {
    children: React.ReactNode;
    currentUser: SafeUser | null;
    favProjects: SafeProject[] ;
}

const FavoritesClient = ({ children, currentUser, favProjects} : FavoritesClientProps) => {

    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of projects you have favorited!">
            </Heading>
            <div className="mt-10 grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favProjects.map((project) => (
                    <ProjectCard
                        currentUser={currentUser}
                        key={project.id}
                        data={project}>

                    </ProjectCard>
                ))}

            </div>
        </Container>
    )

}
export default FavoritesClient;