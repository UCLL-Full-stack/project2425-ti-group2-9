import jwt, { Algorithm } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { Role } from '../types';

const privateKey = fs.readFileSync(path.resolve(__dirname, process.env.JWT_PRIVATE_KEY!), 'utf8').trim();

const generateJwtToken = ({ username, role }: { username: string; role: Role }): string => {
    const options = {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
        issuer: 'courses_app',
        algorithm: 'RS256' as Algorithm // Asymmetric algorithm
    };

    try {
        return jwt.sign({ username, role }, privateKey, options);
    } catch (error) {
        console.error('JWT Token Generation Error:', error);
        throw new Error('Error generating JWT token.');
    }
};

const publicKey = fs.readFileSync(path.resolve(__dirname, process.env.JWT_PUBLIC_KEY!), 'utf8').trim();
if (!publicKey) {
    throw new Error('Public key is empty. Ensure public.pem is correctly generated.');
}

const verifyJwtToken = (token: string): any => {
    try {
        console.log('Public Key Loaded (First 100 chars):', JSON.stringify(publicKey.slice(0, 100)) + '...');

        return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};


export { generateJwtToken, verifyJwtToken};