export const sanitizeInput = (input: string): string => {
    if (!input) return '';
    return input
        // Remove HTML tags
        .replace(/<[^>]*>?/gm, '')
        // Remove javascript: and data: URLs
        .replace(/(javascript:|data:)(.*?)/gi, '')
        // Prevent basic script injection patterns
        .replace(/on\w+\s*=/gi, '')
        .replace(/document\./gi, '');
};
