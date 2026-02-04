

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FINISHED':
        return 'bg-green-100 text-green-800';
      case 'CANCELED':
        return 'bg-red-100 text-red-800';
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800';
      case 'CONFIRMED':
      case 'CREATED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

    const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'CREATED': 'Criado',
      'CONFIRMED': 'Confirmado',
      'PREPARING': 'Preparando',
      'FINISHED': 'Entregue',
      'CANCELED': 'Cancelado'
    };
    return labels[status] || status;
  };

export { getStatusColor, getStatusLabel };