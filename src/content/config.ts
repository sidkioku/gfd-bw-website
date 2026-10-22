import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional().default(''),
    address: z.string().optional(),
    format: z.enum(['praesenz', 'online', 'hybrid']).default('praesenz'),
    zoomUrl: z.string().optional(),
    zoomMeetingId: z.string().optional(),
    zoomPasscode: z.string().optional(),
    registrationUrl: z.string().optional(),
    description: z.string().optional().default(''),
    categories: z.array(z.string()).default([]),
    past: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    description: z.string().optional().default(''),
    image: z.string().optional(),
  }),
});

export const collections = { events, posts };
