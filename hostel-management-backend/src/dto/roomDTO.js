//Validar datos ingresados
exports.validate = (data) => {
    const { number, price, isAvaliable, imageURL } = data;
    if (!number || !price || isAvaliable === undefined) {
        return { error: 'All fields are required.' };
    }
    return {
        number: String(number),
        price: Number(price),
        isAvaliable: Boolean(isAvaliable),
        imageURL: String(imageURL)
    };
};