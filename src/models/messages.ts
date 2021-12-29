import { cart } from './schemas/cartschema';
import { products } from './schemas/productschema';
import { purchase } from './schemas/purchaseschema';

class Messages {
	async getMessages(message: string, userId?: string) {
		switch (message.toLowerCase()) {
			case 'stock': {
				const productStock = await products.find({}, { name: 1, stock: 1 });
				let response = '';
				productStock.map((product) => {
					response += `- ${product.name}: ${product.stock}\n`;
				});
				return response;
			}
			case 'orden': {
				const lastOrder = await purchase.findOne(
					{ userId },
					{},
					{ sort: { createdAt: -1 } }
				);

				let response = '';

				if (lastOrder === null) {
					response = 'No hay ninguna orden generada';
				} else {
					response = `Ultma orden con id: ${lastOrder._id}
                                Se encuentra en estado: ${lastOrder.state === 'generated'? 'generada' : 'completada'} y
                                ${lastOrder.state === 'generated' ? 'sera entregada pronto' : 'ya fue entregada'}
                                Contiene los siguientes productos: \n`;
					lastOrder.purchases!.map((product) => {
						response += `- Nombre: ${product.name}, Precio: ${product.price}, Cantidad: ${product.quantity}\n`;
					});
					response += `Total: ${lastOrder.total}`;
				}

				return response;
			}
			case 'carrito': {
				const currentCart = await cart.findOne({ userId });
				let response = '';

				if (currentCart === null) {
					response = 'El carrito esta vacio';
				} else {
					currentCart.cartProducts!.map((product) => {
						response += `- Nombre: ${product.name}, Precio: ${product.price}, Cantidad: ${product.quantity}\n`;
					});
					response += `Total: ${currentCart.total}`;
				}
				return response;
			}

			default:
				return `
                    Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones:$nl
                    - Stock: Para conocer nuestro stock actual.$nl
                    - Orden: Para concer la información de tu última orden.$nl
                    - Carrito: Para conocer el estado de tu carrito.$nl
                `;
		}
	}
}

export const messagesModel = new Messages();
