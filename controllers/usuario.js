import UsuarioModel from "../models/usuario.js";

const httpUsuario = {
    getUsuarios: async (req, res) => {
        try { 
           const usuarios = await UsuarioModel.find({});
           res.json({ usuarios });
        } catch (error) {
           res.status(500).json({ mensaje: "Error al obtener los usuarios", error })
        }
    },

    getUsuarioCedula: async (req, res) => {
        const { cedula } = req.params;
        try {
          const usuario = await UsuarioModel.findOne({ cedula });
          res.json({ usuario })   
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener cliente ", error });
        }
    },

    postUsuario: async (req, res) => {
        const { nombre,password, cedula, telefono, email, direccion, apellido } = req.body;
        const usuario = new UsuarioModel({
            nombre,
            cedula,
            telefono,
            email,
            direccion,
            apellido,
            password
        });

        try {

            const nuevoUsuario = await usuario.save();
            res.json({
                mensaje: "1 cliente insertado!!",
                usuario: nuevoUsuario
            });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al insertar cliente", error });
        }
    },

    putUsuario: async ( req, res ) => {
        const { cedula } = req.params;
        const { nombre, telefono } = req.body;

        try {
            const usuarioActualizado = await UsuarioModel.findOneAndUpdate(
                { cedula },
                { $set: { nombre, telefono } },
                { new: true }
            );

            if (usuarioActualizado) {
                res.json({
                    mensaje: "Registro modificado correctamente",
                    usuario: usuarioActualizado,
                });
            } else {
                res.json({ mensaje: "No se encontro el usuario con la cédula proporcionada" })
            }
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al actualizar el usuario", error })
        }
    },

    putUsuarioEstado: async (req, res) => {
        const {cedula} = req.params;
    
        try {
          // Buscar el usuario por su cedula en la base de datos
          const usuario = await UsuarioModel.findOne({ cedula });
    
          if (!usuario) {
            return res.status(404).json({ mensaje: "usuarioistrador no encontrado" });
          }
           
          // Aqui se cambia el estado del usuario al opuesto
          usuario.estado = !usuario.estado;
    
          // Se guarda el usuario actualizado
          await usuario.save();
    
          // Se define un mensaje de estado en funcion del estado actualizado
          const estadoMensaje = usuario.estado ? "Activo" : "Inactivo";
    
          // Aqui se devuelve la respuesta con el usuario actualizado y el estado
          res.json({
            mensaje: `Estado del usuario modificado a ${estadoMensaje}`,
            usuario: usuario,
          });
        } catch (error) {
          res.status(500).json({ mensaje: "Error al cambiar el estado del usuario", error })
        }
      },
};

export default httpUsuario