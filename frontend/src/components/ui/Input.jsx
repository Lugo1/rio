import { twMerge } from 'tailwind-merge';

export default function Input({ label, type = 'text', className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}
      <input
        type={type}
        className={twMerge(
          'px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/5 transition',
          className
        )}
        {...props}
      />
    </div>
  );
}
