/**
 * =====================================================================
 * CONFIGURAÇÃO GERAL DA MARCA ISÉLE
 * =====================================================================
 * 
 * Aqui ficam centralizadas as variáveis de contato, links sociais
 * e referências visuais da ISÉLE.
 * 
 * Para atualizar o número de WhatsApp ou link do Instagram, basta alterar
 * os valores abaixo:
 */

// =====================================================================
// 1. WHATSAPP (CANAL PRINCIPAL DE ATENDIMENTO E CONVERSÃO)
// =====================================================================
/**
 * IMPORTANTE: Substitua abaixo pelo número real de WhatsApp da ISÉLE.
 * Formato internacional: Código do País + DDD + Número (apenas números).
 * Exemplo para São Paulo: '5511999999999'
 */
export const WHATSAPP_NUMBER = '5511999999999';

/**
 * Mensagem padrão enviada ao iniciar o contato pelo site
 */
export const WHATSAPP_DEFAULT_MESSAGE = 'Olá! Conheci a ISÉLE pelo site e gostaria de conhecer as novidades.';

/**
 * Gera o link direto para abertura do WhatsApp Web / App
 */
export function getWhatsAppLink(customMessage?: string): string {
  const message = customMessage || WHATSAPP_DEFAULT_MESSAGE;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

// =====================================================================
// 2. INSTAGRAM
// =====================================================================
/**
 * IMPORTANTE: Substitua abaixo pelo link oficial do perfil do Instagram da ISÉLE.
 * Exemplo: 'https://instagram.com/isele' ou 'https://instagram.com/isele.oficial'
 */
export const INSTAGRAM_URL = 'https://instagram.com/isele.oficial';

/**
 * Handle/Nome de usuário exibido na interface
 */
export const INSTAGRAM_HANDLE = '@isele';

// =====================================================================
// 3. ESTRUTURA ORGANIZADA DE IMAGENS EDITORIAIS
// =====================================================================
/**
 * Todas as fotografias do site estão organizadas aqui.
 * Quando você tiver as fotos finais das roupas da ISÉLE, basta substituir
 * os caminhos de importação ou URLs neste arquivo.
 */
import heroImg from '../assets/images/isele_hero_campaign_1790396238828.jpg';
import campanhaImg from '../assets/images/isele_campanha_banner_1790396254448.jpg';
import casualImg from '../assets/images/isele_estilo_casual_1790396270596.jpg';
import femininoImg from '../assets/images/isele_estilo_feminino_1790396282277.jpg';
import blazerImg from '../assets/images/prod_oversized_blazer_1790394233349.jpg';
import slipDressImg from '../assets/images/prod_slip_dress_1790394260701.jpg';
import sienaDressImg from '../assets/images/prod_siena_dress_1790394223701.jpg';
import linenShirtImg from '../assets/images/prod_linen_shirt_1790394213434.jpg';
import wideLegImg from '../assets/images/prod_wide_leg_pant_1790394251008.jpg';
import tankImg from '../assets/images/prod_ribbed_tank_1790394242698.jpg';
import quietDressingImg from '../assets/images/editorial_quiet_dressing_1790394269977.jpg';
import linenMacroImg from '../assets/images/editorial_linen_macro_1790394278405.jpg';

// Female Mannequin Off-White Collection (100% Transparent Cutout PNGs)
import conjuntoVerdeImg from '../assets/images/isele_conjunto_verde_beige_1790400273641.jpg';
import vestidoPretoImg from '../assets/images/isele_vestido_preto_beige_1790400285870.jpg';
import corsetJeansImg from '../assets/images/isele_corset_jeans_beige_1790400297339.jpg';

export const SITE_IMAGES = {
  // Hero principal (Seção 01)
  hero: heroImg,

  // Manifesto editorial (Seção 02)
  manifestoMain: quietDressingImg,
  manifestoDetail: linenMacroImg,

  // 4 Pilares de Estilo (Seção 03)
  estilo: {
    casual: casualImg,
    contemporaneo: blazerImg,
    feminino: femininoImg,
    sofisticado: slipDressImg,
  },

  // Novidades / 3 Manequins Femininos em Off-White
  novidades: [
    {
      id: 'manequim-1',
      title: 'Conjunto Camisa & Shorts Verde',
      badge: 'NOVIDADE',
      image: conjuntoVerdeImg,
      subtitle: 'Camisa oversized clássica em algodão leve combinada com shorts verde mentol descontraído e moderno.',
      category: 'CONJUNTOS',
    },
    {
      id: 'manequim-2',
      title: 'Vestido Cocktail Renda Negra',
      badge: 'EM DESTAQUE',
      image: vestidoPretoImg,
      subtitle: 'Modelagem romântica com corpete em renda trabalhada e saia com babados em camadas de toque macio.',
      category: 'VESTIDOS',
    },
    {
      id: 'manequim-3',
      title: 'Corset & Jeans Cargo Prateado',
      badge: 'DA TEMPORADA',
      image: corsetJeansImg,
      subtitle: 'Corset estruturado com amarração frontal combinado com jeans cargo claro de detalhes prateados refinados.',
      category: 'LOOKS',
    },
  ],

  // Campanha Editorial Banner (Seção 05)
  campanhaBanner: campanhaImg,

  // Sobre a ISÉLE (Seção 06)
  sobre: sienaDressImg,

  // Feed Instagram 6 fotos (Seção 07)
  instagramFeed: [
    { id: 'insta-1', image: quietDressingImg, caption: 'Composição de tons quentes para dias leves.' },
    { id: 'insta-2', image: casualImg, caption: 'A sofisticação do corte descontraído.' },
    { id: 'insta-3', image: linenMacroImg, caption: 'Texturas que contam histórias.' },
    { id: 'insta-4', image: femininoImg, caption: 'A essência do movimento sutil.' },
    { id: 'insta-5', image: blazerImg, caption: 'Alfaiataria moderna para acompanhar sua rotina.' },
    { id: 'insta-6', image: slipDressImg, caption: 'Presença, delicadeza e personalidade.' },
  ],
};
