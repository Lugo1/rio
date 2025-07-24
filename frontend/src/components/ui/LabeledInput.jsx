// src/components/ui/LabeledInput.jsx
export default function LabeledInput({
  id,
  label,
  type = 'text',
  placeholder = '',
  icon: Icon,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="w-full mb-4">
      <label htmlFor={id} className="block text-sm font-semibold mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="bg-transparent outline-none text-sm w-full text-white placeholder:text-gray-500"
        />
      </div>
    </div>
  );
}
