import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography } from "@mui/material";
import { models } from "../../constants/models";

interface SettingsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isOpen,
    onClose,
    selectedModel,
    setSelectedModel,
}) => {
    const [tempModel, setTempModel] = useState<string>(selectedModel);

    const handleSave = () => {
        setSelectedModel(tempModel);
        onClose();
    };

    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <List sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6">Settings</Typography>

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
