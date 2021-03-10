export type Section = {
  title?: string,
  subtitle?: string,
  image?: {
    src: string,
    alt?: string,
    width?: number
  }
  paragraphs?: string[],
  aditionalClass? : {
    section?: string,
    paragraphs? : string
  }
};