// @ts-nocheck
import { labels, type Job } from './types.js';

type Props = {
  jobs: readonly Job[];
  selectedId?: string;
  onSelect: (job: Job) => void;
};

// TSX generics and JSX with static and conditional Tailwind class lists.
export const first = <Value,>(values: readonly Value[]): Value | undefined =>
  values[0];

export function JobList({ jobs, selectedId, onSelect }: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-semibold text-slate-900">Formatting jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-sm text-slate-500">No jobs to review.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <button
                type="button"
                aria-pressed={job.id === selectedId}
                className={
                  job.id === selectedId
                    ? 'w-full rounded bg-blue-600 p-4 text-white hover:bg-blue-700 focus:ring-2'
                    : 'w-full rounded bg-slate-100 p-4 text-slate-900 hover:bg-slate-200 focus:ring-2'
                }
                onClick={() => onSelect(job)}
              >
                <span className="block font-medium">{job.name}</span>
                <span className="block text-sm">{labels[job.status]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
