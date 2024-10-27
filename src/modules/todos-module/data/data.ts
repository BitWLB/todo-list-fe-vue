import type { TodosPriority } from '@/modules/todos-module/interfaces/todosPriority'

export const todosPrioritiesData: TodosPriority[] = [
  {
    id: 1,
    description: 'Top Priority – Must Do Now (Critical)',
  },
  {
    id: 2,
    description: 'High Priority – Important but Not Urgent',
  },
  {
    id: 3,
    description: 'Medium Priority – Urgent but Less Important',
  },
  {
    id: 4,
    description: 'Low Priority – Can Be Done Later (Optional)',
  },
  {
    id: 5,
    description: 'Backlog – Someday / Maybe',
  },
]
