 import VehiculoModel from "../models/vehiculo.js";

const httpVehiculo = {
  getVehiculos: async (req, res) => {  
    try {
      // Obtener todos los vehiculos desde la base de datos
      const vehiculos = await VehiculoModel.find({});
      res.json({ vehiculos }); 
    } catch (error) { 
      res.status(500).json({ mensaje: "Error al obtener los vehiculos", error });
    }
  },

  getVehiculoId: async (req, res) => {
    const { id } = req.params;
    try {
      // Buscar un vehiculo por su id en la base de datos
      const vehiculo = await VehiculoModel.findOne({ id })
        // Aquí se realiza la operación de populate

      res.json({ vehiculo });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el vehiculo", error });
    }
  },

  postVehiculo: async (req, res) => {
    const {   matricula, propietario, soat, tecnomecanica, capacidad,  num_vehiculo,conductor } = req.body;
    const vehiculo = new VehiculoModel({
      matricula,
      propietario, 
      soat,
      tecnomecanica,
      capacidad,
      num_vehiculo,
      conductor
    });

    try {
      // Guardar el nuevo vehiculo en la base de datos
      const nuevoVehiculo = await vehiculo.save();

      res.json({
        mensaje: "1 vehiculo insertado!!",
        vehiculo: nuevoVehiculo,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el vehiculo", error });
    }
  },

  putVehiculo: async (req, res) => {
    const { id } = req.params;
    const {  matricula, propietario, soat, tecnomecanica, capacidad, num_vehiculo } = req.body;

    try {
      // Actualizar el vehículo en la base de datos
      const vehiculoActualizado = await VehiculoModel.findOneAndUpdate(
        { id },
        { $set: { matricula, propietario, soat, tecnomecanica, capacidad,   num_vehiculo } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (vehiculoActualizado) {
        res.json({
          mensaje: "Registro modificado correctamente",
          vehiculo: vehiculoActualizado,
        });
      } else {
        res.json({ mensaje: "No se encontró el vehículo con la matrícula proporcionada" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el vehículo", error });
    }
  },

  putVehiculoEstado: async (req, res) => {
    const {id} = req.params;

    try {
      // Buscar el admin por su id en la base de datos
      const vehiculo = await VehiculoModel .findOne({ id }); 

      if (!vehiculo) {
        return res.status(404).json({ mensaje: "Vehiculoistrador no encontrado" });
      }
       
      // Aqui se cambia el estado del vehiculo al opuesto
      vehiculo.estado = !vehiculo.estado;

      // Se guarda el vehiculo actualizado
      await vehiculo.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = vehiculo.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con el vehiculo actualizado y el estado
      res.json({
        mensaje: `Estado del vehiculo modificado a ${estadoMensaje}`,
        vehiculo: vehiculo,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado del vehiculo", error })
    }
  },
};

export default httpVehiculo;




