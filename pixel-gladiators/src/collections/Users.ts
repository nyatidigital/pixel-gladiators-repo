import { CollectionConfig, PayloadRequest } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 3600, // Token expiry time in seconds (1 hour)
    maxLoginAttempts: 5,   // Maximum number of failed login attempts before locking
    lockTime: 600000,      // Time in ms to lock the account after max attempts (10 minutes)
    
    forgotPassword: {
      // Updated function signature according to the type definition
      generateEmailHTML: async ({ req, token, user }: { req?: PayloadRequest; token?: string; user?: unknown }): Promise<string> => {
        const username = (user as any)?.username || 'User'; // Safely access username
        const url = `${req?.headers.origin}/reset-password?token=${token}`; // Construct the reset URL

        return `
          <p>Hello ${username},</p>
          <p>It seems like you forgot your password. No problem! Click the link below to reset it:</p>
          <a href="${url}">Reset your password</a>
        `;
      },
      generateEmailSubject: (user: any): string => {
        return `Password Reset Request for ${user?.username || 'User'}`;
      },
    },
  },
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'email', 'role'],
    group: 'Authentication',
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Player',
          value: 'player',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
      defaultValue: 'player',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
    },
    {
      name: 'terms',
      label: 'Accept Terms and Conditions',
      type: 'checkbox',
      required: true,
    },
  ],
  access: {
    update: ({ req: { user } }) => user && user.role === 'admin',
    delete: ({ req: { user } }) => user && user.role === 'admin',
  },
};

export default Users;
