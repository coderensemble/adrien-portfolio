import { SideNavbar } from '../components/navigation';
import Start from '../components/start';
export default function HomePage() {
  return (
    <>
    <div>
      <section id="home" className="min-h-screen p-8">
        
        {/* contenu */}
        <Start/>
      </section>

      <section id="works" className="min-h-screen p-8 pl-20">
        {/* contenu */}
      </section>

      <section id="about" className="min-h-screen p-8">
        {/* contenu */}
      </section>

      <section id="contact" className="min-h-screen p-8">
        {/* contenu */}
      </section>
      </div>
      <SideNavbar/>
    </>
  );
}
