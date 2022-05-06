import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Input } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useCart from '../../../hooks/useCart';
import { toast } from 'react-toastify';

const TAX_RATE = 0.16;

function ccyFormat(num) {
	return num?.toLocaleString('es-MX', {
		style: 'currency',
		currency: 'MXN',
		minimumFractionDigits: 2,
	});
}

const Summarycart = ({ products, setReloadCart, reloadCart }) => {
	const { removeProductCart } = useCart();
	const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
	const [invoiceTaxes, setInvoiceTaxes] = useState(0);
	const [invoiceTotal, setInvoiceTotal] = useState(0);
	const [socketCantidad, setSocketCantidad] = useState(false);

	useEffect(() => {
		let invoiceSubtotal = products
			?.map(({ price, cantidad }) => price * cantidad)
			.reduce((sum, i) => sum + i, 0);
		setInvoiceSubtotal(invoiceSubtotal);
		setInvoiceTaxes(TAX_RATE * invoiceSubtotal);
		setInvoiceTotal(invoiceSubtotal + invoiceTaxes);
		setSocketCantidad(false);
	}, [reloadCart, products, socketCantidad]);

	const removeProduct = (product) => {
		removeProductCart(product);
		setReloadCart(true);
	};

	const handleChangeCantidad = (value, id) => {
		const productChange = products?.filter((product) => product.id === id)[0];

		if (value > productChange.existencias) {
			toast.error('No hay suficientes existencias');
			productChange.cantidad = productChange.existencias;
			setSocketCantidad(true);
		} else {
			productChange.cantidad = parseInt(value);
			setSocketCantidad(true);
		}
	};

	return (
		<div className='summary-cart'>
			<h1>Carrito de compras</h1>
			<div className='cart-container'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label='spanning table'>
						<TableHead>
							{/* <TableRow>
                <TableCell align="center" colSpan={3}>
                  Detalles
                </TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow> */}
							<TableRow>
								<TableCell sx={{ width: 200 }}>Imagen</TableCell>
								<TableCell align='right'>Descripción</TableCell>
								<TableCell align='right'>Cantidad</TableCell>
								<TableCell align='right'>Precio Unitario</TableCell>
								<TableCell align='right'>Precio Total</TableCell>
								<TableCell align='right'>Eliminar</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products &&
								products.map((product) => (
									<TableRow key={product.id}>
										<TableCell>
											<img
												src={product.poster.url}
												className='img-table'
												alt={product.title}
											/>{' '}
										</TableCell>
										<TableCell align='right'>
											{product.title.toUpperCase()}{' '}
											{product.summary.toUpperCase()}
										</TableCell>
										<TableCell align='right'>
											<Input
												type='number'
												value={product.cantidad}
												inputProps={{
													min: 1,
													pattern: '^[0-9]+',
													max: product.existencias,
												}}
												onChange={(event) =>
													handleChangeCantidad(event.target.value, product.id)
												}
											/>
										</TableCell>
										<TableCell align='right' className='cell-number'>
											<p>{ccyFormat(product.price)}</p>
										</TableCell>
										<TableCell align='right' className='cell-number'>
											<p>
												{product.cantidad
													? ccyFormat(product.price * product.cantidad)
													: ccyFormat(product.price)}
											</p>
										</TableCell>
										<TableCell align='right'>
											<Button onClick={() => removeProduct(product.url)}>
												<DeleteForeverIcon />{' '}
											</Button>
										</TableCell>
									</TableRow>
								))}

							<TableRow className='price'>
								<TableCell rowSpan={3} />
								<TableCell colSpan={2}>Subtotal</TableCell>
								<TableCell align='right'>
									{ccyFormat(invoiceSubtotal)}
								</TableCell>
							</TableRow>
							<TableRow className='price'>
								<TableCell>IVA</TableCell>
								<TableCell align='right'>{`${(TAX_RATE * 100).toFixed(
									0
								)} %`}</TableCell>
								<TableCell align='right'>{ccyFormat(invoiceTaxes)}</TableCell>
							</TableRow>
							<TableRow className='price'>
								<TableCell colSpan={2}>Total</TableCell>
								<TableCell align='right'>{ccyFormat(invoiceTotal)}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default Summarycart;
