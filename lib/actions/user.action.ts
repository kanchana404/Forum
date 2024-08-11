// user.actions.ts

'use server';

import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import { CreateUserParams, UpdateUserParams } from '@/types';

// Create a new user
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed');
  }
}

// Update an existing user by Clerk ID
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });
    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('User update failed');
  }
}

// Delete a user by Clerk ID
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ clerkId });
    if (!deletedUser) {
      throw new Error('User not found or deletion failed');
    }
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('User deletion failed');
  }
}


export async function getUser(clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error('User not found');
    }
    return user.toObject();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}