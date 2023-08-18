import jwt from 'jsonwebtoken';

export const generarJWT = (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, "clavesecreta", {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token as string);
            }
        });
    });
};