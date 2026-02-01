import { Shield, Phone, Mail, Clock, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="container mx-auto px-6 py-7 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="h-8 w-8 text-white" />
            <span className="text-3xl font-bold">GarçomDelivery</span>
          </div>
          <p className="text-sm text-white leading-relaxed" style={{ textAlign: "justify" }}>
            Quando a fome aperta, a gente entrega.
          </p>
          <p className="text-sm text-white leading-relaxed" style={{ textAlign: "justify" }}>
            Com o GarçomDelivery, você tem acesso aos melhores restaurantes da cidade,
            direto na sua casa.
          </p>

        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Links Rápidos</h3>
          <ul className="space-y-2 text-sm text-white">
            <Link to="/"><li className="hover:text-white cursor-pointer">Home</li></Link>
            <Link to="/about"><li className="hover:text-white cursor-pointer">Sobre Nós</li></Link>
            <Link to="/services"><li className="hover:text-white cursor-pointer">Serviços</li></Link>
            <Link to="/contact"><li className="hover:text-white cursor-pointer">Contato</li></Link>
            <Link to="/privacy"><li className="hover:text-white cursor-pointer">Política de Privacidade</li></Link>

          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contato</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-white" />
              <span>(51) 4004-3030</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-white" />
              <span>contato@garcomdelivery.com.br</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Clock className="h-4 w-4 text-white mt-1" />
              <span>24hs</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white py-4 text-center text-sm text-white">
        &copy; 2026 GarçomDelivery. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;  