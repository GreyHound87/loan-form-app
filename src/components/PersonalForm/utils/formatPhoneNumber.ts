export const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length > 0 && cleaned[0] !== '0') {
        cleaned = `0${cleaned}`;
    }
    if (cleaned.length > 4) {
        cleaned = `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
    if (cleaned.length > 8) {
        cleaned = `${cleaned.slice(0, 8)} ${cleaned.slice(8)}`;
    }
    return cleaned.slice(0, 12);
};
