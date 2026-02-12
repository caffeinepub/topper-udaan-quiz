interface CreatorCreditProps {
  variant?: 'fixed' | 'inline';
}

export function CreatorCredit({ variant = 'fixed' }: CreatorCreditProps) {
  if (variant === 'inline') {
    return (
      <p className="text-sm font-medium text-gray-600">
        Created by SOUMYAJIT DUTTA
      </p>
    );
  }

  return null;
}
