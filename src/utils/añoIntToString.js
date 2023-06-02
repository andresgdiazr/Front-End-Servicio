export default function añoIntToString(añoInt) {
  switch (añoInt) {
    case 1:
      return 'Primer año';
      break;
    case 2:
      return 'Segundo año';
      break;
    case 3:
      return 'Tercer año';
      break;
    case 4:
      return 'Cuarto año';
      break;
    case 5:
      return 'Quinto año';
      break;
    default:
      return 'Año No Existente';
      break;
  }
}