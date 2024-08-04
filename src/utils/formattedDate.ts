// utils.js
import { format, parseISO } from 'date-fns';

export function formatDateString(dateString: string) {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd HH:mm");
}
