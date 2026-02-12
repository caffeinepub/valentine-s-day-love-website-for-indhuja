import { useInView } from '../../hooks/useInView';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInSection({ children, className = '' }: FadeInSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}
