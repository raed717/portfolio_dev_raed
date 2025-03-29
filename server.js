const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.json());

// Ensure messages.json exists with proper permissions
async function ensureMessagesFile() {
    const messagesFile = path.join(__dirname, 'messages.json');
    try {
        await fs.access(messagesFile);
    } catch (error) {
        // File doesn't exist, create it with empty messages array
        await fs.writeFile(messagesFile, JSON.stringify({ messages: [] }, null, 2), {
            mode: 0o666 // Read/write for owner, group, and others
        });
    }
    return messagesFile;
}

// Handle message submissions
app.post('/save-message', async (req, res) => {
    try {
        const messagesFile = await ensureMessagesFile();
        
        // Read existing messages
        let data = { messages: [] };
        try {
            const fileContent = await fs.readFile(messagesFile, 'utf8');
            data = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading messages file:', error);
            // Initialize with empty array if file is empty or invalid
            data = { messages: [] };
        }

        // Add new message
        const newMessage = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        data.messages.push(newMessage);
        
        // Write the updated messages back to file
        await fs.writeFile(messagesFile, JSON.stringify(data, null, 2));
        
        res.json({ success: true, message: 'Message saved successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
