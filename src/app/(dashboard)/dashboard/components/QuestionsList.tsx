import { questionsList } from "../constants";
import { TableCard } from "./TableCard";
import type { TStatsResponse } from "../type";

function QuestionsList({ data }: { data: TStatsResponse }) {
  return (
    <div className="grid gap-7 grid-cols-1 md:grid-cols-2">
      {questionsList.map(({ title, keyName, Icon }, idx) => (
        <TableCard
          key={idx}
          title={title}
          icon={Icon}
          link="/training"
          isLoading={false}
        >
          <div className="border-gray-200 border rounded-md flex flex-col overflow-hidden min-h-0 flex-1">
            <div className="px-6 py-3 border-b shrink-0">
              <span className="momants-semibold-small-darkgray">{title}</span>
            </div>

            <div className="overflow-y-auto flex-1 min-h-0">
              {data[keyName].map((question, i) => (
                <div key={i} className="px-6 py-4 border-b last:border-b-0">
                  <p className="momants-light-small-darkgray whitespace-nowrap overflow-hidden text-ellipsis">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TableCard>
      ))}
    </div>
  );
}

export default QuestionsList;
