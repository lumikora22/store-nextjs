import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Input } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TAX_RATE = 0.16;

function ccyFormat(num) {
  return `${num?.toFixed(2)}`;
}

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;

const Summarycart = ({ products }) => {
    const [productsTemp, setProductsTemp] = useState([]);
  
//   products?.map((product) => {
//       product.cantidad = 1;
//       setProductsTemp.push(product);
//   })
//   useEffect(() => {
//       setProductsTemp(products);
//   }, [productsTemp]);
  

  const handleChangeCantidad = (value, id) =>{
    products?.filter((product) => product.id === id)[0].cantidad = parseInt(value);
    console.log(products)
  }
  

  function subtotal(products) {
    return products?.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(products);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <div className="summary-cart">
      <h1>Carrito de compras</h1>
      <div className="cart-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Detalles
                </TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: 200 }}>Imagen</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Precio Total</TableCell>
                <TableCell align="right">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.poster.url}
                        className="img-table"
                        alt={product.title}
                      />{" "}
                    </TableCell>
                    <TableCell align="right">
                      {product.title.toUpperCase()}{" "}
                      {product.summary.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">
                      <Input type="number" defaultValue={1} onChange={(event)=>handleChangeCantidad(event.target.value, product.id)}/>
                    </TableCell>
                    <TableCell align="right" className="cell-number">
                      <p>${ccyFormat(product.price)}</p>
                    </TableCell>
                    <TableCell align="right" className="cell-number">
                      <p>${ccyFormat(product.price)* product.cantidad}</p>
                    </TableCell>
                    <TableCell align="right">
                      <Button>
                        <DeleteForeverIcon />{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IVA</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Summarycart;
