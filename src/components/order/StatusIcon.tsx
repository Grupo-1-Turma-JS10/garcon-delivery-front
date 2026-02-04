import { CheckCircle, XCircle, Flame, Clock } from 'lucide-react';

interface StatusIconProps {
  status: string;
}

export function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case 'FINISHED':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'CANCELED':
      return <XCircle className="w-5 h-5 text-red-600" />;
    case 'PREPARING':
      return <Flame className="w-5 h-5 text-orange-600" />;
    case 'CONFIRMED':
    case 'CREATED':
      return <Clock className="w-5 h-5 text-yellow-600" />;
    default:
      return <Clock className="w-5 h-5 text-gray-600" />;
  }
}
