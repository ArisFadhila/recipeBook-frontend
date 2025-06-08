const Button = ({ children, className = '', ...props }) => (
  <button
    className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow transition duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const ButtonOutline = ({ children, className = '', ...props }) => (
  <button
    className={`border border-orange-500 text-orange-500 font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 hover:text-white transition duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
