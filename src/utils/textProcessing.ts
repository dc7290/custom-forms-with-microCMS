export const newLine = (text: string) => text.replace(/\n/g, '<br />')
export const singleLine = (text: string) => text.replace(/\n/g, '')

export const createAnchor = (text: string) =>
  text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
