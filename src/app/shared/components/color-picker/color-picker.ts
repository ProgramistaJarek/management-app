export const colors: string[] = [
  'red-400',
  'green-400',
  'blue-400',
  'yellow-400',
  'purple-400',
  'red-500',
  'green-500',
  'blue-500',
  'yellow-500',
  'purple-500',
  'red-600',
  'green-600',
  'blue-600',
  'yellow-600',
  'purple-600',
];

export const colorsText: string[] = [
  '!text-red-400',
  '!text-green-400',
  '!text-blue-400',
  '!text-yellow-400',
  '!text-purple-400',
  '!text-red-500',
  '!text-green-500',
  '!text-blue-500',
  '!text-yellow-500',
  '!text-purple-500',
  '!text-red-600',
  '!text-green-600',
  '!text-blue-600',
  '!text-yellow-600',
  '!text-purple-600',
];

export const colorsBackground: string[] = [
  '!bg-red-400',
  '!bg-green-400',
  '!bg-blue-400',
  '!bg-yellow-400',
  '!bg-purple-400',
  '!bg-red-500',
  '!bg-green-500',
  '!bg-blue-500',
  '!bg-yellow-500',
  '!bg-purple-500',
  '!bg-red-600',
  '!bg-green-600',
  '!bg-blue-600',
  '!bg-yellow-600',
  '!bg-purple-600',
];

export function returnBackground(color: string) {
  return color ? colorsBackground.find((c) => c.includes(color)) : '';
}

export function returnTextColor(color: string) {
  return color ? colorsText.find((c) => c.includes(color)) : '';
}
