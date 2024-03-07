export function randomString(length: number) {

    if(length === 0) return '';

    if(length < 0) throw new Error('length must be greater than 0');

    if(length > 32) throw new Error('length must be less than 32');

    if(!Number.isInteger(length) ) throw new Error('length must be an integer');

    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}