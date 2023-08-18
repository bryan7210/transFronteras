import TikecksModel from "../models/tikeck.js";

const httpTikeck = {
  getTikecks: async (req, res) => {
    try {
      // Obtener todos los tikecks desde la base de datos
      const tikecks = await TikecksModel.find({});
      res.json({ tikecks });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los tikecks", error });
    }
  },

  getTikeckId: async (req, res) => {
    const { id } = req.params;
    try {
      // Buscar un tikeck por su ID en la base de datos
      const tikeck = await TikecksModel.findOne({ id });
      res.json({ tikeck });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el tikeck", error });
    }
  },

  postTikeck: async (req, res) => {
    const {  valorTicket, reserva, asiento, cliente, busAsignado, valorTikeck } = req.body;
    const tikeck = new TikecksModel({
      valorTicket,
      reserva,
      asiento,
      cliente,
      busAsignado,
      valorTikeck,
    });

    try {
      // Guardar el nuevo tikeck en la base de datos
      const nuevoTikeck = await tikeck.save();

      res.json({
        mensaje: "1 tikeck insertado!!",
        tikeck: nuevoTikeck,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el tikeck", error });
    }
  },

  putTikeck: async (req, res) => {
    const { id } = req.params;
    const { cliente, numeroTikeck } = req.body;

    try {
      // Actualizar el tikeck en la base de datos
      const tikeckActualizado = await TikecksModel.findOneAndUpdate(
        { id },
        { $set: { cliente, numeroTikeck } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (tikeckActualizado) {
        res.json({
          mensaje: "Registro modificado exitosamente",
          tikeck: tikeckActualizado,
        });
      } else {
        res.json({ mensaje: "No se encontró el cliente con la cedula proporcionada!!" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el tikeck", error });
    }
  },

  putTikeckEstado: async (req, res) => {
    const {numeroTikeck} = req.params;

    try {
      // Buscar el tikeck por su numeroTikeck en la base de datos
      const tikeck = await TikecksModel .findOne({ numeroTikeck });

      if (!tikeck) {
        return res.status(404).json({ mensaje: "tikeckistrador no encontrado" });
      }
       
      // Aqui se cambia el estado del tikeck al opuesto
      tikeck.estado = !tikeck.estado;

      // Se guarda el tikeck actualizado
      await tikeck.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = tikeck.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con el tikeck actualizado y el estado
      res.json({
        mensaje: `Estado del tikeck modificado a ${estadoMensaje}`,
        tikeck: tikeck,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado del tikeck", error })
    }
  },

  getBuscarTikeck: async (req, res) => {
    const {codigo, vehiculo, fecha} = req.query;
    const idRuta = await RutaModel.findOne({codigo})
    const idVehiculo = await vehiculo.findOne({num_vehiculo:vehiculo})

    const buscar = await Tickeck.find({
      $and: [
        {ruta:idRuta.id},
        {vehiculo:idVehiculo.id},
        {fecha_salida:fecha}
      ]
    })
    .populate("vehiculo")
    .populate("ruta")
    .populate("cliente")

    let puestos = []

    buscar.forEach((r,i) => {
      puestos.push(r.numero_asiento)
    });

    res.json({buscar, puestos})
  }
};

export default httpTikeck;

