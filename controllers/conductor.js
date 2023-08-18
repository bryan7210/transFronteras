import ConductorModel from "../models/conductor.js";

const httpConductor = {
  getConductores: async (req, res) => {
    try {
      // Obtener todos los conductores desde la base de datos
      const conductores = await ConductorModel.find({});
      res.json({ conductores });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los conductores", error });
    }
  },

  getConductorCedula: async (req, res) => {
    const { cedula } = req.params;
    try {
      // Buscar un conductor por su cédula en la base de datos
      const conductor = await ConductorModel.findOne({ cedula });
      res.json({ conductor });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el conductor", error });
    }
  },

  postConductor: async (req, res) => {
    const { nombre, cedula, telefono,tipo_lisencia, vigencia, direccion, targeta_propiedad } = req.body;
    const conductor = new ConductorModel({
      nombre,
      cedula,
      telefono,
      tipo_lisencia,
      vigencia,
      direccion,
      targeta_propiedad
    });

    try {
      // Guardar el nuevo conductor en la base de datos
      const nuevoConductor = await conductor.save();

      res.json({
        mensaje: "1 conductor insertado!!",
        conductor: nuevoConductor,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el conductor", error });
    }
  },

  putConductor: async (req, res) => {
    const { cedula } = req.params;
    const { nombre, telefono } = req.body;

    try {
      // Actualizar el conductor en la base de datos
      const conductorActualizado = await ConductorModel.findOneAndUpdate(
        { cedula },
        { $set: { nombre, telefono } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (conductorActualizado) {
        res.json({
          mensaje: "Registro modificado correctamente",
          conductor: conductorActualizado,
        });
      } else {
        res.json({ mensaje: "No se encontró el conductor con la cédula proporcionada" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el conductor", error });
    }
  },

  putConductorEstado: async (req, res) => {
    const {cedula} = req.params;

    try {
      // Buscar el admin por su cedula en la base de datos
      const conductor = await ConductorModel .findOne({ cedula });

      if (!conductor) {
        return res.status(404).json({ mensaje: "conductor no encontrado" });
      }
       
      // Aqui se cambia el estado del conductor al opuesto
      conductor.estado = !conductor.estado;

      // Se guarda el conductor actualizado
      await conductor.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = conductor.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con el conductor actualizado y el estado
      res.json({
        mensaje: `Estado del conductor modificado a ${estadoMensaje}`,
        conductor: conductor,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado del conductor", error })
    }
  },
};

export default httpConductor;












// import ConductorModel from "../models/conductor.js"

// const httpConductor = {
//   getConductores: async (req, res) => {
//     res.json({ conductores });
//   },
//   getConductorCedula: async (req, res) => {
//     const { cedula } = req.params;
//     const conductor = conductores.find((item) => item.cedula == cedula);

//     res.json({ conductor });
//   },
//   postConductor: async (req, res) => {
//     const { nombre, cedula, telefono, tipo_lisencia, vigencia, direccion, targeta_propiedad } = req.body;
//     const conductor = new ConductorModel({
//       nombre,
//       cedula,
//       telefono,
//       tipo_lisencia,
//       vigencia,
//       direccion,
//       targeta_propiedad
//     });

//     try {
//       // Guardar el nuevo conductor en la base de datos
//       const nuevoConductor = await conductor.save();

//       res.json({
//         mensaje: "1 conductor insertado!!",
//         conductor: nuevoConductor,
//       });
//     } catch (error) {
//       // Manejar el error si ocurre algún problema al guardar en la base de datos
//       res.status(500).json({ mensaje: "Error al insertar el conductor", error });
//     }
//   },
//   putConductor: (req, res) => {
//     const { cedula } = req.params;
//     const { nombre, telefono } = req.body;
  
//     let sw = 0;
//     for (let i = 0; i < conductores.length; i++) {
//       if (cedula == conductores[i].cedula) {
//         if (nombre !== undefined) conductores[i].nombre = nombre;
//         if (telefono !== undefined) conductores[i].telefono = telefono;
//         sw = 1;
//         break;
//       }
//     }
  
//     if (sw === 1) {
//       res.json({
//         mensaje: "Registro modificado correctamente",
//         admin: conductores.find((item) => item.cedula === cedula),
//       });
//     } else {
//       res.json({ mensaje: "No se encontró el admin con la cédula proporcionada" });
//     }
//   },
  
//   deleteConductor: (req, res) => {
//     const { cedula } = req.params;
//     const index = conductores.findIndex(item => item.cedula === cedula);
  
//     if (index !== -1) {
//       const conductorEliminado = conductores.splice(index, 1);
//       res.json({
//         mensaje: "conductor eliminado exitosamente.",
//         conductor: conductorEliminado[0], // conductorEliminado es un array, así que toma el primer elemento
//       });
//     } else {
//       res.json({ mensaje: "No se encontró el conductor" });
//     }
//   },
  
// };

// const conductores = []; // Array que contiene los conductores

// export default httpConductor;
