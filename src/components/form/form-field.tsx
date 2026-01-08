import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea';

interface FormFieldProps {
    label: string;
    name: string;
    id: string;
    placeholder?: string;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string[];
    helperText?: string;
    textarea?: boolean;
}

export default function FormField({
    label,
    name,
    id,
    placeholder,
    required,
    onChange,
    error,
    helperText,
    textarea
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label
                htmlFor={id}
            >{label}</Label>
            {textarea ? (
                <Textarea
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className="border border-violet-400"
                    required={required}
                    onChange={onChange} 
                />
            ) :
                (
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        className="border border-violet-400"
                        required={required}
                        onChange={onChange}
                    />
                )
            }

            {helperText && <p className='text-sx text-muted-foreground'>{helperText}</p>}
            {error && <p className='text-sm text-destructive'>{error.join(",")}</p>}
        </div>
    )
}
