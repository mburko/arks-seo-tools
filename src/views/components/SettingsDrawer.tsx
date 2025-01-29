import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography } from "@mui/material";
import { models } from "../../constants/models";

interface SettingsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    apiKey: string;
    setApiKey: (key: string) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isOpen,
    onClose,
    apiKey,
    setApiKey,
    selectedModel,
    setSelectedModel,
}) => {
    const [tempApiKey, setTempApiKey] = useState<string>(apiKey);
    const [tempModel, setTempModel] = useState<string>(selectedModel);

    const handleSave = () => {
        setApiKey(tempApiKey);
        setSelectedModel(tempModel);
        onClose();
    };

    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <List sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6">Settings</Typography>

                <ListItem>
                    <ListItemText primary="API Key" />
                </ListItem>
                <TextField
                    type="password"
                    fullWidth
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />

                <ListItem>
                    <ListItemText primary="Model" />
                </ListItem>
                <TextField
                    select
                    fullWidth
                    value={tempModel}
                    onChange={(e) => setTempModel(e.target.value)}
                    variant="outlined"
                    SelectProps={{ native: true }}
                    sx={{ mb: 2 }}
                >
                    {models.map(model => (
                        <option key={model.value} value={model.value}>{model.label}</option>
                    ))}
                </TextField>

                <Button variant="contained" color="primary" fullWidth onClick={handleSave} sx={{ mt: 1 }}>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" fullWidth onClick={onClose} sx={{ mt: 1 }}>
                    Cancel
                </Button>
            </List>
        </Drawer>
    );
};

export default SettingsDrawer;
