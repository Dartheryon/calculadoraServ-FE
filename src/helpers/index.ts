export const formatDate = (mydate: Date | string) => {
  const NewDate = new Date(mydate);
  const formatOptions: Intl.DateTimeFormatOptions = {
    // year: 'numeric',
    // month: 'long',
    // day: '2-digit',
    timeZone: 'Europe/London',
    dateStyle: 'full',
  };

  return NewDate.toLocaleDateString('es-ES', formatOptions);
};

export const formatCash = (ammount: number) => {
  return ammount.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  });
};
