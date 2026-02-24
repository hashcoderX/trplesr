import Container from '@/components/Container';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10">
      <Container>{children}</Container>
    </div>
  );
}
