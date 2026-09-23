import { initialJob, labels, type Job } from './types.js';

// Quotes, escaped strings, template literals, and computed property names.
export const messages = {
  ready: 'Ready to review',
  possessive: "The job's owner requested a review",
  quoted: 'Choose "complete" when finished',
  path: 'fixtures\\typescript',
  ['job:' + initialJob.id]: `${initialJob.name}: ${labels[initialJob.status]}`,
};

export const jobs: Job[] = [
  initialJob,
  { id: 'job-002', name: 'Check plugin integration', status: 'complete' },
];

// Destructuring, spread, optional chaining, nullish coalescing, and long chains.
const [firstJob = initialJob, ...remainingJobs] = jobs;
const { metadata: { owner = 'unassigned', tags = [] } = {}, ...details } =
  firstJob;

export const summary = {
  ...details,
  owner,
  tags: [...tags, 'reviewed'],
  nextOwner: remainingJobs[0]?.metadata?.owner ?? 'unassigned',
};

export const descriptions = jobs
  .filter(
    (job) => job.status !== 'complete' && job.metadata?.owner !== undefined,
  )
  .map(({ id, name, status }) => ({
    id,
    description: `${name} (${labels[status]})`,
  }))
  .sort((left, right) => left.description.localeCompare(right.description));

export function describe(job: Job, includeOwner: boolean): string {
  const state =
    job.status === 'complete'
      ? 'Finished successfully'
      : job.status === 'running'
        ? 'Work is in progress'
        : 'Waiting for an available worker';

  const shouldIncludeOwner =
    includeOwner &&
    job.metadata !== undefined &&
    (job.metadata.owner.length > 0 || job.metadata.tags.includes('shared'));

  return `${job.name}: ${state}${shouldIncludeOwner ? ` (${job.metadata?.owner})` : ''}`;
}

// Comments and grouping must survive formatting.
export const retryDelay =
  (2 ** 3 + 1) *
  // Convert seconds to milliseconds.
  1_000;

export const jobIdPattern = /^job-(?<sequence>\d{3,})$/u;
