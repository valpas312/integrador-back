import jwt from 'jsonwebtoken';

export const generarJWT = (_id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { _id };

        jwt.sign(payload, "clavesecreta", (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token as string);
            }
        });
    });
};