import RutaModel from "../models/rutas.js";

const httpRuta = {
  getRutas: async (req, res) => {
    try {
      // Obtener todas las rutas desde la base de datos
      const rutas = await RutaModel.find({});
      res.json({ rutas });
    } catch (error) { 
      res.status(500).json({ mensaje: "Error al obtener las rutas", error });
    }
  },

  getRutaId: async (req, res) => { 
    const { id } = req.params;
    try {
      // Buscar una ruta por su ID en la base de datos
      const ruta = await RutaModel.findOne({ id });
      res.json({ ruta });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener la ruta", error });
    }
  },

  postRuta: async (req, res) => {
    const { nombreRuta, origen, destino, horarios, tarifas, infoContacto,estado } = req.body;
    const ruta = new RutaModel({
      nombreRuta,
      origen,
      destino,
      horarios,
      tarifas,
      estado,
      infoContacto,
    });

    try {
      // Guardar la nueva ruta en la base de datos
      const nuevaRuta = await ruta.save();

      res.json({
        mensaje: "1 ruta insertada!!",
        ruta: nuevaRuta,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar la ruta", error });
    }
  },

  putRuta: async (req, res) => {
    const { id } = req.params;
    const { nombreRuta, tarifa } = req.body;

    try {
      // Actualizar la ruta en la base de datos
      const rutaActualizada = await RutaModel.findOneAndUpdate(
        { id },
        { $set: { nombreRuta, tarifa } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (rutaActualizada) {
        res.json({
          mensaje: "Registro modificado exitosamente",
          ruta: rutaActualizada,
        });
      } else {
        res.json({ mensaje: "No se encontró el registro con el id proporcionado" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar la ruta", error });
    }
  },

  putRutaEstado: async (req, res) => {
    const {id} = req.params;

    try {
      // Buscar elruta por su id en la base de datos
      const ruta = await RutaModel.findOne({ id });

      if (!admin) {
        return res.status(404).json({ mensaje: "Administrador no encontrado" });
      }
       
      // Aqui se cambia el estado delruta al opuesto
     ruta.estado = !admin.estado;

      // Se guarda elruta actualizado
      awaitruta.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = ruta.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con elruta actualizado y el estado
      res.json({
        mensaje: `Estado de la ruta modificado a ${estadoMensaje}`,
       ruta:ruta,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado de la ruta", error })
    }
  },

  
};

export default httpRuta;



// import RutaModel from "../models/rutas.js"

// const httpRuta = {
//     getRutas: async (req, res) => {
//         res.json ({ rutas })
//     },
//     getRutaId: async (req, res) => {
//         const { id } = req.params;
//         const ruta = rutas.find( (item) => item.id == id );

//         res.json ({ruta});
//     },

//     postRuta: async (req, res) => {
//         const { nombreRuta, numeroRuta, origen, destino, horarios, tarifa, id, duracionTrayecto, infoContactos } = req.body
//         const ruta = new RutaModel ({
//             nombreRuta, 
//             origen,
//             destino,
//             horarios,
//             tarifa,
//             id,
//             duracionTrayecto,
//             infoContactos,
//             numeroRuta
//         });
//         rutas.push (ruta);

//         res.json ({
//             mensaje: "1 ruta insertada!!",
//             ruta,
//         });
//     },

//     putRuta: (req, res) => {
//         const { id } = req.params;
//         const { nombreRuta, tarifa } = req.body;

//         let sw = 0;
//         for ( let i = 0; i < rutas.length; i++ ) {
//             if ( id == rutas[i].id ) {
//                 if ( nombreRuta !== undefined ) rutas[i].nombreRuta = nombreRuta;
//                 if ( tarifa !== undefined ) rutas[i].tarifa = tarifa;
//                 sw = 1;
//                 break;
//             }
//         }
//         if ( sw === 1 ) {
//             res.json ({
//                 mensaje: "Registro modificado exitosamente",
//                 ruta: rutas.find ((item) => item.id === id),
//             });
//         }else{
//             res.json ({ mensaje: "No se encontro el registro con el id proporcionado" })
//         }
//     },

//     deleteRuta: (req, res) => {
//         const { id } = req.params;
//         const index = rutas.findIndex (item => item.id === id);

//         if ( index !== -1 ) {
//             const rutaEliminada = rutas.splice ( index, 1 );
//             res.json ({
//                 mensaje: "Cliente eliminado exitosamente",
//                 ruta: rutaEliminada[0],
//             });
//         } else {
//             res.json ({ mensaje: "No se encontro la ruta" });
//         }
//     },
// }

// const rutas = []; // Array que contiene las rutas

// export default httpRuta;
