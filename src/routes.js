
import { 
  Inicio,
  Medicamentos,
  Emergencia, 
  Usuario,
  Salud,
  Asistente,
  Recordatorio,
  InformacionMedicamentos} from "./wiews";



const routes = [


  //menu
  {
    path: "/vitalsave",
    name: "Inicio",
    icon: "nc-icon nc-shop",
    component: Inicio,
    layout: "/inicio",
  },
  {
    path: "/medicamentos",
    name: "Medicamentos",
    icon: "nc-icon nc-bank",
    component: Medicamentos,
    layout: "/inicio",
  },
  {
    path: "/salud",
    name: "Salud",
    icon: "nc-icon nc-sound-wave",
    component: Salud,
    layout: "/inicio",
  },
  {
    path: "/asistente",
    name: "Asistente",
    icon: "nc-icon nc-circle-10",
    component: Asistente,
    layout: "/inicio",
  },
  {
    path: "/recordatorio",
    name: "Recordatorio",
    icon: "nc-icon nc-time-alarm",
    component: Recordatorio,
    layout: "/inicio",
  },
  {
    path: "/emergencia",
    name: "emergencia",
    icon: "nc-icon nc-ambulance",
    component: Emergencia,
    layout: "/inicio",
  },
  {
    path: "/usuario",
    name: "Usuario",
    icon: "nc-icon nc-single-02",
    component: Usuario,
    layout: "/inicio",
  },
  
];
export default routes;
