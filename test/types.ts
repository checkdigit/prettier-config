// Generics, unions, intersections, mapped types, tuples, and type assertions.
export interface Job {
  readonly id: string;
  name: string;
  status: 'pending' | 'running' | 'complete';
  metadata?: { owner: string; tags: readonly string[] };
}

export type Result<Value, Failure = Error> =
  { success: true; value: Value } | { success: false; error: Failure };

export type JobWithHistory = Job & {
  history: readonly { status: Job['status']; timestamp: number }[];
};

export type Handlers<Value> = {
  [Key in keyof Value as `on${Capitalize<string & Key>}Changed`]?: (
    current: Value[Key],
    previous: Value[Key],
  ) => void;
};

export type Unwrap<Value> =
  Value extends Promise<infer Resolved>
    ? Unwrap<Resolved>
    : Value extends readonly (infer Item)[]
      ? Item
      : Value;

export type JobEntry = readonly [
  id: Job['id'],
  job: Job,
  ...history: Job['status'][],
];

export type JobEvent = `${Job['status']}:${string}`;

export const statuses = ['pending', 'running', 'complete'] as const;

export const labels = {
  pending: 'Waiting to start',
  running: 'Currently processing',
  complete: 'Ready to review',
} satisfies Record<Job['status'], string>;

export const initialJob = {
  id: 'job-001',
  name: 'Review formatting changes after updating dependencies',
  status: 'pending',
  metadata: { owner: 'platform', tags: ['formatting', 'regression'] },
} satisfies Job;
