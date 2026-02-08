import { FormInputProps } from "@/types/FormInputProps"

const FormInput = ({ name, label, type, placeholder, required, defaultValue }: FormInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <input
                type={type || "text"}
                name={name}
                id={name}
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
    )
}

export default FormInput