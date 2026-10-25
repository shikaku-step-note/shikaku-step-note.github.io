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
      archived: z.boolean().default(false),
      unit: z.number().int().positive().optional(),
      syllabus: z.array(z.number().int().positive()).default([]),
      scopeLabel: z.string().optional(),
      subject: z.string().optional(),
      objectives: z.array(z.string()).default([]),
      prerequisite: z.string().optional(),
      glossary: z.array(z.object({ term: z.string(), definition: z.string() })).default([]),
      updated: z.string(),
      keywords: z.array(z.string()),
      question: z.string().optional(),
      options: z.array(z.string()).min(2).optional(),
      answer: z.number().int().nonnegative().optional(),
      explanation: z.string().optional(),
    })
    .refine((d) => d.answer === undefined || (!!d.options && d.answer < d.options.length), {
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
