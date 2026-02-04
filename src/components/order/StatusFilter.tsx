interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  showLabel?: boolean;
}

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'CREATED', label: 'Criado' },
  { value: 'CONFIRMED', label: 'Confirmado' },
  { value: 'PREPARING', label: 'Preparando' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'CANCELED', label: 'Cancelado' },
];

export function StatusFilter({ selectedStatus, onStatusChange, showLabel = true }: StatusFilterProps) {
  return (
    <div className="mb-6 md:mb-8 bg-white rounded-lg shadow p-4 md:p-6">
      {showLabel && (
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Filtrar por Status</h3>
      )}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
              selectedStatus === option.value
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } cursor-pointer whitespace-nowrap`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
