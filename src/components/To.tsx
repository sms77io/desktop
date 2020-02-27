import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {useTranslation} from 'react-i18next';

export type ToProps = {
    onChange: (to: string) => void
    value: string
}

export const To = ({onChange, value}: ToProps) => {
    const {t} = useTranslation();

    const [to, setTo] = useState('');

    useEffect(() => setTo(value), [value]);

    const Input = <TextField
        fullWidth
        helperText={t('onePlusNumberContact')}
        label={t('onePlusRecipient')}
        name='to'
        onChange={e => onChange(e.target.value)}
        value={to}
    />;

    return Input;
};