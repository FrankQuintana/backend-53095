import { Router } from "express"
import { ProductManager } from "../ProductManager.js"
import { CartManager } from "../cartManager.js"

const router = Router()

const productManager = new ProductManager
const cartManager = new CartManager


router.post('/', async (req, res) => {
    await cartManager.createCart()
    res.send({mensaje: "carrito creado"})
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    
    try {
        let arrPC = []
        const cartProducts = await cartManager.getCartProducts(cid)
    
        await cartProducts.forEach(async (element) => {
            try {
                let product = await productManager.getProductById(element.id)

                product.quantity = element.quantity
                arrPC = [...arrPC, product]

                if(cartProducts.length == arrPC.length) {
                    res.status(200).json(arrPC);
                }
            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params

    try {
        await cartManager.uploadProduct(cid, pid)
        res.send({mensaje: "producto agregado al carrito"})
    } catch (error) {
        console.log(error)
    }
})

export default router