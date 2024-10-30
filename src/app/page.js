import TimeZoneConverter from '../components/TimeZoneConverter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TimeZoneConverter />
    </main>
  );
}