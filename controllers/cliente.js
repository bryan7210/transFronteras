import ClienteModel from "../models/cliente.js";

const httpCliente = {
  getClientes: async (req, res) => {
    try {
      // Obtener todos los clientes desde la base de datos
      const clientes = await ClienteModel.find({});
      res.json({ clientes });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los clientes", error });
    }
  },

  getClienteCedula: async (req, res) => {
    const { cedula } = req.params;
    try {
      // Buscar un cliente por su cédula en la base de datos
      const cliente = await ClienteModel.findOne({ cedula });
      res.json({ cliente });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el cliente", error });
    }
  },

  postCliente: async (req, res) => {
    const { nombre, cedula, telefono } = req.body;
    const cliente = new ClienteModel({
      nombre,
      cedula,
      telefono,
    });

    try {
      // Guardar el nuevo cliente en la base de datos
      const nuevoCliente = await cliente.save();

      res.json({
        mensaje: "1 cliente insertado!!",
        cliente: nuevoCliente,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el cliente", error });
    }
  },

  putCliente: async (req, res) => {
    const { cedula } = req.params;
    const { nombre, telefono } = req.body;

    try {
      // Actualizar el cliente en la base de datos
      const clienteActualizado = await ClienteModel.findOneAndUpdate(
        { cedula },
        { $set: { nombre, telefono } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (clienteActualizado) {
        res.json({
          mensaje: "Registro modificado correctamente",
          cliente: clienteActualizado,
        });
      } else {
        res.json({ mensaje: "No se encontró el cliente con la cédula proporcionada" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el cliente", error });
    }
  },

  putClienteEstado: async (req, res) => {
    const {cedula} = req.params;

    try {
      // Buscar el cliente por su cedula en la base de datos
      const cliente = await ClienteModel.findOne({ cedula });

      if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
      }
       
      // Aqui se cambia el estado del cliente al opuesto
      cliente.estado = !cliente.estado;

      // Se guarda el cliente actualizado
      await cliente.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = cliente.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con el cliente actualizado y el estado
      res.json({
        mensaje: `Estado del cliente modificado a ${estadoMensaje}`,
        cliente: cliente,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado del cliente", error })
    }
  },


};

export default httpCliente;










