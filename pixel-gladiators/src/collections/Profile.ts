// src/collections/Profile.ts

import { CollectionConfig } from 'payload/types';

// Profile collection - handles user profile fields
const Profile: CollectionConfig = {
  slug: 'profiles', // Unique identifier for the profile collection
  admin: {
    useAsTitle: 'displayName', // Display name in admin panel
    group: 'User Management', // Admin grouping for this collection
  },
  fields: [
    // Relationship to the User collection (one-to-one link)
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users', // Links each profile to a specific user
      required: true,
    },
    // Profile picture upload field (relation to a media collection)
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media', // Assuming you have a media collection for uploads
      required: false,
    },
    // Display name for user profiles
    {
      name: 'displayName',
      type: 'text',
      required: false,
    },
    // Bio field for users to describe themselves
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
    // Array field to allow users to add favorite games
    {
      name: 'favoriteGames',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'game',
          type: 'text',
          required: true,
        },
      ],
    },
    // Country field for the user profile
    {
      name: 'country',
      type: 'text',
      required: false,
    },
    // Preferred language select field
    {
      name: 'preferredLanguage',
      type: 'select',
      required: false,
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Spanish',
          value: 'es',
        },
        // Add more languages as needed
      ],
    },
  ],
  // Access control: Only the owner or admin can update/delete a profile
  access: {
    update: ({ req: { user }, data }) => {
      return user && (user.id === data.user || user.role === 'admin');
    },
    delete: ({ req: { user }, data }) => {
      return user && (user.id === data.user || user.role === 'admin');
    },
  },
};

export default Profile;
