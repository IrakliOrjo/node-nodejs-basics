export function updateUser(
  user: Record<string, any>,
  updatedUser: Record<string, any>
) {
  user.username = updatedUser.username;
  user.age = parseInt(updatedUser.age);
  user.hobbies = updatedUser.hobbies;
  return user;
}
