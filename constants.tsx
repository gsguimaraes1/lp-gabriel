import React from 'react';
import {
  LineChart,
  Code,
  Atom,
  Server,
  LayoutPanelLeft,
  Lightbulb,
  Workflow,
  Sparkles,
} from 'lucide-react';

export const SERVICES = [
  {
    title: "Escala com Performance Pura",
    description: "Operações de tráfego focadas em lucro líquido. Atuamos em Google, Meta e LinkedIn Ads com estratégias de escala vertical e horizontal validadas.",
    icon: <LineChart className="h-8 w-8 text-[#FCBE26]" />,
  },
  {
    title: "Business Intelligence & Dados",
    description: "Dashboards em tempo real para controle total do seu CAC, LTV e ROAS. Chega de relatórios estáticos que não geram decisões financeiras.",
    icon: <Lightbulb className="h-8 w-8 text-[#FCBE26]" />,
  },
  {
    title: "CRM & Automação de Vendas",
    description: "Rastreamos seu lead do clique até a conversão final. Entrega automatizada de dados para o time comercial agir em segundos.",
    icon: <Workflow className="h-8 w-8 text-[#FCBE26]" />,
  },
];

export const TECH_STACK_LOGOS = [
  {
    name: "Google Ads",
    icon: <img src="/assets/google.webp" className="h-10 w-10 object-contain" alt="Google Ads" />,
    description: "Captura de intenção de compra imediata com foco em fundo de funil."
  },
  {
    name: "Meta Ads",
    icon: <img src="/assets/meta.webp" className="h-10 w-10 object-contain" alt="Meta Ads" />,
    description: "Geração de demanda e autoridade através de segmentação avançada."
  },
  {
    name: "GA4",
    icon: <img src="/assets/analytics.webp" className="h-10 w-10 object-contain" alt="GA4" />,
    description: "Mensuração precisa da jornada para decisões baseadas em ROI."
  },
  {
    name: "n8n",
    icon: <img src="/assets/n8n.webp" className="h-10 w-10 object-contain rounded-sm" alt="n8n" />,
    description: "Automação de processos e integração profunda entre sistemas."
  },
  {
    name: "Power BI",
    icon: <img src="/assets/powerbi.webp" className="h-10 w-10 object-contain" alt="Power BI" />,
    description: "Visualização de KPIs para clareza total sobre o crescimento."
  },
  {
    name: "GTM",
    icon: <img src="/assets/gtm.webp" className="h-10 w-10 object-contain" alt="GTM" />,
    description: "Gestão centralizada de scripts e rastreamento avançado sem depender de TI."
  },
];