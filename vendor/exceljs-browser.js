import * as ExcelModule from "../node_modules/exceljs/dist/exceljs.min.js";

const ExcelJS = globalThis.ExcelJS || ExcelModule.default || ExcelModule;

export default ExcelJS;
