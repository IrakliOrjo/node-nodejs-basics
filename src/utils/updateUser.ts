

export function updateUser(user, updatedUser) {
    
    user.username = updatedUser.username
    user.age = parseInt(updatedUser.age)
    user.hobbies = updatedUser.hobbies
    return user
} 