export const Input = ({ label, ...props }) => (
  <label className="block mb-3">
    {label && <span className="block mb-1 font-semibold text-gray-700">{label}</span>}
    <input
      className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      {...props}
    />
  </label>
);
export const Textarea = ({ label, ...props }) => (
  <label className="block mb-3">
    {label && <span className="block mb-1 font-semibold text-gray-700">{label}</span>}
    <textarea
      className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      rows="4"
      {...props}
    />
  </label>
);
export const Select = ({ label, options, ...props }) => (
  <label className="block mb-3">
    {label && <span className="block mb-1 font-semibold text-gray-700">{label}</span>}
    <select
      className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
export const FileInput = ({ label, ...props }) => (
  <label className="block mb-3">
    {label && <span className="block mb-1 font-semibold text-gray-700">{label}</span>}
    <input
      type="file"
      className="w-full"
      {...props}
    />
  </label>
);