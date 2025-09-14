// cards.js
export default [
  {
    city: 'Ancona',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Infiltrati',
    eventDesc: 'Scarta 2 Mercanti, conquista subito una città neutrale limitrofa a 1 città da te controllata.',
    image: 'ancona.png',
  },
  {
    city: 'Asti',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Imboscata',
    eventDesc: 'Sposta unità presenti su 1 Conflitto ad un altro ignorando la restrizione del tipo e aggiungendone 1 dalla riserva.',
    image: 'asti.png',
  },
  {
    city: 'Bergamo',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 2,
    recruitmentControlled: 3,
    event: 'Perdono',
    eventDesc: 'Scarta 1 unità avversaria su 1 Conflitto e guadagnane 1 dello stesso tipo.',
    image: 'bergamo.png',
  },
  {
    city: 'Bologna',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 2,
    recruitmentControlled: 3,
    event: 'Ritirata Strategica',
    eventDesc: 'Guadagna 5 unità a tua scelta, perdi il controllo di 1 città a tua scelta (diventa neutrale).',
    image: 'bologna.png',
  },
  {
    city: 'Ferrara',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Rete Commerciale',
    eventDesc: 'Scarta X Mercanti per guadagnare X unità di altro tipo.',
    image: 'ferrara.png',
  },
  {
    city: 'Firenze',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Colpo di Mano',
    eventDesc: 'Chiudi immediatamente 1 Conflitto in atto.',
    image: 'firenze.png',
  },
  {
    city: 'Lodi',
    recruitmentOptions: ['Cavalleria'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Spie Efficienti',
    eventDesc: 'Cambia fino a 2 pedine sotto il tuo controllo sulla mappa con Mercanti (dalla riserva).',
    image: 'lodi.png',
  },
  {
    city: 'Milano',
    recruitmentOptions: ['Cavalleria'],
    recruitmentFree: 3,
    recruitmentControlled: 3,
    event: 'Rinforzi',
    eventDesc: 'Utilizza questa carta come un Conflitto a tua scelta senza pagare costi aggiuntivi.',
    image: 'milano.png',
  },
  {
    city: 'Modena',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 3,
    recruitmentControlled: 3,
    event: 'Pace di Dio',
    eventDesc: 'Congela un Conflitto fino al prossimo round. (Le unità congelate non possono essere rimosse o spostate.)',
    image: 'modena.png',
  },
  {
    city: 'Padova',
    recruitmentOptions: ['Cavalleria'],
    recruitmentFree: 3,
    recruitmentControlled: 3,
    event: 'Attacco alle Retrovie',
    eventDesc: 'Elimina la metà (per difetto) della cavalleria nemica su un Conflitto in atto.',
    image: 'padova.png',
  },
  {
    city: 'Pisa',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Connessioni Mercantili',
    eventDesc: 'Piazza unità disponibili su 2 Conflitti in atto.',
    image: 'pisa.png',
  },
  {
    city: 'Ravenna',
    recruitmentOptions: ['Cavalleria'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Intercessione Papale',
    eventDesc: 'Tutti i supporti Vescovili sono a tuo vantaggio per il round, inoltre risolvi tutti i pareggi a tuo favore.',
    image: 'ravenna.png',
  },
  {
    city: 'Trento',
    recruitmentOptions: ['Cavalleria'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Supporto Locale',
    eventDesc: 'Se controlli meno città del tuo avversario ottieni 1 unità per tipo.',
    image: 'trento.png',
  },
  {
    city: 'Venezia',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Guerra Commerciale',
    eventDesc: 'Elimina 1 unità avversaria da ogni Conflitto attivo.',
    image: 'venezia.png',
  },
  {
    city: 'Verona',
    recruitmentOptions: ['Mercanti'],
    recruitmentFree: 1,
    recruitmentControlled: 2,
    event: 'Scambio di Prigionieri',
    eventDesc: 'Guarda la mano avversaria e scegli una carta da scambiare con una tua.',
    image: 'verona.png',
  },
];

// Utility minima per controllo (incollala nel tuo progetto o usa per debug)
export function validateCards(cards) {
  const errors = [];
  cards.forEach((c, idx) => {
    const prefix = `Card #${idx + 1} (${c.city || 'senza nome'}):`;
    if (!c.city) errors.push(`${prefix} manca 'city'`);
    if (!Array.isArray(c.recruitmentOptions)) errors.push(`${prefix} 'recruitmentOptions' deve essere un array`);
    if (typeof c.recruitmentFree !== 'number') errors.push(`${prefix} 'recruitmentFree' deve essere number`);
    if (typeof c.recruitmentControlled !== 'number') errors.push(`${prefix} 'recruitmentControlled' deve essere number`);
    if (!c.event) errors.push(`${prefix} manca 'event'`);
    if (!c.eventDesc) errors.push(`${prefix} manca 'eventDesc'`);
    if (!c.image) errors.push(`${prefix} manca 'image'`);
  });
  return errors;
}
