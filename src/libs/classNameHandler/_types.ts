export type ClassDictionary = Record<string, boolean | undefined>;
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassArray = ClassValue[];
