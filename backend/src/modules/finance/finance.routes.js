import express from "express";
import { authenticate } from "../../middleware/authMiddleware.js";

import {
    createAccount,
    listAccounts
} from "./accounts.controller.js";

import {
    createInvoice,
    getInvoices,
    updateInvoiceStatus
} from "./invoices.controller.js";
import { getLedger } from "./ledger.controller.js";
const router = express.Router();

// Chart of Accounts
router.get("/ledger", getLedger);
router.post("/accounts", authenticate, createAccount);
router.get("/accounts", authenticate, listAccounts);

// Invoices
router.post("/invoices", authenticate, createInvoice);
router.get("/invoices", authenticate, getInvoices);

router.put("/invoices/:id/status", updateInvoiceStatus);


export default router;
