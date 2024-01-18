class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let id = 1;
        if (this.products.length > 0) {
            id = this.products[this.products.length-1].id+1;
        }
        let exists = products.findIndex(product => product.code === code)
        if (exists) {
            console.log(`el producto con codigo ${code} ya existe!!`)
            return
        } 

        let newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
    }

    getProductsById(id) {
        let indice = this.products.findIndex(product => product.id === id)
        if (indice === -1) {
            console.log(`no existe el producto con id ${id}`);
            return
        }
        return this.products[indice];
    }
}