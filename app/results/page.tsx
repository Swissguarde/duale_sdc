import { useRouter } from "next/router";
import Results from "../components/results";

const ResultsPage = () => {
  const router = useRouter();
  const {
    results,
    equations,
    boundaryCondition,
    finalMoments,
    reactions,
    criticalPoints,
  } = router.query;

  return (
    <div className="container mx-auto px-4 py-8">
      <Results
        equations={JSON.parse(equations as string)}
        boundaryCondition={JSON.parse(boundaryCondition as string)}
        finalMoments={JSON.parse(finalMoments as string)}
        reactions={JSON.parse(reactions as string)}
        criticalPoints={JSON.parse(criticalPoints as string)}
        results={JSON.parse(results as string)}
      />
    </div>
  );
};

export default ResultsPage;
