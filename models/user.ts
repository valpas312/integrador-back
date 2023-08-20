import { Model, Schema, model } from "mongoose"

export interface IUser {
    dni: number,
    nombre: string,
    email: string,
    contraseña: string,
    estado: boolean,
    verified?: boolean,
    code?: string
}

const UserSchema = new Schema<IUser>({
    dni: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    contraseña: { type: String, required: true },
    estado: { type: Boolean, required: true, default: true },
    verified: { type: Boolean, default: false, required: false },
    code: { type: String, required: false }
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, code, ...user } = this.toObject();
    return user;
};

const User: Model<IUser> = model<IUser>("Users", UserSchema);

export default User;