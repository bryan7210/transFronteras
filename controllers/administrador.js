import AdminModel from "../models/administrador.js";
import bcryptjs from "bcryptjs"

const httpAdmin = { 
  getAdmins: async (req, res) => {
    try {
      // Obtener todos los admins desde la base de datos
      const admins = await AdminModel.find({});
      res.json({ admins });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los admins", error });
    }
  },

  getAdminCedula: async (req, res) => {
    const { cedula } = req.params;
    try {
      // Buscar un admin por su cédula en la base de datos
      const admin = await AdminModel.findOne({ cedula });
      res.json({ admin });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el admin", error });
    }
  },

  postAdmin: async (req, res) => {
    const { nombre, cedula, telefono, apellido, password, direccion, email } = req.body;
    const admin = new AdminModel({
      nombre,
      cedula,
      telefono,
      apellido,
      password,
      direccion,
      email
    });
    
    try {
      const salt = bcryptjs.genSaltSync(10);
    admin.password = bcryptjs.hashSync(password, salt)
      // Guardar el nuevo admin en la base de datos
      const nuevoAdmin = await admin.save(); 

      res.json({
        mensaje: "1 admin insertado!!",
        admin: nuevoAdmin,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el admin", error });
    }
  },

  putAdmin: async (req, res) => {
    const { cedula } = req.params;
    const { nombre, telefono } = req.body;

    try {
      // Actualizar el admin en la base de datos
      const adminActualizado = await AdminModel.findOneAndUpdate(
        { cedula },
        { $set: { nombre, telefono } },
        { new: true } // Devuelve el documento actualizado en la respuesta
      );

      if (adminActualizado) {
        res.json({
          mensaje: "Registro modificado correctamente",
          admin: adminActualizado,
        });
      } else {
        res.json({ mensaje: "No se encontró el admin con la cédula proporcionada" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el admin", error });
    }
  },
  putAdminEstado: async (req, res) => {
    const {cedula} = req.params;

    try {
      // Buscar el admin por su cedula en la base de datos
      const admin = await AdminModel .findOne({ cedula });

      if (!admin) {
        return res.status(404).json({ mensaje: "Administrador no encontrado" });
      }
       
      // Aqui se cambia el estado del admin al opuesto
      admin.estado = !admin.estado;

      // Se guarda el admin actualizado
      await admin.save();

      // Se define un mensaje de estado en funcion del estado actualizado
      const estadoMensaje = admin.estado ? "Activo" : "Inactivo";

      // Aqui se devuelve la respuesta con el admin actualizado y el estado
      res.json({
        mensaje: `Estado del admin modificado a ${estadoMensaje}`,
        admin: admin,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al cambiar el estado del admin", error })
    }
  },

};
export default httpAdmin;