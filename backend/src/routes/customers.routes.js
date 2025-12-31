const express = require("express");
const {
    listCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require("../store/customers.store");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(listCustomers());
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const customer = getCustomerById(id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    return res.status(200).json(customer);
})

router.post("/", (req, res) => {
    const { firstName, lastName, phone, notes, whatsappOptIn } = req.body || {};

    if (!isNonEmptyString(firstName)) return res.status(400).json({ error: "First name is required" });
    if (!isNonEmptyString(lastName)) return res.status(400).json({ error: "Last name is required" });
    if (!isNonEmptyString(phone)) return res.status(400).json({ error: "Phone number is required" });

    const customer = createCustomer(firstName, lastName, phone, notes, whatsappOptIn)
    return res.status(201).json(customer);
})

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const customer = getCustomerById(id);
    if (!customer) return res.status(404).json({ error: "Customer not exist" });
    const body = req.body;
    if (Object.keys(body).length === 0) return res.status(400).json({ error: "Nothing to update" });
    const patch = {};
    if (body.firstName !== undefined) {
        if (typeof body.firstName !== 'string' || !body.firstName.trim()) {
            return res.status(400).json({ error: "first name is invalid" })
        }
        patch.firstName = body.firstName;
    }
    if (body.lastName !== undefined) {
        if (typeof body.lastName !== 'string' || !body.lastName.trim()) {
            return res.status(400).json({ error: "last name is invalid" })
        }
        patch.lastName = body.lastName;
    }
    if (body.phone !== undefined) {
        if (typeof body.phone !== "string" || !/^\d{3}-\d{7}$/.test(body.phone)) {
            return res.status(400).json({ error: "phone must match XXX-XXXXXXX" });
        }
        patch.phone = body.phone;
    }
    if (body.notes !== undefined) {
        patch.notes = String(body.notes);
    }

    if (body.whatsappOptIn !== undefined) {
        if (typeof body.whatsappOptIn !== "boolean") {
            return res.status(400).json({ error: "whatsappOptIn must be a boolean" });
        }
        patch.whatsappOptIn = body.whatsappOptIn;
    }
    if (Object.keys(patch).length === 0) {
        return res.status(400).json({ error: "Nothing to update" });
    }

    const updatedCustomer = updateCustomer(id, patch);
    return res.status(200).json(updatedCustomer);
})

module.exports = router;
