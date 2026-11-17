import type { Job } from './types.js';

// Class fields, parameter properties, accessors, and method signatures.
export class JobQueue implements Iterable<Job> {
  static readonly defaultCapacity = 100;
  readonly #jobs = new Map<string, Job>();

  constructor(
    public readonly name: string,
    private readonly capacity = JobQueue.defaultCapacity,
  ) {}

  get size(): number {
    return this.#jobs.size;
  }

  add(job: Job): this {
    if (this.size >= this.capacity && !this.#jobs.has(job.id)) {
      throw new Error(`Queue "${this.name}" has reached its capacity`);
    }

    this.#jobs.set(job.id, job);
    return this;
  }

  *[Symbol.iterator](): IterableIterator<Job> {
    yield* this.#jobs.values();
  }

  async run(process: (job: Job) => Promise<Job>): Promise<readonly Job[]> {
    return Promise.all(
      [...this].map(async (job) => {
        const completed = await process(job);
        this.#jobs.set(completed.id, completed);
        return completed;
      }),
    );
  }
}
