// src/collections/Media.ts

import { CollectionConfig } from 'payload/types';

// Media collection - stores images and files for user profiles
const Media: CollectionConfig = {
  slug: 'media', // Unique identifier for the media collection
  upload: {
    staticDir: 'media', // Where files will be stored
    mimeTypes: ['image/*'], // Restrict uploads to images
  },
  admin: {
    group: 'Media',
  },
  fields: [
    // Optional title for uploaded media
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    // Alternative text for accessibility
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
};

export default Media;
