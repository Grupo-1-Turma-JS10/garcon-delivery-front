import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Github, 
  Instagram, 
  Target, 
  Eye, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

import pagelDevPhoto from '../../assets/images/team/pagel-dev.png';
import danielDevPhoto from '../../assets/images/team/daniel-dev.png';
import josyDevPhoto from '../../assets/images/team/josy-dev.png';
import michaelDevPhoto from '../../assets/images/team/michael-dev.png';
import marcosDevPhoto from '../../assets/images/team/marcos-dev.png';
import gabiDevPhoto from '../../assets/images/team/gabi-dev.png';
import juDevPhoto from '../../assets/images/team/ju-dev.png';

// Variantes aprimoradas para transições suaves entre sessões
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const teamMembers = [
  { id: 1, name: 'Eduardo Pagel', role: 'Full Stack Developer', photo: pagelDevPhoto, socials: { linkedin: 'https://www.linkedin.com/in/eduardo-pagel-827536127', github: 'https://github.com/eduardopagel140', instagram: 'https://www.instagram.com/eduardo_pagel' } },
  { id: 2, name: 'Daniel Sacramento', role: 'Full Stack Developer', photo: danielDevPhoto, socials: { linkedin: '#', github: 'https://github.com/Shidoshi93', instagram: '#' } },
  { id: 3, name: 'Joselaine Bechaire', role: 'Tester', photo: josyDevPhoto, socials: { linkedin: '#', github: 'https://github.com/JBechaire', instagram: '#' } },
  { id: 4, name: 'Michael Sales', role: 'Full Stack Developer', photo: michaelDevPhoto, socials: { linkedin: '#', github: 'https://github.com/michaelsf36', instagram: '#' } },
  { id: 5, name: 'Marcos Vinícius', role: 'P.O.', photo: marcosDevPhoto, socials: { linkedin: '#', github: 'https://github.com/Maxwell022', instagram: '#' } },
  { id: 6, name: 'Gabriela de Abreu', role: 'Full Stack Developer', photo: gabiDevPhoto, socials: { linkedin: '#', github: 'https://github.com/Gabriela-ALima', instagram: '#' } },
  { id: 7, name: 'Juliana Matsuda', role: 'Full Stack Developer', photo: juDevPhoto, socials: { linkedin: '#', github: 'https://github.com/Juyuria', instagram: '#' } },
];

export const AboutUsPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      
      {/* 1. Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-200/50"
      >
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1080" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Conexão e Tecnologia"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight"
          >
            Sobre <span className="text-orange-500 font-light italic">Nós</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-200 leading-relaxed font-light max-w-xl"
          >
            Nossa missão é conectar talentos e tecnologia para entregar a melhor experiência gastronômica da sua cidade.
          </motion.p>
        </div>
      </motion.section>

      {/* 2. História */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4"
      >
        <motion.div variants={fadeInUp} className="relative">
          <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Nossa Jornada</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Inovação em cada pedido</h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>O DeliveryApp nasceu para transformar a rotina das pessoas, unindo praticidade e sabor em uma plataforma intuitiva e rápida.</p>
            <p className="p-6 bg-orange-50 rounded-2xl border-l-4 border-orange-500 italic">
              "Valorizamos o comércio local, garantindo que cada restaurante parceiro tenha as ferramentas necessárias para crescer conosco."
            </p>
          </div>
        </motion.div>
        <motion.div 
          variants={fadeInUp}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500" />
          <motion.img 
            whileHover={{ scale: 1.02 }}
            src="https://images.unsplash.com/photo-1758518729685-f88df7890776?q=80&w=1080" 
            alt="Colaboração" 
            className="relative w-full h-[400px] object-cover rounded-[2.5rem] shadow-2xl z-10" 
          />
        </motion.div>
      </motion.section>

      {/* 3. Missão/Visão/Valores */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { icon: <Target />, title: "Missão", color: "bg-blue-50 text-blue-600", desc: "Democratizar a alta gastronomia através da tecnologia." },
          { icon: <Eye />, title: "Visão", color: "bg-purple-50 text-purple-600", desc: "Ser a maior e mais justa rede de entregas do país." },
          { icon: <ShieldCheck />, title: "Valores", color: "bg-green-50 text-green-600", desc: "Ética, transparência e valorização do ser humano." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            className="bg-gray-50 p-8 rounded-[2.5rem] border border-transparent hover:border-orange-100 transition-all cursor-default shadow-sm"
          >
            <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
              {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* 4. Equipe */}
      <section className="pt-8 px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900">Nossa Equipe</h2>
          <p className="text-orange-500 font-medium">As mentes brilhantes por trás da nossa plataforma.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-90 overflow-hidden relative">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 text-center">
                <h4 className="font-bold text-gray-900 text-xl mb-1">{member.name}</h4>
                <p className="text-orange-500 text-sm font-semibold mb-6 uppercase tracking-widest">{member.role}</p>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: <Linkedin size={18}/>, link: member.socials.linkedin, color: "hover:text-blue-600" },
                    { icon: <Github size={18}/>, link: member.socials.github, color: "hover:text-black" },
                    { icon: <Instagram size={18}/>, link: member.socials.instagram, color: "hover:text-pink-600" }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-gray-50 text-gray-400 ${social.color} transition-all hover:bg-white hover:shadow-md cursor-pointer`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Seção de Números */}
      <motion.section 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-900 rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden mx-4"
      >
        <div className="absolute -right-10 -top-10 w-80 h-80 bg-orange-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-orange-600 rounded-full blur-[120px] opacity-10" />
        
        <div className="relative z-10 mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projeções Futuras</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Nossa visão é ambiciosa. Os números abaixo representam as metas e projeções que estamos 
            trabalhando arduamente para atingir nos próximos anos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10 text-center">
          {[
            { n: "500+", l: "Parceiros" },
            { n: "50k+", l: "Usuários" },
            { n: "1M+", l: "Pedidos" },
            { n: "15+", l: "Cidades" }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl font-black text-orange-500 mb-2 tabular-nums tracking-tighter">{s.n}</div>
              <div className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-800 pt-12 relative z-10">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-3xl font-bold mb-2 text-white">Pronto para a revolução?</h3>
            <p className="text-gray-400">Junte-se a milhares de parceiros e mude sua forma de vender.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(249 115 22 / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold shadow-lg shadow-orange-500/20 flex items-center gap-3 cursor-pointer group"
          >
            Começar agora 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
};