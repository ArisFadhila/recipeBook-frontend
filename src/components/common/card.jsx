export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="text-gray-700 text-base leading-relaxed">{children}</div>
);
export const CardHeader = ({ title, subtitle }) => (
  <div className="mb-4">
    <h3 className="text-xl font-semibold text-orange-600">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500 italic">{subtitle}</p>}
  </div>
);
