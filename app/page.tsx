import getCurrentUser from "./actions/getCurrentUser";
import getProjects from "./actions/getProjects";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/projects/ProjectCard";
import { SafeProject } from "./types";
import { IProjectsParams } from "./actions/getProjects";

type HomeProps = {
  searchParams: IProjectsParams;
}

export default async function Home({searchParams} : HomeProps) {

  const projects = await getProjects(searchParams);
  const currentUser = await getCurrentUser();

  if (projects.length == 0){
    return(
      <ClientOnly>
        <EmptyState showReset>

        </EmptyState>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className= "pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {projects.map((project: SafeProject) => {
            return(
            <ListingCard
              currentUser={currentUser}
              key={project.id}
              data={project}
              >

            </ListingCard>
  
          )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}
