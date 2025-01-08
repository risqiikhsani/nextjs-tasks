import { format, parseISO } from 'date-fns';


export const ConvertDate = (input: string | Date): string => {
  try {
    let parsedDate: Date;

    if (input instanceof Date) {
      parsedDate = input; // If input is already a Date object, use it directly
    } else {
      parsedDate = parseISO(input); // Parse ISO string
    }

    return format(parsedDate, 'MMMM do, yyyy');
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid Date';
  }
};
