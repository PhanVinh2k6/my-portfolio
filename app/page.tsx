"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import CircularText from '../components/CircularText';
import RotatingText from '../components/RotatingText';
import Particles from '../components/Particles';
import InteractiveMap from '../components/InteractiveMap';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<'loading' | 'lixi' | 'content'>('loading');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setStage('lixi'), 1800);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  if (!mounted) return <div className="bg-black h-screen w-full" />;

  const menuItems = [
    { id: 'home', label: 'Index' },
    { id: 'identity', label: 'Identity' },
    { id: 'lab', label: 'The Lab' },
    { id: 'project', label: 'Projects' },
    { id: 'engine', label: 'Engine' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <main className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-black text-white selection:bg-[#5227ff] snap-y snap-mandatory scroll-smooth font-sans">
      <Particles />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#5227ff] z-[400] origin-left" style={{ scaleX }} />

      {/* MENU BUTTON - Chuẩn UX UI */}
      {stage === 'content' && (
        <motion.button 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="fixed top-6 right-6 z-[350] w-12 h-12 md:w-16 md:h-16 bg-[#5227ff] rounded-full flex flex-col items-center justify-center gap-1 shadow-2xl border border-white/10"
        >
          <motion.div animate={isMenuOpen ? { rotate: 45, y: 5 } : {}} className="w-6 md:w-8 h-0.5 bg-white" />
          <motion.div animate={isMenuOpen ? { rotate: -45, y: -5 } : {}} className="w-6 md:w-8 h-0.5 bg-white" />
        </motion.button>
      )}

      <AnimatePresence mode='wait'>
        {stage === 'loading' && (
          <motion.div key="loader" exit={{ opacity: 0, filter: "blur(20px)" }} className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black">
            <CircularText text="PHAN VINH • PORTFOLIO • 2026 • " radius={100} className="text-white font-black text-3xl md:text-5xl" />
            <p className="mt-12 text-[10px] tracking-[1em] uppercase text-[#5227ff] animate-pulse font-bold">Initializing System...</p>
          </motion.div>
        )}

        {stage === 'lixi' && (
          <motion.div key="lixi" exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[900] flex items-center justify-center bg-black/70 backdrop-blur-3xl p-6">
             <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl">
              <h2 className="text-xl font-black italic mb-6 uppercase text-[#5227ff]">🧧 Lì Xì Đầu Xuân</h2>
              <div className="aspect-square w-full bg-white my-6 rounded-2xl overflow-hidden p-2 border border-[#5227ff]/10">
                <img src="/QR.jpg" alt="QR" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setStage('content')} className="w-full py-4 bg-[#5227ff] text-white font-black rounded-xl uppercase text-xs shadow-lg">Enter Experience</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={stage === 'content' ? "block" : "hidden"}>
        
        {/* SLIDE 1: HERO - DỨT ĐIỂM LỆCH HÀNG */}
        <section id="home" className="h-screen w-full flex flex-col items-center justify-center snap-start relative px-6">
          <div className="absolute top-10 left-8 md:left-12 opacity-30 text-center md:text-left">
            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2">Thai Nguyen • {time}</p>
          </div>
          <div className="text-center w-full max-w-6xl">
            <motion.h1 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-5xl md:text-9xl font-black italic uppercase leading-none tracking-tighter mb-10">
              Phan Vinh
            </motion.h1>
            
            {/* CĂN CHỈNH TUYỆT ĐỐI: Dùng items-baseline và text-size đồng nhất */}
            <div className="flex items-baseline justify-center gap-x-2 md:gap-x-3 h-auto">
              <span className="text-gray-500 text-[11px] md:text-lg font-bold uppercase tracking-widest whitespace-nowrap leading-none">
                I am a
              </span>
              <RotatingText 
                texts={['IT Student @ICTU', 'Web Developer', 'AI Researcher']} 
                mainClassName="text-[#5227ff] font-bold text-[11px] md:text-lg uppercase tracking-widest leading-none"
              />
            </div>
          </div>
        </section>

        {/* SLIDE 2: IDENTITY - TERMINAL VIBE */}
        <section id="identity" className="h-screen w-full flex items-center justify-center snap-start px-6">
           <div className="max-w-4xl w-full bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="bg-white/5 px-6 py-3 flex justify-between items-center border-b border-white/5 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                 <span>Spjrk_Identity_v2.06</span>
                 <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/20"/></div>
              </div>
              <div className="p-8 md:p-16 font-mono text-xs md:text-base space-y-8">
                 <p className="text-green-400 leading-relaxed"><span className="text-gray-600">➜</span> ~ status</p>
                 <p className="text-gray-300 leading-relaxed italic">
                    Phan Ha Thai Vinh. Sinh viên năm 2 ngành Công nghệ Thông tin tại Thái Nguyên (ICTU).
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 opacity-80">
                    <div><p className="text-gray-600 uppercase text-[9px] mb-1">Academic</p><p>ICTU University</p></div>
                    <div><p className="text-gray-600 uppercase text-[9px] mb-1">Focus</p><p>System Analysis & Design</p></div>
                 </div>
              </div>
           </div>
        </section>

        {/* SLIDE 3: THE LAB - INTERACTIVE HUB */}
        <section id="lab" className="h-screen w-full relative bg-[#030303] snap-start overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-[#5227ff]/10 blur-[130px] rounded-full pointer-events-none" />
           <div className="absolute inset-0 z-0"><InteractiveMap /></div>
           <div className="absolute bottom-12 left-8 md:bottom-20 md:left-20 z-20 pointer-events-none">
              <h3 className="text-[#5227ff] font-black uppercase text-[10px] tracking-[0.6em] mb-2">Experimental</h3>
              <h4 className="text-3xl md:text-6xl font-black uppercase italic opacity-90 leading-none tracking-tighter">Identity Node.</h4>
              <p className="mt-4 text-[8px] text-gray-500 uppercase font-bold tracking-[0.4em]">Interactive 3D Sphere</p>
           </div>
        </section>

        {/* SLIDE 4: PROJECTS - GRID UX */}
        <section id="project" className="h-screen w-full flex items-center justify-center snap-start px-6 bg-black">
           <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div className="p-10 rounded-[3rem] border border-white/5 bg-[#0a0a0a] hover:border-[#5227ff]/20 transition-all group">
                 <h4 className="text-2xl md:text-4xl font-black italic uppercase mb-4 tracking-tighter">Victory Football</h4>
                 <p className="text-gray-500 text-sm leading-relaxed border-l border-[#5227ff] pl-5 uppercase tracking-widest text-[10px]">Pitch management system</p>
              </div>
              <div className="p-10 rounded-[3rem] border border-white/5 bg-[#0a0a0a] hover:border-[#5227ff]/20 transition-all group">
                 <h4 className="text-2xl md:text-4xl font-black italic uppercase mb-4 tracking-tighter">CRM AI Research</h4>
                 <p className="text-gray-500 text-sm leading-relaxed border-l border-[#5227ff] pl-5 uppercase tracking-widest text-[10px]">Vietnam Post Integration</p>
              </div>
           </div>
        </section>

        {/* SLIDE 5: ENGINE - TECH MARQUEE */}
        <section id="engine" className="h-screen w-full flex flex-col items-center justify-center snap-start bg-[#050505] overflow-hidden">
           <h3 className="text-[#5227ff] font-black uppercase text-[10px] tracking-[0.8em] mb-24 opacity-40">Core Stack Engine</h3>
           <div className="w-full rotate-[-4deg] scale-110">
              <div className="flex whitespace-nowrap animate-marquee border-y border-white/5 py-12 md:py-20">
                 {[1,2,3].map((i) => (
                    <div key={i} className="flex gap-24 md:gap-40 px-12 items-center">
                       {['NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'FRAMER', 'PYTHON', 'AI RESEARCH', 'SQL'].map((t) => (
                          <span key={t} className="text-5xl md:text-9xl font-black italic uppercase opacity-10 hover:opacity-100 hover:text-[#5227ff] transition-all cursor-default">{t}</span>
                       ))}
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SLIDE 6: CONTACT - MINIMALIST */}
        <footer id="contact" className="h-screen w-full flex flex-col justify-center snap-start px-6 bg-black relative">
          <div className="max-w-4xl mx-auto w-full text-center space-y-16">
            <div className="space-y-4">
               <h3 className="text-[#5227ff] font-black uppercase text-[11px] tracking-[0.6em]">Reach Out</h3>
               <h3 className="text-5xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">Contact.</h3>
            </div>
            
            <div className="flex justify-center gap-12 md:gap-20">
              <a href="https://www.facebook.com/vinhvuive.ahihi" target="_blank" className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#5227ff] hover:border-[#5227ff] transition-all"><svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="https://github.com/PhanVinh2k6" target="_blank" className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"><svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
            </div>
            
            <p className="text-[7px] md:text-[9px] font-black uppercase opacity-20 tracking-[0.5em] pt-24">
               © 2026 PHANVINH.ID.VN • SECURED CONNECTION
            </p>
          </div>
        </footer>
      </div>

      {/* OVERLAY MENU - OPTIMIZED GRID */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[330] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-24 text-center md:text-left max-w-5xl w-full px-6">
              {menuItems.map((item, i) => (
                <motion.a 
                  key={item.id} href={`#${item.id}`} 
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="text-4xl md:text-8xl font-black hover:text-[#5227ff] transition-all uppercase italic tracking-tighter leading-none" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-[#5227ff] text-xs mr-4 not-italic font-mono">0{i+1}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-marquee { display: flex; animation: marquee 20s linear infinite; }
      `}</style>
    </main>
  );
}