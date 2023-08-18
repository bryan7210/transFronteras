import { validationResult } from "express-validator";
import VendedorModel from "../models/vendedor.js";
import bcryptjs from "bcryptjs"

const httpVendedor = {
  getVendedor: async (req, res) => {
    try {
      // Obtener todos los vendedores desde la base de datos
      const vendedores = await VendedorModel.find({});
      res.json({ vendedores });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los vendedores", error });
    }
  },

  getVendedorCedula: async (req, res) => {
    const { cc } = req.params;
    try {
      // Buscar un vendedor por su cédula en la base de datos
      const vendedor = await VendedorModel.findOne({ cedula: cc });
      res.json({ vendedor });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el vendedor", error });
    }
  },

  postVendedor: async (req, res) => {
    const { nombre, cedula, telefono, direccion, apellido, password, email } = req.body;
    const vendedor = new VendedorModel({
      nombre,
      cedula,
      telefono,
      direccion,
      apellido,
      password,
      email,
    });
    
    try {
      const salt = bcryptjs.genSaltSync(10);
    vendedor.password = bcryptjs.hashSync(password, salt)
      // Guardar el nuevo vendedor en la base de datos
      const nuevoVendedor = await vendedor.save();

      res.json({
        mensaje: "1 vendedor insertado!!",
        vendedor: nuevoVendedor,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el vendedor", error });
    }
  },

  putVendedor: async (req, res) => {
    const { cedula } = req.params;
    const { nombre, telefono } = req.body;

    try {
      // Actualizar el vendedor en la base de datos
      const vendedorActualizado = await VendedorModel.findOneAndUpdate(
        { cedula },
        { $set: { nombre, telefono } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (vendedorActualizado) {
        res.json({
          mensaje: "Registro modificado correctamente",
          vendedor: vendedorActualizado,
        });
      } else {
        res.json({ mensaje: "No se encontró el vendedor con la cédula proporcionada" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el vendedor", error });
    }
  },

  putVendedorEstado: async (req, res) => {
    const {cedula} = req.params;

    try {
      // Buscar el vendedor por su cedula en la base de datos
      const vendedor = await VendedorModel .findOne({ cedula });

      if (!vendedor) {
        return res.status(404).json({ mensaje: "vendedoristrador no encontrado" });
      }
       
      // Aqui se cambia el estado del vendedor al opuesto
      vendedor.estado = !vendedor.estado;

      // Se guarda el vendedor actualizado
      await vendedor.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = vendedor.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con el vendedor actualizado y el estado
      res.json({
        mensaje: `Estado del vendedor modificado a ${estadoMensaje}`,
        vendedor: vendedor,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado del vendedor", error })
    }
  },
};

export default httpVendedor;




