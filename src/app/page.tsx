import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TranslatorCard from '@/components/TranslatorCard';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="pb-12">
          <TranslatorCard />
        </section>
      </main>
      <Footer />
    </div>
  );
}
