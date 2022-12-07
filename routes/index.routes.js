import { Router } from "express";

import usersRoute from "./users.routes.js";
import rolRoute from "./rol.routes.js";
import localRoute from "./local.routes.js";
import empleadoRoute from "./empleado.routes.js";
import cuentaRoute from "./cuenta.routes.js";
import authRoute from "./auth.routes.js";
import productosRoute from "./producto.routes.js";
import opProductoRoute from "./opcionProducto.routes.js";
import opLocalRoute from "./opcionLocal.routes.js";
import opTipoOrdenRoute from "./tipoOrden.routes.js";
import estadoDOrdenRoute from "./estadoDetOrden.routes.js";
import mesaRoute from "./mesa.routes.js";
import comandaRoute from "./comanda.routes.js";

const router = Router();

router.use("/users", usersRoute);
router.use("/rol", rolRoute);
router.use("/local", localRoute);
router.use("/empleado", empleadoRoute);
router.use("/cuenta", cuentaRoute);
router.use("/auth", authRoute);
router.use("/productos", productosRoute);
router.use("/opciones-productos", opProductoRoute);
router.use("/opciones-locales", opLocalRoute);
router.use("/tipo-orden", opTipoOrdenRoute);
router.use("/estado-detalle-orden", estadoDOrdenRoute);
router.use("/mesa", mesaRoute);
router.use("/comandas", comandaRoute);

export default router;
