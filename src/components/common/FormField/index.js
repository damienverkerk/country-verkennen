import React from 'react';
import Input from '../../common/Input';
import '../../../styles/formField.css';

function FormField({ label, type = "text", value, onChange, ...props }) {
    return (
        <div className="form-field">
            <label>
                {label}
                <Input type={type} value={value} onChange={onChange} {...props} />
            </label>
        </div>
    );
}

export default FormField;
