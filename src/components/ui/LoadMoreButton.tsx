import { Button } from './Button';
import './LoadMoreButton.css';

interface LoadMoreButtonProps {
  isLoading: boolean;
  hasMore: boolean;
  onClick: () => void;
}

export const LoadMoreButton = ({ isLoading, hasMore, onClick }: LoadMoreButtonProps) => {
  if (!hasMore) return null;

  return (
    <div className="load-more-button">
      <Button variant="secondary" onClick={onClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};
