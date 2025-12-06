import OverviewCard from "@/components/OverviewCard";
import {
  FcAnswers,
  FcBriefcase,
  FcBusinessContact,
  FcCollect,
  FcDocument,
  FcGraduationCap,
  FcOrganization,
  FcSearch,
} from "react-icons/fc";

export default function Overview() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      <OverviewCard title="Education" score={80}>
        <FcGraduationCap />
      </OverviewCard>
      <OverviewCard title="Formatting" score={70}>
        <FcDocument />
      </OverviewCard>
      <OverviewCard title="Contact Information" score={50}>
        <FcBusinessContact />
      </OverviewCard>
      <OverviewCard title="Skill Section" score={45}>
        <FcCollect />
      </OverviewCard>
      <OverviewCard title="Work Experience" score={30}>
        <FcOrganization />
      </OverviewCard>
      <OverviewCard title="ATS Compatibility" score={75}>
        <FcAnswers />
      </OverviewCard>
      <OverviewCard title="Keywords" score={50}>
        <FcSearch />
      </OverviewCard>
      <OverviewCard title="Professional Summary" score={35}>
        <FcBriefcase />
      </OverviewCard>
    </div>
  );
}
