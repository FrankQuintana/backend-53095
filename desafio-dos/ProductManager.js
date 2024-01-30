const fs = require('fs');

class ProductManager {
    #ruta = './products.json';
    constructor() {
        this.path = this.#ruta;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (fs.existsSync(this.path)) {
            console.log("exsite el archivo");
            let data = fs.readFileSync(this.path, 'utf-8');
            let dataJS = JSON.parse(data);

            product.id = dataJS[dataJS.length - 1].id + 1;
            dataJS.push(product);

            fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8');
        } else {
            console.log("No existe el archivo");
            product.id = 1;
            const arrProducts = [product];

            fs.writeFileSync(this.path, `${JSON.stringify(arrProducts, null, 2)}`, 'utf-8');
        }
    }

    getProducts() {
        let data = fs.readFileSync(this.path, 'utf-8');
        let dataJS = JSON.parse(data);

        console.log(dataJS);
        return dataJS;
    }

    getProductById(id) {
        let data = fs.readFileSync(this.path, 'utf-8');
        let dataJS = JSON.parse(data);

        const productById = dataJS.find(product => product.id == id);

        console.log(productById);
        return productById;
    }

    updateProduct(id, obj) {
        let data = fs.readFileSync(this.path, 'utf-8');
        let dataJS = JSON.parse(data);

        let productById = dataJS.find(product => product.id == id);

        productById = obj;
        productById.id = id;

        dataJS.splice((id - 1), 1, productById);
        console.log(dataJS);

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8');
    }

    deleteProduct(id) {
        let data = fs.readFileSync(this.path, 'utf-8');
        let dataJS = JSON.parse(data);

        dataJS.splice((id - 1), 1);

        let count = 1;

        dataJS.forEach(product => {
            product.id = count++
        });

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8');
    }
}

const productManager = new ProductManager();

productManager.addProduct("titulo", "es una prueba", 500, "link", 200, 15)
productManager.addProduct("titulo 2", "es una prueba", 500, "link", 200, 15)
productManager.addProduct("titulo 3", "es una prueba", 500, "link", 200, 15)
productManager.addProduct("titulo 4", "es una prueba", 500, "link", 200, 15)
productManager.addProduct("titulo 5", "es una prueba", 500, "link", 200, 15)
productManager.getProducts()
productManager.getProductById(3)

let change =  {
    title: "otra prueba",
    description: "objeto actualizado",
    price: 500,
    thumbnail: "link",
    code : 200,
    stock: 15
}

productManager.updateProduct(1, change)
productManager.deleteProduct(2)