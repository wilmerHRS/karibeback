import rolService from "../services/rol.service.js";
import localService from "../services/local.service.js";
import empleadoService from "../services/empleado.service.js";
import cuentaService from "../services/cuenta.service.js";
import productoService from "../services/producto.service.js";
import opProductoService from "../services/opcionProducto.service.js";
import opLocalService from "../services/opcionLocal.service.js";
import tipoOrdenService from "../services/tipoOrden.service.js";
import estadoDOrdenService from "../services/estadoDetOrden.service.js";
import mesaService from "../services/mesa.service.js";
import comandaService from "../services/comanda.service.js";
import detOrdenService from "../services/detalleOrden.service.js";

// ROL---------------------------------------------

const rolExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await rolService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// LOCAL-------------------------------------------

const localExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await localService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// EMPLEADO-------------------------------------------

const empleadoExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await empleadoService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// CUENTA-------------------------------------------

const cuentaExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await cuentaService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// PRODUCTO-------------------------------------------

const productoExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await productoService.getProductoById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// OPCION PRODUCTO-------------------------------------------

const opProductoExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await opProductoService.getOpcionProductoById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// OPCION LOCAL-------------------------------------------

const opLocalExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await opLocalService.getOpcionLocalById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// TIPO ORDEN-------------------------------------------

const tipoOrdenExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await tipoOrdenService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// ESTADO DETALLE ORDEN-------------------------------------------

const estadoDOrdenExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await estadoDOrdenService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// MESA-------------------------------------------

const mesaExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await mesaService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// COMANDA-------------------------------------------

const comandaExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await comandaService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

// DETALLE ORDEN-------------------------------------------

const detOrdenExistsById = async (id = 0) => {
  if (id === "" || id <= 0) return;

  try {
    await detOrdenService.getById(Number(id));
  } catch (err) {
    throw new Error(err.message);
  }
};

export {
  rolExistsById,
  localExistsById,
  empleadoExistsById,
  cuentaExistsById,
  productoExistsById,
  opProductoExistsById,
  opLocalExistsById,
  tipoOrdenExistsById,
  estadoDOrdenExistsById,
  mesaExistsById,
  comandaExistsById,
  detOrdenExistsById,
};
