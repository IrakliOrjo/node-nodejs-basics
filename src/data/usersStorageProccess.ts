export type DatabaseUser = {
  userId?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export let users: DatabaseUser[] = [];
