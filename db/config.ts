import mongoose from "mongoose";

export const conectarDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://valpas312:41667229Vv@cluster0.naob6w4.mongodb.net/?retryWrites=true&w=majority");
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar a la base de datos");
    }
};