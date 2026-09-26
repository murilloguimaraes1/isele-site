# ISÉLE — Moda Feminina & High Fashion

Website institucional e catálogo digital responsivo para a marca de moda feminina **ISÉLE**, desenvolvido com Vite, React, TypeScript e TailwindCSS.

---

## 🚀 Como Rodar o Projeto Localmente

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *O projeto estará disponível em `http://localhost:3000` (e em IP local para dispositivos móveis na mesma rede).*

3. **Gerar a versão de produção (Build):**
   ```bash
   npm run build
   ```

---

## ⚙️ Onde Editar os Dados da Marca e Produtos

Toda a configuração centralizada da marca, contatos e catálogo fica localizada no arquivo:
📂 **`src/config/siteConfig.ts`**

### Conteúdos editáveis em `siteConfig.ts`:
- **WhatsApp:** `WHATSAPP_NUMBER` (ex: `'5517991203762'`) e mensagem padrão `WHATSAPP_DEFAULT_MESSAGE`.
- **Instagram:** `INSTAGRAM_URL` e `INSTAGRAM_HANDLE`.
- **Coleção Novos Looks:** Array `novidades` (contém títulos, categorias, badges, imagens reais e descrições).
- **Coleção Bolsas & Acessórios:** Array `bolsas` (contém títulos, categorias, badges, imagens reais e descrições).
- **Imagens Editoriais:** Mapeamento de imports em `SITE_IMAGES`.

### Componentes Principais (UI):
- 📂 `src/components/NovidadesSection.tsx` — Carrossel duplo automático de Looks e Bolsas.
- 📂 `src/components/Header.tsx` — Navegação fixa e links de contato.
- 📂 `src/components/Footer.tsx` — Rodapé institucional.
- 📂 `src/components/LookModal.tsx` — Modal de detalhes dos looks.

---

## 📦 Deploy na Vercel

O projeto utiliza **Vite + React padrão** e a Vercel detecta a configuração automaticamente:
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

© 2026 ISÉLE. Todos os direitos reservados.
