export type Lang = 'en' | 'el';

export const t = {
  en: {
    details: {
      heading: 'Event Details',
      transport: 'Transportation by boat will be provided from Dapia to Zogeria Beach.',
      arriveEarly: 'Please arrive 20–30 minutes early to ensure smooth boarding.',
      dress: 'Dress code: Summer chic',
    },
    dateLocationTime: {
      timeLabel: 'Time:',
      locationLabel: 'Location:',
    },
  },
  el: {
    details: {
      heading: 'Λεπτομέρειες Εκδήλωσης',
      transport: 'Θα παρέχεται μεταφορά με βάρκες από τη Ντάπια προς τη Ζωγεριά.',
      arriveEarly: 'Παρακαλούμε φτάστε 20–30 λεπτά νωρίτερα για άνετη επιβίβαση.',
      dress: 'Ενδυματολογικός κώδικας: Καλοκαιρινό κομψό',
    },
    dateLocationTime: {
      timeLabel: 'Ώρα:',
      locationLabel: 'Τοποθεσία:',
    },
  },
}

export function getLang(input?: string): Lang {
  const v = (input ?? '').toLowerCase();
  return v === 'el' ? 'el' : 'en';
}