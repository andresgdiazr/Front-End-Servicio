export default function añoToData(año) {

  const map = {
    'primero':{ display:'primer año',value:1 },
    'segundo':{ display:'segundo año',value:2 },
    'tercero':{ display:'tercer año',value:3 },
    'cuarto':{ display:'cuarto año',value:4 },
    'quinto':{ display:'quinto año',value:5 },
  }

  return map[año ] || { display:'Primer Año',value:1 }
}