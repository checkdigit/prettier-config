import { initialJob, type Job, type Result } from './types.js';

// Overloads and generic functions with multiline parameters and return types.
export function findJob(jobs: readonly Job[], id: string): Job | undefined;
export function findJob(jobs: readonly Job[], ids: readonly string[]): Job[];
export function findJob(
  jobs: readonly Job[],
  selection: string | readonly string[],
): Job | Job[] | undefined {
  return typeof selection === 'string'
    ? jobs.find(({ id }) => id === selection)
    : jobs.filter(({ id }) => selection.includes(id));
}

export function groupBy<Value, Key extends PropertyKey>(
  values: readonly Value[],
  getKey: (value: Value, index: number) => Key,
): Map<Key, Value[]> {
  return values.reduce((groups, value, index) => {
    const key = getKey(value, index);
    groups.set(key, [...(groups.get(key) ?? []), value]);
    return groups;
  }, new Map<Key, Value[]>());
}

export async function processJobs(
  jobs: readonly Job[],
  process: (job: Job) => Promise<Job>,
  { stopOnError = false }: { stopOnError?: boolean } = {},
): Promise<Result<Job>[]> {
  const results: Result<Job>[] = [];

  for (const job of jobs) {
    try {
      results.push({ success: true, value: await process(job) });
    } catch (error: unknown) {
      results.push({
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
      if (stopOnError) {
        break;
      }
    }
  }

  return results;
}

export const renameJob = (
  { name, ...job }: Job = initialJob,
  prefix = 'Reviewed',
): Job => ({ ...job, name: `${prefix}: ${name}` });
