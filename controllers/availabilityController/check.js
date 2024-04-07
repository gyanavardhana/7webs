const date = new Date('2024-04-6');
const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week (e.g., "Monday")

// Now you can query availability based on the day of the week

console.log(dayOfWeek)