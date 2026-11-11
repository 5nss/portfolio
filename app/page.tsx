import About from "@/components/About";
import Effects from "@/components/Effects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Repos from "@/components/Repos";
import Sidebar from "@/components/Sidebar";
import Stack from "@/components/Stack";
import { getGithubData } from "@/lib/github";
import { buildSystems } from "@/lib/systems";

// Re-generate this page at most once an hour, so GitHub changes show up on their own.
export const revalidate = 3600;

export default async function Page() {
  const gh = await getGithubData();
  const now = new Date();
  const systems = buildSystems(gh, now);

  return (
    <>
      <Effects />
      <div className="shell" id="top">
        <Sidebar gh={gh} systems={systems} now={now} />
        <main className="main">
          <About />
          <Experience />
          <Projects systems={systems} now={now}>
            <Repos gh={gh} systems={systems} now={now} />
          </Projects>
          <Stack gh={gh} />
          <Footer live={gh.live} />
        </main>
      </div>
    </>
  );
}
