export const parseDate = (() => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (date: Date) =>
    formatter
      .formatToParts(date)
      .filter(part => ['day', 'month', 'year'].includes(part.type))
      .sort((a, b) => {
        if (a.type === 'day') return -1;
        if (b.type === 'day') return 1;
        if (a.type === 'month') return -1;
        if (b.type === 'month') return 1;
        if (a.type === 'year') return -1;
        if (b.type === 'year') return 1;
        return 0;
      })
      .map(part => part.value)
      .join(' ');
})();
