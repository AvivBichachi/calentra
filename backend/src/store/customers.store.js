const customers = new Map();

let nextId = 1;

function listCustomers() {
    return Array.from(customers.values());
}

function getCustomerById(id) {
    return customers.get(id) || null;
}

function createCustomer({ firstName, lastName, phone, notes, whatsappOptIn }) {
    const id = String(nextId++);
    const now = new Date().toISOString();

    const customer = {
        id,
        firstName,
        lastName,
        phone,
        notes: notes || "",
        whatsappOptIn: Boolean(whatsappOptIn),
        createdAt: now,
        updatedAt: now,
    };

    customers.set(id, customer);
    return customer;
}

function updateCustomer(id, patch) {
    const existing = customers.get(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updated = {
        ...existing,
        ...patch,
        id: existing.id, // prevent id changes
        updatedAt: now,
    };

    customers.set(id, updated);
    return updated;
}

function deleteCustomer(id) {
    return customers.delete(id);
}

module.exports = {
    listCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};