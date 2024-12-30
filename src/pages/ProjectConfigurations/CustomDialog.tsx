import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from '@mui/material';

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    fields: {
        label: string;
        value: string | number;
        type?: 'text' | 'number' | 'email';
        onChange: (value: string) => void;
    }[];
    confirmText?: string;
    cancelText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
                                                       open,
                                                       onClose,
                                                       onConfirm,
                                                       title,
                                                       fields,
                                                       confirmText = 'Confirm',
                                                       cancelText = 'Cancel',
                                                   }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {fields.map((field, index) => (
                    <TextField
                        key={index}
                        label={field.label}
                        type={field.type || 'text'}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
