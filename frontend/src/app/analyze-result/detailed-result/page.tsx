import DetailResult from "@/components/DetailResult";

export default function DetailedResult() {
  return (
    <div className="w-full flex flex-col gap-3">
      <DetailResult
        title="Education"
        score={80}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
      <DetailResult
        title="Formatting"
        score={75}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
      <DetailResult
        title="Skill Section"
        score={70}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
      <DetailResult
        title="Work Experience"
        score={60}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
      <DetailResult
        title="ATS Compatibility"
        score={50}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
      <DetailResult
        title="Keywords"
        score={40}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
      <DetailResult
        title="Professional Summary"
        score={30}
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      >
        <li className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </DetailResult>
    </div>
  );
}
