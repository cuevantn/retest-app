import { getXataClient } from "@/lib/xata";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExperimentCard } from "./experiment-card";

let xata = getXataClient();

export const PastExperiments = async () => {
  let experiments = await xata.db.experiments
    .filter({
      endedAt: {
        $lt: new Date(),
      },
    })
    .sort("endedAt", "desc")
    .getAll();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Past experiments</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-3 gap-4">
            {experiments.map((experiment) => (
              <ExperimentCard
                variant="past"
                key={experiment.id}
                {...experiment}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
