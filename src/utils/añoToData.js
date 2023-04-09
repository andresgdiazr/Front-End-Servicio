export default function añoToData(año) {

  const map = {
    'primero':{ display:'Primer Año',value:1 },
    'segundo':{ display:'Segundo Año',value:2 },
    'tercero':{ display:'Tercer Año',value:3 },
    'cuarto':{ display:'Cuarto Año',value:4 },
    'quinto':{ display:'Quinto Año',value:5 },
  }

  return map[año ] || { display:'Primer Año',value:1 }
}