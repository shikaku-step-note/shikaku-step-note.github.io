import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { qualifications } from './data/qualifications';
import { glob } from 'astro/loaders';
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z
    .object({
      stableId: z.string().regex(/^[a-z0-9-]+$/),
      qualification: z.string(),
      title: z.string(),
      description: z.string(),
      order: z.number().int().positive(),
      minutes: z.number().positive(),
      sample: z.boolean().default(true),
      updated: z.string(),
      keywords: z.array(z.string()),
      question: z.string(),
      options: z.array(z.string()).min(2),
      answer: z.number().int().nonnegative(),
      explanation: z.string(),
    })
    .refine((d) => d.answer < d.options.length, {
      message: 'answer must refer to an option',
      path: ['answer'],
    })
    .refine((d) => qualifications.some((q) => q.id === d.qualification), {
      message: 'Unknown qualification',
      path: ['qualification'],
    }),
});
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});
export const collections = { lessons, pages };
