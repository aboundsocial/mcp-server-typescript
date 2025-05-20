"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const supabaseClient_1 = require("@/lib/supabaseClient");
async function handler(req, res) {
    try {
        const { data, error } = await supabaseClient_1.supabase.from('users').select('*');
        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(data);
    }
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
