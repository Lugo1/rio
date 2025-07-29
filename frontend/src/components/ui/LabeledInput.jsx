export default function LabeledInput({
  id,
  label,
  type = 'text',
  placeholder = '',
  icon: Icon,
  value,
  onChange,
  required = false,
  inputClassName = '',      // 🔹 para personalizar el input si se desea
  containerClassName = '',  // 🔹 para personalizar el contenedor si se desea
  iconClassName = 'text-black', // <- por defecto negro
}) {
  return (
    <div className={`w-full mb-4 ${containerClassName}`}>
      <label htmlFor={id} className="block text-lg font-semibold mb-1 text-white">
        {label}
      </label>
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
        {Icon && <Icon className={`w-6 h-6 ${iconClassName}`} />}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`flex-1 bg-transparent outline-none text-xl text-white px-4 py-3 ${inputClassName}`}
        />
      </div>
    </div>
  );
}
