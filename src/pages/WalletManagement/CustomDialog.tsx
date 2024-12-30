import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components for customization
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme?.palette?.text?.primary || '#333',
    padding: theme?.spacing(3) || '24px',
    borderBottom: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme?.spacing(3) || '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme?.spacing(2) || '16px',
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme?.spacing(3) || '24px',
    justifyContent: 'center',
    borderTop: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
    padding: theme?.spacing(1.5, 3) || '12px 24px',
    borderRadius: '8px',
}));

const ConfirmButton = styled(StyledButton)(({ theme }) => ({
    backgroundColor: theme?.palette?.primary?.main || '#1976d2',
    color: '#fff',
    '&:hover': {
        backgroundColor: theme?.palette?.primary?.dark || '#1565c0',
    },
}));

const CancelButton = styled(StyledButton)(({ theme }) => ({
    backgroundColor: theme?.palette?.grey?.[300] || '#e0e0e0',
    color: '#333',
    '&:hover': {
        backgroundColor: theme?.palette?.grey?.[400] || '#bdbdbd',
    },
}));

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
        fontWeight: 'bold',
    },
});


interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    value: string;
    setValue: (value: string) => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
                                                       open,
                                                       onClose,
                                                       onConfirm,
                                                       title,
                                                       value,
                                                       setValue,
                                                   }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <StyledDialogTitle>{title}</StyledDialogTitle>
            <StyledDialogContent>
                <StyledTextField
                    label="Amount"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose}>Cancel</CancelButton>
                <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
            </StyledDialogActions>
        </Dialog>
    );
};

export default CustomDialog;
