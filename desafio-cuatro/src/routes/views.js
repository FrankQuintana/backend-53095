import Router from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager;

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        let datos = { productos }

        res.render('home', datos)
    } catch (error) {
        console.log(error)
    }
});

router.get('/products', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        let datos = { productos }

        res.render('home', datos)
    } catch (error) {
        console.log(error)
    }
});

router.get('/realTimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default router;