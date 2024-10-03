export function getInitials(fullName: string): string {
  const names = fullName.trim().split(" ");

  const firstInitial = names[0][0].toUpperCase();

  const lastInitial = names[names.length - 1][0].toUpperCase();

  return firstInitial + lastInitial;
}
