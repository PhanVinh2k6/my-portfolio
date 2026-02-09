"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CircularText from '../components/CircularText';
import RotatingText from '../components/RotatingText';
import Squares from '../components/Squares';
import InteractiveMap from '../components/InteractiveMap';

export default function Home() {
  const [stage, setStage] = useState<'loading' | 'lixi' | 'content'>('loading');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setStage('lixi'), 2500); 
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const sections = ['home', 'about', 'projects', 'lab', 'contact'];

  return (
    <main className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-black font-sans text-white selection:bg-[#5227ff] scroll-smooth snap-y snap-mandatory">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Squares direction="diagonal" speed={0.4} squareSize={40} borderColor="#333" />
      </div>

      {stage === 'content' && (
        <motion.button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`fixed top-8 right-6 md:top-12 md:right-12 z-[150] flex items-center justify-center gap-2 w-[115px] h-[48px] border rounded-full transition-all duration-500 text-[11px] font-black uppercase tracking-widest ${isMenuOpen ? 'bg-white text-black border-white' : 'bg-black/50 backdrop-blur-md border-white/10'}`}
        >
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          <div className={`h-[2px] bg-current transition-all ${isMenuOpen ? 'w-5 absolute rotate-45' : 'w-5 mb-1.5'}`} />
        </motion.button>
      )}

      <AnimatePresence mode='wait'>
        {stage === 'loading' && (
          <motion.div key="loader" exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
            <CircularText text="PHAN VINH • PORTFOLIO • 2026 • " radius={80} spinDuration={12} className="text-white text-xl" />
          </motion.div>
        )}

        {stage === 'lixi' && (
          <motion.div key="lixi" exit={{ opacity: 0, scale: 2 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
             <div className="bg-[#0a0a0a] border border-[#5227ff] p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_80px_rgba(82,39,255,0.4)]">
              <h2 className="text-2xl font-black italic mb-2 uppercase">Lì Xì Đầu Năm</h2>
              <div className="aspect-square w-full bg-white my-6 rounded-2xl flex items-center justify-center">
                <img src="/QR.jpg" alt="QR" className="w-full h-full object-cover p-2" />
              </div>
              <button onClick={() => setStage('content')} className="w-full py-4 bg-[#5227ff] text-white font-black rounded-xl uppercase shadow-lg">Khám Phá Ngay ➔</button>
            </div>
          </motion.div>
        )}

        {stage === 'content' && (
          <div className="relative z-10 w-full">
            <section id="home" className="h-screen w-full flex flex-col items-center justify-center snap-start relative">
              <div className="absolute top-10 left-10 hidden md:block opacity-40">
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Thai Nguyen, VN</p>
                <p className="text-2xl font-mono">{time}</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">Phan Vinh</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">I am a</span>
                <RotatingText texts={['Creative Developer', 'Tech Enthusiast', 'Web Builder']} mainClassName="text-[#5227ff] font-black text-[10px] uppercase tracking-[0.3em]" />
              </div>
            </section>

            <section id="about" className="h-screen w-full flex items-center justify-center snap-start px-6">
              <div className="max-w-4xl w-full bg-[#111] border border-[#222] rounded-[3rem] p-10">
                <h3 className="text-xl font-black italic uppercase text-[#5227ff] mb-8">About Me</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">Sống tại Thái Nguyên, mình là Vinh — sinh viên IT ICTU đam mê sản phẩm số thực tế.</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {['Next.js', 'TS', 'Tailwind', 'Motion', 'Canvas'].map(t => <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-[#5227ff]">{t}</span>)}
                </div>
              </div>
            </section>

            <section id="projects" className="h-screen w-full flex items-center justify-center snap-start px-6">
              <div className="max-w-5xl w-full bg-[#111] border border-[#222] rounded-[3rem] p-10 shadow-2xl">
                 <h3 className="text-xl font-black italic uppercase text-[#5227ff] mb-12">Projects</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="border-t border-white/5 pt-8">
                       <h5 className="text-2xl font-black uppercase leading-none">Victory Football</h5>
                       <p className="text-gray-500 text-sm mt-3">Quản lý sân bóng mini ICTU.</p>
                    </div>
                    <div className="border-t border-white/5 pt-8">
                       <h5 className="text-2xl font-black uppercase leading-none">Personal Brand</h5>
                       <p className="text-gray-500 text-sm mt-3">Thương hiệu cá nhân 2026.</p>
                    </div>
                 </div>
              </div>
            </section>

            <section id="lab" className="h-screen w-full flex items-center justify-center snap-start relative overflow-hidden">
               <div className="absolute inset-0 z-0"><InteractiveMap /></div>
               <div className="absolute top-12 left-8 md:top-20 md:left-20 z-20 pointer-events-none">
                  <h3 className="text-xl font-black italic uppercase text-[#5227ff] mb-2">The Lab</h3>
                  <h4 className="text-2xl md:text-4xl font-black uppercase italic opacity-80">Digital Presence Map</h4>
               </div>
            </section>

            <section id="contact" className="h-screen w-full flex flex-col justify-center snap-start px-6">
              <div className="max-w-4xl mx-auto w-full bg-[#111] border border-[#222] rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-black italic uppercase text-[#5227ff] mb-6">Connect</h3>
                  <h3 className="text-4xl md:text-5xl font-black italic uppercase leading-none">Let's build <br/> together.</h3>
                </div>
                <div className="flex gap-6 mt-10 md:mt-0">
                  <a href="https://www.facebook.com/vinhvuive.ahihi" target="_blank" className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-all"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                  <a href="https://github.com/PhanVinh2k6" target="_blank" className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#24292F] transition-all"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", damping: 28 }} className="fixed inset-0 z-[140] bg-black/98 backdrop-blur-3xl flex items-center justify-center text-center">
            <div className="flex flex-col gap-10">
              {sections.map((item, i) => (
                <motion.a key={item} href={`#${item}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-4xl md:text-7xl font-black hover:italic hover:text-[#5227ff] transition-all uppercase tracking-tighter" onClick={() => setIsMenuOpen(false)}>{item}</motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </main>
  );
}