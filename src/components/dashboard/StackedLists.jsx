export default function StackedList({ data }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((d) => (
        <li
          key={d.title}
          className="relative flex justify-between gap-x-6 py-5"
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a href="#">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {d.title}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{d.value}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
