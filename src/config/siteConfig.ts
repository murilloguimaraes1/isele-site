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
 * Número oficial de WhatsApp da ISÉLE: +55 17 99120-3762
 */
export const WHATSAPP_NUMBER = '5517991203762';

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
 * Perfil oficial do Instagram da ISÉLE
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/iselemodafeminina/';

/**
 * Handle/Nome de usuário exibido na interface
 */
export const INSTAGRAM_HANDLE = '@iselemodafeminina';

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

// 3 Real Bag Photos
import realBolsaFranjasImg from '../assets/images/isele_bolsa_real_franjas.jpg';
import realBolsaRafiaCorrenteImg from '../assets/images/isele_bolsa_real_rafia_corrente.jpg';
import realBolsaRafiaFivelasImg from '../assets/images/isele_bolsa_real_rafia_fivelas.jpg';

// 4 Real Model Photos
import realCorsetPantalonaImg from '../assets/images/isele_look_real_corset_pantalona.jpg';
import realCorsetJeansImg from '../assets/images/isele_look_real_corset_jeans.jpg';
import realCamisaShortsImg from '../assets/images/isele_look_real_camisa_shorts.jpg';
import realVestidoFloralImg from '../assets/images/isele_look_real_vestido_floral.jpg';

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

  // Novidades / Coleção em Destaque (4 Fotos Reais da Coleção)
  novidades: [
    {
      id: 'look-real-1',
      title: 'Corset Noir & Pantalona Camel',
      badge: 'NOVIDADE',
      image: realCorsetPantalonaImg,
      subtitle: 'Corset tomara que caia em alfaiataria preta com amarração de ilhós frontal, combinado com calça pantalona solta tom camel e bolso lateral.',
      category: 'ALFAIATARIA NOIR',
    },
    {
      id: 'look-real-2',
      title: 'Corset Structé Off-White & Jeans Cargo Prata',
      badge: 'TENDÊNCIA',
      image: realCorsetJeansImg,
      subtitle: 'Corset ajustado tom off-white com amarração delicada, combinado com jeans cargo de caimento amplo e acabamento metalizado prateado.',
      category: 'LOOK CASUAL CHIC',
    },
    {
      id: 'look-real-3',
      title: 'Camisa Oversized Off-White & Shorts Verde Menta',
      badge: 'EM DESTAQUE',
      image: realCamisaShortsImg,
      subtitle: 'Camisa social oversized em tricoline pura com bolso frontal, sobreposta a shorts alfaiataria em tom verde menta de corte minimalista.',
      category: 'ESTILO CONTEMPORÂNEO',
    },
    {
      id: 'look-real-4',
      title: 'Vestido Longo Chiffon Floral Cut-Out',
      badge: 'EXCLUSIVO',
      image: realVestidoFloralImg,
      subtitle: 'Modelagem fluida em chiffon aquarelado pastel com busto torcido tomara que caia, recortes laterais cut-out e saia esvoaçante em camadas.',
      category: 'COLEÇÃO FESTA',
    },
  ],

  // 3 Bolsas Exclusivas da Coleção Real
  bolsas: [
    {
      id: 'bolsa-real-1',
      title: 'Bolsa Boho Franjas Couro Marrom',
      badge: 'LANÇAMENTO',
      image: realBolsaFranjasImg,
      subtitle: 'Design de ombro estruturado em couro nobre tom marrom café, fivela metálica prateada marcante e acabamento fluido em franjas inferiores.',
      category: 'ACESSÓRIOS NOBRE',
    },
    {
      id: 'bolsa-real-2',
      title: 'Bolsa Crossbody Ráfia & Corrente Dourada',
      badge: 'EXCLUSIVA',
      image: realBolsaRafiaCorrenteImg,
      subtitle: 'Trama artesanal trançada em ráfia natural, aba com fecho estruturado e alça longa entrelaçada em fita de couro com corrente dourada.',
      category: 'RÁFIA ARTESANAL',
    },
    {
      id: 'bolsa-real-3',
      title: 'Bolsa Tote Ráfia & Fivelas Duplas',
      badge: 'EM DESTAQUE',
      image: realBolsaRafiaFivelasImg,
      subtitle: 'Trama geométrica refinada em ráfia natural, alças duplas em couro marrom escuro com fivelas douradas utilitárias e alça tiracolo regulável.',
      category: 'UTILITÁRIO CHIC',
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
