import { twMerge } from 'tailwind-merge';

export default function Card({ children, className = '' }) {
  return (
    <div className={twMerge('bg-gray-800 text-white rounded-2xl shadow-xl', className)}>
      {children}
    </div>
  );
}

