import RecomendationCard from "@/components/RecomendationCard";

export default function DetailedResult() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        <RecomendationCard priority="high" title="High Priority">
          <li className="text-xs font-light">Lorem ipsum dolor sit amet.</li>
        </RecomendationCard>
        <RecomendationCard priority="medium" title="Medium Priority">
          <li className="text-xs font-light">Lorem ipsum dolor sit amet.</li>
        </RecomendationCard>
        <RecomendationCard priority="low" title="Low Priority">
          <li className="text-xs font-light">Lorem ipsum dolor sit amet.</li>
        </RecomendationCard>
      </div>
      <div className="w-full">
        <RecomendationCard priority="tips" title="Industry-Specific Tips">
          <li className="text-xs font-light">Lorem ipsum dolor sit amet.</li>
        </RecomendationCard>
      </div>
    </div>
  );
}
