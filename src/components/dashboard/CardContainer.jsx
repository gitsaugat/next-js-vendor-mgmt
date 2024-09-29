export default function CardContainer({ header, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="px-4 py-3 sm:px-6 bg-blue-100">{header}</div>
      <div className="px-4 py-3 sm:p-6">{children}</div>
    </div>
  );
}
