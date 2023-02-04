// This function takes a list of strings and returns a string of the first character of each string in the list.

export const createInitials = (strings: string[]) => {
  return strings.map((string) => string && string.charAt(0)).join("");
};
