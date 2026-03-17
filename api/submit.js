export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, fidgetChoice, message } = req.body;
    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/pre_orders`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                fidget_choice: fidgetChoice,
                message: message
            })
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}