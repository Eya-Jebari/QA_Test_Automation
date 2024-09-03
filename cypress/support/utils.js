// Function to generate a unique email address 
export function generateUniqueEmail(domain) {
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
    return `${randomString}test@${domain}`; // Concatenate the random string with the domain
  };

