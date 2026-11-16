export interface Competency {
  code: string;
  title: string;
  subskills: string[];
}

export interface TCSRealisation {
  id: string;
  category: "school" | "company1" | "company2";
  period: string;
  title: string;
  context: string;
  competencies: string[]; // codes from B1.1 to B1.6
  deliverable?: string;
}

export interface ProjectItem {
  id: string;
  type: "infrastructure" | "procedure";
  title: string;
  subtitle: string;
  tags: string[];
  environment: string[];
  summary: string;
  architecture?: {
    vlans?: { id: string; name: string; subnet: string; gateway: string }[];
    services?: string[];
    topologySummary: string;
  };
  steps: {
    stepNumber: string;
    title: string;
    description: string;
    commandOrConfig?: string;
  }[];
  results: string[];
  competencies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  status: "Obtenue" | "En cours";
  scoreOrBadge: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
}

export interface VeilleArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  category: "Souveraineté & État" | "Active Directory sous Linux" | "Alternative Open Source";
  impactLevel: "Critique" | "Majeur" | "Informatif";
  summary: string;
  takeawaySISR: string;
  url: string;
}

export const PORTFOLIO_OWNER = {
  fullName: "Matteo Servanty",
  role: "Technicien Systèmes, Réseaux & Support en Alternance",
  diploma: "BTS SIO — Option SISR (Solutions d'Infrastructure, Systèmes et Réseaux)",
  session: "M2S Formation Vitrolles • Promotion 2024 - 2026",
  location: "13700 Marignane • Permis B",
  phone: "07 57 87 80 37",
  email: "Servantymatteo@gmail.com",
  github: "https://github.com/servantymatteo",
  linkedin: "https://linkedin.com/",
  statusBadge: "Alternant Mairie de Septèmes-les-Vallons • M2S Formation Vitrolles",
  bio: "Étudiant de 19 ans en BTS SIO option SISR chez M2S Formation à Vitrolles (après un Bac Pro Système Numérique Mention Bien au Lycée Pierre Mendès France et une année à l'ESGI Aix-en-Provence), je suis actuellement en alternance au service informatique de la Mairie de Septèmes-les-Vallons où j'interviens sur le support de tous les niveaux, les réseaux, le hardware et la virtualisation.",
};

export const BTS_SIO_DATA = {
  intro:
    "Le Brevet de Technicien Supérieur aux Services Informatiques aux Organisations (BTS SIO) forme en deux ans des spécialistes capables de gérer le parc informatique d'une entreprise, de sécuriser ses infrastructures ou de développer ses applications métiers.",
  options: [
    {
      code: "SISR",
      isSelected: true,
      name: "Solutions d'Infrastructure, Systèmes et Réseaux",
      badge: "Mon Option (Spécialité)",
      description:
        "L'option SISR forme des professionnels de la conception, du déploiement, de l'administration et de la sécurisation des réseaux et des équipements informatiques (serveurs, routeurs, pare-feux, hyperviseurs).",
      modules: [
        "Administration Windows Server (AD DS, DNS, DHCP, GPO) & Linux (Debian, Rocky)",
        "Architecture Réseau (VLAN, Routage inter-VLAN, OSPF, Spanning-Tree, LACP)",
        "Sécurité périmétrique & VPN (pfSense, OPNsense, Fortinet, WireGuard, IPsec)",
        "Virtualisation & Haute Disponibilité (Proxmox VE, Ceph, VMware vSphere, Docker)",
        "Supervision, Sauvegarde & Ticketing (Zabbix, Prometheus/Grafana, Veeam, GLPI)",
      ],
      careers: [
        "Administrateur Systèmes et Réseaux",
        "Technicien d'Infrastructure & Sécurité",
        "Ingénieur Cloud / Virtualisation (poursuite d'études)",
        "Analyste SOC / Administrateur Cybersécurité",
      ],
    },
    {
      code: "SLAM",
      isSelected: false,
      name: "Solutions Logicielles et Applications Métiers",
      badge: "Seconde Option du BTS",
      description:
        "L'option SLAM est orientée vers la conception, le développement, la maintenance et la sécurisation de programmes applicatifs, d'API et de bases de données pour répondre aux besoins des utilisateurs.",
      modules: [
        "Développement Web & Mobile (TypeScript, React, Next.js, PHP/Symfony, C#)",
        "Conception & Administration de Bases de Données (PostgreSQL, MariaDB, Merise, UML)",
        "Cybersécurité applicative (OWASP Top 10, Tests unitaires, CI/CD GitLab)",
        "Gestion de version et méthodologies Agiles (Git, Scrum)",
      ],
      careers: [
        "Développeur Full-Stack / Applicatif",
        "Concepteur de bases de données",
        "Analyste Programmeur",
        "Intégrateur DevOps",
      ],
    },
  ],
};

export const ABOUT_DATA = {
  timeline: [
    {
      year: "Août 2025 — Août 2026",
      title: "Alternance — Support Informatique, Systèmes & Réseaux",
      institution: "Mairie de Septèmes-les-Vallons",
      description:
        "Support utilisateurs de tous les niveaux (Mairie, services municipaux et écoles via GLPI), gestion et maintenance du parc hardware (SSD, RAM, imprimantes, TBI, masterisation Windows 10/11), mise en réseau et sécurité (Switchs managés, VLANs, brassage baie, Wi-Fi municipal, Active Directory) et virtualisation (Proxmox VE / VMware / Hyper-V).",
      tags: ["Support Tous Niveaux", "GLPI", "Réseaux & VLAN", "Hardware & TBI", "Proxmox / AD"],
    },
    {
      year: "En cours (BTS SIO)",
      title: "BTS SIO en Alternance — Option SISR",
      institution: "M2S Formation — Vitrolles",
      description:
        "Spécialisation Solutions d'Infrastructure, Systèmes et Réseaux : conception d'infrastructures WAN/LAN, isolation multi-promo sous Proxmox VE, pare-feu pfSense, configuration VLAN sur Switch Planet et administration Windows Server / Linux.",
      tags: ["M2S Formation Vitrolles", "Proxmox VE", "pfSense", "Switch Planet", "SISR"],
    },
    {
      year: "2024",
      title: "Bachelor Chef de Projet Logiciel et Réseau",
      institution: "ESGI — Aix-en-Provence",
      description:
        "Approfondissement des fondamentaux en architecture réseau, systèmes et gestion de projets informatiques.",
      tags: ["ESGI Aix-en-Provence", "Réseau", "Systèmes", "Gestion de projet"],
    },
    {
      year: "Oct. 2023 — Févr. 2024",
      title: "Alternance — Web Master (Full Remote)",
      institution: "Qirios",
      description:
        "Développement de sites annuaires en React.js / Tailwind CSS, création de sites WordPress pour des clients et optimisation du référencement SEO.",
      tags: ["React.js", "Tailwind CSS", "WordPress", "SEO"],
    },
    {
      year: "2020 — 2024",
      title: "Bac Pro Système Numérique — Mention Bien",
      institution: "Lycée Pierre Mendès France — Vitrolles",
      description:
        "Obtention du Baccalauréat Professionnel Systèmes Numériques avec Mention Bien. Stages techniques chez CSE Air France (Aéroport Marignane, nov. 2022) et Docteur Ordinateur (Châteauneuf-les-Martigues, juil. 2021 : optimisation BIOS/drivers, nettoyage disques et hardware).",
      tags: ["Mention Bien", "Systèmes Numériques", "CSE Air France", "Docteur Ordinateur"],
    },
  ],
  skillGroups: [
    {
      category: "Réseaux, Pare-feu & Sécurité",
      skills: [
        { name: "Switching VLAN (Switch Planet, Cisco IOS), Brassage baie & Wi-Fi", level: 92 },
        { name: "Pare-feu pfSense (WAN/LAN, NAT, Filtrage inter-VLAN)", level: 88 },
        { name: "Fondamentaux Cybersécurité (TryHackMe Pre Security & CCNA 1)", level: 86 },
        { name: "Diagnostic réseau TCP/IP, DHCP, DNS & câblage multi-sites", level: 90 },
      ],
    },
    {
      category: "Systèmes, Virtualisation & AD",
      skills: [
        { name: "Proxmox VE (Isolation Multi-Promo, VMs, Bridges vmbr) & Hyper-V / VMware", level: 92 },
        { name: "Windows Server & Active Directory (Comptes, GPO, Partages, DNS)", level: 88 },
        { name: "Linux (Debian / Ubuntu) & Alternatives Open Source (Samba AD)", level: 84 },
        { name: "Déploiement & Masterisation de postes Windows 10 / Windows 11", level: 94 },
      ],
    },
    {
      category: "Support Tous Niveaux, Parc & Hardware",
      skills: [
        { name: "Support technique HelpDesk N1 / N2 / N3 & Relation utilisateurs", level: 96 },
        { name: "Diagnostic & Maintenance Hardware (SSD, RAM, BIOS/Drivers, TBI écoles)", level: 95 },
        { name: "Gestion de parc & Ticketing (GLPI, inventaire matériel & stocks)", level: 90 },
        { name: "Développement Web & Outils (React.js, Next.js, Tailwind CSS, WordPress)", level: 82 },
      ],
    },
  ],
};

export const ENTREPRISE_DATA = {
  companyName: "Mairie de Septèmes-les-Vallons",
  sector: "Collectivité Territoriale — Service Informatique & Systèmes d'Information",
  size: "Hôtel de Ville, services municipaux, écoles & sites distants de la commune",
  location: "Septèmes-les-Vallons (13240) • Août 2025 — Août 2026",
  context:
    "En alternance au sein du service informatique de la Mairie de Septèmes-les-Vallons (août 2025 – août 2026), j'assure l'assistance aux utilisateurs sur tous les niveaux de support, la gestion complète du parc matériel (hardware), la mise en réseau et sécurité ainsi que l'administration des serveurs virtualisés et de l'Active Directory.",
  infrastructureStats: [
    { label: "Support Informatique", value: "N1 / N2 / N3", detail: "Assistance agents municipaux & écoles (GLPI)" },
    { label: "Réseaux & Sécurité", value: "VLAN & Wi-Fi", detail: "Switchs managés, brassage baie & inter-sites" },
    { label: "Parc & Hardware", value: "Postes & TBI", detail: "Masterisation Win 10/11, SSD, RAM, Imprimantes" },
    { label: "Serveurs & Virt.", value: "AD & Hyperviseurs", detail: "Windows Server, Active Directory, Proxmox / VMware" },
  ],
  missions: [
    {
      title: "Support Utilisateurs Tous Niveaux & Ticketing GLPI",
      code: "B1.1 / B1.2",
      description:
        "Traitement des demandes et incidents via GLPI pour l'ensemble des services de la mairie et des écoles : dépannage sur site et à distance, gestion des habilitations Active Directory et accompagnement quotidien des agents.",
      tools: ["GLPI", "Support N1/N2/N3", "Active Directory", "Windows 10 / 11"],
    },
    {
      title: "Mise en Réseau, Brassage & Sécurité",
      code: "B1.2 / B1.4",
      description:
        "Intervention sur les baies de brassage, configuration de switchs managés et segmentation VLAN, déploiement et dépannage du Wi-Fi municipal et maintien de la connectivité entre la mairie et les sites distants.",
      tools: ["Switchs Managés", "VLANs", "Brassage Baie", "Wi-Fi Municipal"],
    },
    {
      title: "Gestion de Parc, Masterisation & Maintenance Hardware",
      code: "B1.1 / B1.5",
      description:
        "Préparation et masterisation des postes Windows 10/11, diagnostic et réparation matérielle (remplacement SSD, RAM, mise à jour BIOS/drivers), maintenance des imprimantes réseau et des TBI dans les écoles de la commune.",
      tools: ["Masterisation Postes", "SSD / RAM / BIOS", "TBI Écoles & Imprimantes", "Inventaire Parc"],
    },
    {
      title: "Virtualisation & Administration Windows Server / AD",
      code: "B1.1 / B1.5",
      description:
        "Administration des environnements virtualisés (Proxmox VE / VMware / Hyper-V) et des serveurs Windows Server : gestion des machines virtuelles, contrôleurs de domaine Active Directory, partages réseau et continuité de service.",
      tools: ["Proxmox VE / VMware / Hyper-V", "Windows Server", "Active Directory", "Sauvegardes"],
    },
  ],
};

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "thm-pre-security",
    name: "TryHackMe — Pre Security Learning Path",
    issuer: "TryHackMe",
    date: "Obtenue",
    status: "Obtenue",
    scoreOrBadge: "Certificat Officiel TryHackMe Validé",
    description:
      "Validation des fondamentaux techniques indispensables en cybersécurité : fonctionnement des réseaux (modèle OSI, TCP/IP, DNS, HTTP), bases de Linux, bases de Windows, sécurité web et méthodologie d'analyse.",
    skills: ["Network Fundamentals", "Linux Fundamentals", "Windows Fundamentals", "Cybersécurité & Web"],
  },
  {
    id: "cisco-ccna1",
    name: "Cisco CCNA 1 — Introduction to Networks (ITN)",
    issuer: "Cisco Networking Academy (NetAcad)",
    date: "En cours",
    status: "En cours",
    scoreOrBadge: "Formation & Labs Packet Tracer en cours",
    description:
      "Architecture, structure, fonctions et composants des réseaux : adressage et subnetting IPv4/IPv6, protocole Ethernet, configuration initiale de routeurs et commutateurs Cisco IOS et sécurisation de base.",
    skills: ["Cisco IOS", "Subnetting IPv4 / IPv6", "Modèle OSI & TCP/IP", "Switching & Routing"],
  },
];

export const TCS_COMPETENCIES: Competency[] = [
  {
    code: "B1.1",
    title: "Gérer le patrimoine informatique",
    subskills: [
      "Recenser et identifier les ressources numériques",
      "Exploiter des référentiels, normes et standards adoptés par le prestataire",
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      "Gérer des sauvegardes",
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
  },
  {
    code: "B1.2",
    title: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    subskills: [
      "Collecter, suivre et orienter des demandes",
      "Traiter des demandes concernant les services réseau et système, applicatifs",
      "Traiter des demandes concernant les applications",
    ],
  },
  {
    code: "B1.3",
    title: "Développer la présence en ligne de l'organisation",
    subskills: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
  },
  {
    code: "B1.4",
    title: "Travailler en mode projet",
    subskills: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      "Planifier les activités",
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
  },
  {
    code: "B1.5",
    title: "Mettre à disposition des utilisateurs un service informatique",
    subskills: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      "Déployer un service",
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
  },
  {
    code: "B1.6",
    title: "Organiser son développement professionnel",
    subskills: [
      "Mettre en place son environnement d'apprentissage personnel",
      "Mettre en œuvre des outils et stratégies de veille informationnelle",
      "Gérer son identité professionnelle",
      "Développer son projet professionnel",
    ],
  },
];

export const TCS_REALISATIONS: TCSRealisation[] = [
  {
    id: "real-1",
    category: "school",
    period: "M2S Formation Vitrolles",
    title: "Procédure d'Isolation Multi-Promo sous Proxmox VE & Architecture WAN 100.X",
    context: "Atelier Professionnel SISR — M2S Formation",
    competencies: ["B1.1", "B1.2", "B1.4", "B1.5"],
    deliverable: "Procédure PDF Google Drive & Topologie Proxmox",
  },
  {
    id: "real-2",
    category: "school",
    period: "M2S Formation Vitrolles",
    title: "Déploiement et configuration du pare-feu pfSense (WAN 100.X, LAN, NAT & règles de filtrage)",
    context: "Atelier Professionnel SISR — M2S Formation",
    competencies: ["B1.1", "B1.2", "B1.4", "B1.5"],
    deliverable: "Tutoriel pfSense PDF & Configuration Firewall",
  },
  {
    id: "real-3",
    category: "school",
    period: "M2S Formation Vitrolles",
    title: "Segmentation réseau et configuration des VLANs 802.1Q sur Switch administrable Planet",
    context: "Atelier Professionnel SISR — M2S Formation",
    competencies: ["B1.1", "B1.2", "B1.5"],
    deliverable: "Tutoriel Switch Planet : Configuration VLAN (PDF)",
  },
  {
    id: "real-4",
    category: "school",
    period: "M2S Formation Vitrolles",
    title: "Conception de ce Portfolio BTS SIO SISR (Next.js, Lenis, Sync Google Drive) & Veille Souveraineté Linux / AD",
    context: "Projet Personnel & Épreuve E4",
    competencies: ["B1.3", "B1.6"],
    deliverable: "Site Web en production (OVH / GitHub) & Dossier de Veille",
  },
  {
    id: "real-5",
    category: "company1",
    period: "Août 2025 — Août 2026",
    title: "Support informatique tous niveaux (N1/N2/N3) via GLPI pour les services municipaux et écoles",
    context: "Alternance — Mairie de Septèmes-les-Vallons",
    competencies: ["B1.1", "B1.2", "B1.5"],
    deliverable: "Suivi des tickets GLPI & Assistance utilisateurs",
  },
  {
    id: "real-6",
    category: "company1",
    period: "Août 2025 — Août 2026",
    title: "Gestion du parc Hardware, Masterisation de postes Windows 10/11, maintenance SSD/RAM, imprimantes et TBI écoles",
    context: "Alternance — Mairie de Septèmes-les-Vallons",
    competencies: ["B1.1", "B1.2", "B1.5"],
    deliverable: "Parc maintenu & Postes déployés en mairie/écoles",
  },
  {
    id: "real-7",
    category: "company2",
    period: "Août 2025 — Août 2026",
    title: "Mise en réseau et sécurité : brassage de baies, configuration de switchs managés, VLANs et Wi-Fi municipal",
    context: "Alternance — Mairie de Septèmes-les-Vallons",
    competencies: ["B1.1", "B1.2", "B1.4", "B1.5"],
    deliverable: "Infrastructure réseau municipale & Brassage",
  },
  {
    id: "real-8",
    category: "company2",
    period: "Août 2025 — Août 2026",
    title: "Administration Active Directory / Windows Server et gestion des environnements virtualisés (Proxmox / VMware / Hyper-V)",
    context: "Alternance — Mairie de Septèmes-les-Vallons",
    competencies: ["B1.1", "B1.4", "B1.5"],
    deliverable: "Comptes/GPO AD & Machines virtuelles en production",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  // ================= INFRASTRUCTURES =================
  {
    id: "infra-wan-100-proxmox-pfsense-planet",
    type: "infrastructure",
    title: "Infrastructure Réseau & Virtualisation : WAN 100.X, Proxmox VE, SW 1, pfSense & Switch Planet",
    subtitle: "Architecture complète reliant le réseau WAN (100.X) aux hyperviseurs Proxmox VE via SW 1, pare-feu pfSense et Switch Planet",
    tags: ["WAN 100.X", "Proxmox VE", "SW 1", "pfSense", "SW Planet", "VLAN & Routage"],
    environment: ["Réseau WAN (100.X)", "Hyperviseur Proxmox VE", "Switch SW 1", "Pare-feu pfSense", "Switch Administrable Planet"],
    summary:
      "Conception et déploiement de mon infrastructure principale BTS SIO SISR : arrivée WAN en 100.X distribuée vers Proxmox VE et SW 1, coupure et filtrage par le pare-feu pfSense, puis distribution LAN/VLAN via le Switch Planet vers les environnements virtualisés Proxmox.",
    architecture: {
      topologySummary:
        "WAN (100.X) ──► [ Proxmox VE & SW 1 ] ──► [ Pare-feu pfSense ] ──► [ Switch Planet ] ──► [ Cluster / VM Proxmox ]",
      vlans: [
        { id: "WAN", name: "Interconnexion WAN (100.X)", subnet: "100.x.x.0/24", gateway: "100.x.x.254" },
        { id: "SW 1", name: "Commutation Amont / Transit Proxmox & pfSense", subnet: "Transit L2 / 802.1Q", gateway: "Interface WAN pfSense" },
        { id: "SW Planet", name: "Distribution LAN & VLANs Services", subnet: "192.168.x.0/24 / 10.x.x.0/24", gateway: "Interface LAN/VLAN pfSense" },
        { id: "Proxmox VE", name: "Hôtes de Virtualisation (VM & Conteneurs LXC)", subnet: "Bridges vmbr0 (WAN/Mgmt) & vmbr1 (LAN Planet)", gateway: "pfSense" },
      ],
      services: [
        "Arrivée WAN 100.X",
        "Proxmox VE (vmbr0 / vmbr1)",
        "Switch SW 1 (Distribution amont)",
        "Pare-feu pfSense (NAT, Filtrage, DHCP/DNS)",
        "Switch Planet (Distribution aval vers Proxmox)",
      ],
    },
    steps: [
      {
        stepNumber: "01",
        title: "Interconnexion WAN (100.X) vers Proxmox VE et Switch SW 1",
        description:
          "Raccordement de l'arrivée WAN en 100.X vers l'hyperviseur Proxmox VE et le commutateur SW 1 afin d'assurer l'accès amont et l'interconnexion de la patte WAN du pare-feu.",
        commandOrConfig: `# Configuration réseau Proxmox (/etc/network/interfaces)\nauto vmbr0\niface vmbr0 inet static\n    address 100.x.x.x/24\n    gateway 100.x.x.254\n    bridge-ports eno1\n    bridge-stp off\n    bridge-fd 0\n# Liaison vers SW 1 & Patte WAN pfSense`,
      },
      {
        stepNumber: "02",
        title: "Coupure de flux, NAT et Filtrage sur le pare-feu pfSense",
        description:
          "Le trafic issu de SW 1 traverse le pare-feu pfSense (interface WAN en 100.X). pfSense assure le NAT sortant, le cloisonnement sécurisé et le routage vers le réseau interne.",
        commandOrConfig: `# Interfaces pfSense\nWAN (em0 / vtnet0) -> Réseau 100.X (via SW 1)\nLAN / Trunk (em1 / vtnet1) -> Vers Switch Planet\n# Règles de filtrage et NAT Outbound activés`,
      },
      {
        stepNumber: "03",
        title: "Distribution par le Switch Planet et retour vers Proxmox VE",
        description:
          "En sortie de pfSense, le flux est distribué par le Switch administrable Planet qui segmente et renvoie les réseaux internes vers les bridges secondaires de Proxmox VE pour héberger les VMs et conteneurs de production.",
        commandOrConfig: `# Bridge interne Proxmox relié au Switch Planet\nauto vmbr1\niface vmbr1 inet manual\n    bridge-ports eno2\n    bridge-stp off\n    bridge-fd 0\n    bridge-vlan-aware yes\n# Alimentation des VMs internes derrière pfSense & SW Planet`,
      },
    ],
    results: [
      "Architecture bouclée et segmentée proprement : WAN (100.X) -> Proxmox / SW 1 -> pfSense -> SW Planet -> VMs Proxmox.",
      "Isolation complète des machines virtuelles internes derrière le pare-feu pfSense et le Switch Planet.",
      "Administration claire de l'hyperviseur Proxmox et supervision de bout en bout.",
    ],
    competencies: ["B1.1", "B1.2", "B1.4", "B1.5"],
  },
  {
    id: "infra-pfsense-vlan-ha",
    type: "infrastructure",
    title: "Infrastructure Réseau Multi-Sites, VLANs & Cluster pfSense Haute Disponibilité",
    subtitle: "Conception d'une architecture cœur de réseau redondée avec filtrage inter-VLAN, DMZ publique et VPN WireGuard",
    tags: ["pfSense HA (CARP)", "Cisco IOS", "VLAN 802.1Q", "WireGuard VPN", "Haute Disponibilité"],
    environment: ["2x Pare-feux pfSense 2.7", "Switch Cisco L3 C3560", "Switchs L2 C2960", "Cluster Proxmox VE 8.2"],
    summary:
      "Remplacement d'un point unique de défaillance (SPOF) par un cluster de deux pare-feux pfSense en mode actif/passif (protocole CARP + synchronisation d'états pfsync) segmentant l'entreprise en 5 VLANs isolés.",
    architecture: {
      topologySummary:
        "Accès WAN redondé -> Cluster pfSense (VIP CARP) -> Trunk 802.1Q vers Cœur de réseau Cisco -> Distribution par VLANs vers Serveurs Proxmox et Postes clients.",
      vlans: [
        { id: "VLAN 10", name: "MGMT (Administration)", subnet: "10.10.10.0/24", gateway: "10.10.10.254 (VIP)" },
        { id: "VLAN 20", name: "SRV (Serveurs AD / GLPI / Zabbix)", subnet: "10.10.20.0/24", gateway: "10.10.20.254 (VIP)" },
        { id: "VLAN 30", name: "USERS (Collaborateurs)", subnet: "10.10.30.0/24", gateway: "10.10.30.254 (VIP)" },
        { id: "VLAN 40", name: "DMZ (Reverse Proxy Nginx)", subnet: "172.16.40.0/24", gateway: "172.16.40.254 (VIP)" },
        { id: "VLAN 99", name: "GUEST (Wi-Fi Invités Isolé)", subnet: "192.168.99.0/24", gateway: "192.168.99.254 (VIP)" },
      ],
      services: ["CARP (Virtual IP)", "pfsync & XMLRPC Sync", "DHCP Failover", "DNS Resolver Unbound", "WireGuard RoadWarrior"],
    },
    steps: [
      {
        stepNumber: "01",
        title: "Configuration des VLANs et Trunks 802.1Q sur commutateurs Cisco",
        description:
          "Création des VLANs 10, 20, 30, 40, 99, sécurisation des ports inutilisés (shutdown + VLAN parking) et activation de Rapid-PVST+ avec BPDU Guard.",
        commandOrConfig: `vlan 10\n name MGMT\nvlan 20\n name SRV\n!\ninterface GigabitEthernet0/1\n description TRUNK_TO_PFSENSE_MASTER\n switchport trunk encapsulation dot1q\n switchport mode trunk\n switchport trunk allowed vlan 10,20,30,40,99`,
      },
      {
        stepNumber: "02",
        title: "Mise en place du lien dédié SYNC et des VIP CARP sur pfSense",
        description:
          "Configuration d'une interface dédiée entre FW-01 et FW-02 pour pfsync (synchronisation de la table d'états) et XMLRPC (réplication automatique des règles de pare-feu et NAT).",
        commandOrConfig: `# Vérification de l'état CARP sur pfSense Master\nifconfig | grep -E 'carp:|inet '\n# carp: MASTER vhid 10 advbase 1 advskew 0\n# inet 10.10.20.254 netmask 0xffffff00 vhid 20`,
      },
      {
        stepNumber: "03",
        title: "Matrice de flux Zero-Trust inter-VLAN",
        description:
          "Application du principe du moindre privilège : le VLAN Utilisateurs ne peut joindre que les ports strictement nécessaires du VLAN Serveurs (DNS 53, Kerberos 88, LDAP 389/636, HTTPS 443). Le VLAN MGMT est accessible uniquement via bastion/VPN.",
      },
    ],
    results: [
      "Basculement transparent en moins de 1 seconde (perte de 0 à 1 paquet ICMP lors de l'extinction brutale du nœud maître).",
      "Isolation complète du réseau Invité et de la DMZ par rapport au LAN de production.",
      "Accès distant administrateur chiffré via tunnel WireGuard avec MFA.",
    ],
    competencies: ["B1.1", "B1.4", "B1.5"],
  },
  {
    id: "infra-ad-proxmox-cluster",
    type: "infrastructure",
    title: "Socle Système Entreprise : Cluster Proxmox VE, Active Directory Redondé & PKI",
    subtitle: "Virtualisation de 8 serveurs critiques avec annuaire AD DS (2 contrôleurs de domaine), DNS, DHCP Failover et partage DFS",
    tags: ["Proxmox VE 8", "Windows Server 2022", "Active Directory", "GPO & LAPS", "DFS-R"],
    environment: ["Cluster Proxmox 3 Nœuds", "2x Windows Server 2022 Core/GUI", "Stockage ZFS / PBS", "Clients Windows 11 Pro"],
    summary:
      "Conception et déploiement du socle d'authentification et de fichiers d'une PME de 120 salariés. Mise en place de deux contrôleurs de domaine répliqués, d'un espace de noms DFS redondé et d'un durcissement conforme au guide ANSSI.",
    architecture: {
      topologySummary:
        "Cluster Proxmox 3 nœuds en quorum -> SRV-DC01 & SRV-DC02 (AD DS + DNS + DHCP Failover) -> SRV-FS01 & SRV-FS02 (Serveurs de fichiers DFS-N / DFS-R) -> SRV-PBS (Sauvegardes dédupliquées).",
      vlans: [
        { id: "VLAN 15", name: "CLUSTER-PVE (Corosync)", subnet: "10.10.15.0/24", gateway: "Isolé L2" },
        { id: "VLAN 20", name: "SRV-AD (Production)", subnet: "10.10.20.0/24", gateway: "10.10.20.254" },
      ],
      services: ["AD DS (Niveau fonctionnel 2016+)", "DHCP Failover Hot-Standby", "DFS Namespaces & Replication", "Windows LAPS", "Proxmox Backup Server"],
    },
    steps: [
      {
        stepNumber: "01",
        title: "Structuration de l'annuaire AD (Unités d'Organisation & Tiering)",
        description:
          "Création d'une arborescence OU propre séparant les comptes d'administration (Tier 0 / Tier 1), les utilisateurs par départements, les postes de travail et les serveurs.",
        commandOrConfig: `New-ADOrganizationalUnit -Name "CORP_USERS" -Path "DC=novasys,DC=lan"\nNew-ADOrganizationalUnit -Name "CORP_WORKSTATIONS" -Path "DC=novasys,DC=lan"\nNew-ADOrganizationalUnit -Name "TIER0_ADMINS" -Path "DC=novasys,DC=lan"`,
      },
      {
        stepNumber: "02",
        title: "Déploiement des GPO de sécurité et Windows LAPS",
        description:
          "Rotation automatique et chiffrement dans l'AD du mot de passe administrateur local de chaque poste client via Windows LAPS, verrouillage de session automatique, montage des lecteurs réseaux DFS et pare-feu Windows avancé.",
      },
      {
        stepNumber: "03",
        title: "Audit de sécurité avec PingCastle",
        description:
          "Exécution d'un audit PingCastle avant et après durcissement : réduction du score de risque global de 68/100 à 12/100 (désactivation NTLMv1, SMBv1, signature LDAP requise).",
      },
    ],
    results: [
      "Tolérance aux pannes complète sur l'authentification Kerberos, la résolution DNS et l'attribution IP DHCP.",
      "Score de maturité sécurité Active Directory validé avec PingCastle.",
      "Sauvegardes quotidiennes chiffrées vers Proxmox Backup Server avec rétention GFS.",
    ],
    competencies: ["B1.1", "B1.2", "B1.5"],
  },
  {
    id: "infra-monitoring-itsm",
    type: "infrastructure",
    title: "Plateforme ITSM & NOC : GLPI 10 + Zabbix 7.0 + Reverse Proxy HTTPS",
    subtitle: "Centralisation de la gestion de parc, du helpdesk et de la supervision temps réel des équipements réseaux et serveurs",
    tags: ["GLPI 10", "Zabbix 7.0", "Debian 12", "MariaDB", "Nginx Reverse Proxy"],
    environment: ["Debian 12 Bookworm", "Nginx + Certificats TLS Internes", "Zabbix Server 7.0 LTS", "GLPI 10.0.x + GLPI Agent"],
    summary:
      "Mise en place d'un couple ITSM / Supervision permettant d'anticiper les pannes matérielles ou saturées (disques, RAM, liens WAN) avant que les utilisateurs ne soient impactés, tout en automatisant la remontée d'inventaire.",
    architecture: {
      topologySummary:
        "Agents GLPI & Sondes Zabbix (SNMPv3 / Agent 2) -> Reverse Proxy Nginx TLS 1.3 -> VM GLPI 10 (Inventaire & Ticketing) + VM Zabbix 7.0 (Métriques & Alertes Webhook).",
      services: ["GLPI 10.0.16", "GLPI Agent (Déploiement GPO)", "Zabbix 7.0 LTS", "SNMPv3 AuthPriv (SHA/AES)", "SSO LDAP / Active Directory"],
    },
    steps: [
      {
        stepNumber: "01",
        title: "Déploiement de GLPI 10 sécurisé et couplage LDAP / AD",
        description:
          "Installation sur pile LEMP durcie (PHP-FPM 8.2, MariaDB 10.11), synchronisation automatique des utilisateurs Active Directory et attribution dynamique des profils (Self-Service vs Technicien) selon les groupes de sécurité AD.",
      },
      {
        stepNumber: "02",
        title: "Déploiement silencieux de GLPI Agent par GPO",
        description:
          "Création d'un script d'installation MSI silencieux poussé au démarrage des machines du domaine pour remonter matériel, logiciels et numéros de série toutes les 24h.",
        commandOrConfig: `msiexec /i "\\\\novasys.lan\\NETLOGON\\GLPI-Agent-1.10-x64.msi" /quiet RUNNOW=1 SERVER="https://glpi.novasys.lan/front/inventory.php" NO_SSL_CHECK=0`,
      },
      {
        stepNumber: "03",
        title: "Supervision SNMPv3 des switchs/pare-feux et agents Zabbix",
        description:
          "Surveillance CPU, mémoire, espace ZFS, état CARP pfSense et débit des ports Trunk avec seuils d'alerte gradués (Warning / High / Disaster).",
      },
    ],
    results: [
      "100% du parc informatique inventorié automatiquement sans intervention manuelle.",
      "Temps moyen de détection d'incident (MTTD) réduit à moins de 2 minutes grâce aux alertes Zabbix.",
      "Traçabilité complète des tickets d'incidents pour l'épreuve E4.",
    ],
    competencies: ["B1.1", "B1.2", "B1.5"],
  },

  // ================= PROCEDURES =================
  {
    id: "proc-debian-hardening",
    type: "procedure",
    title: "Procédure : Durcissement (Hardening) d'un Serveur Debian 12 en Production",
    subtitle: "Standardisation sécurité post-installation conforme aux recommandations de l'ANSSI (SSH, NFTables, Fail2ban, Mises à jour)",
    tags: ["Procédure Standard", "Debian 12", "ANSSI", "SSH / Ed25519", "Fail2ban & UFW"],
    environment: ["Debian 12 LTS (Bookworm)", "OpenSSH Server", "UFW / NFTables", "Fail2ban", "Unattended-Upgrades"],
    summary:
      "Documentation technique pas-à-pas destinée aux administrateurs pour sécuriser tout nouveau serveur Linux avant sa mise en production au sein du VLAN Serveurs ou de la DMZ.",
    steps: [
      {
        stepNumber: "Étape 1",
        title: "Authentification SSH par clé Ed25519 et désactivation de root",
        description:
          "Remplacement de l'authentification par mot de passe par une paire de clés asymétriques Ed25519 et restriction stricte du démon sshd.",
        commandOrConfig: `# /etc/ssh/sshd_config.d/hardening.conf\nPort 2222\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\nAllowGroups ssh-admins\n\nsystemctl restart sshd`,
      },
      {
        stepNumber: "Étape 2",
        title: "Filtrage pare-feu hôte (UFW / NFTables) par défaut en Deny",
        description:
          "Blocage de tous les flux entrants non sollicités et ouverture granulaire uniquement depuis le VLAN d'administration (10.10.10.0/24).",
        commandOrConfig: `ufw default deny incoming\nufw default allow outgoing\nufw allow from 10.10.10.0/24 to any port 2222 proto tcp comment 'SSH Admin VLAN'\nufw allow 443/tcp comment 'HTTPS Production'\nufw enable`,
      },
      {
        stepNumber: "Étape 3",
        title: "Protection anti-bruteforce Fail2ban & Patching automatique",
        description:
          "Bannissement automatique des IP suspectes et installation quotidienne des correctifs de sécurité critiques Debian.",
        commandOrConfig: `apt install -y fail2ban unattended-upgrades apt-listchanges\ndpkg-reconfigure -plow unattended-upgrades\nsystemctl enable --now fail2ban`,
      },
    ],
    results: [
      "Surface d'attaque réduite au strict minimum sur l'ensemble des VM Linux.",
      "Procédure reproductible en 15 minutes ou automatisable via playbook Ansible.",
      "Validation de conformité lors des audits de sécurité internes.",
    ],
    competencies: ["B1.1", "B1.5"],
  },
  {
    id: "proc-wireguard-vpn",
    type: "procedure",
    title: "Procédure : Mise en place d'un VPN Administrateur & Nomade avec WireGuard sur pfSense",
    subtitle: "Guide de déploiement et d'enrôlement client sécurisé pour le télétravail et la télémaintenance",
    tags: ["Procédure Réseau", "WireGuard", "pfSense", "Cryptographie", "Télétravail"],
    environment: ["pfSense CE 2.7 / Plus", "Package WireGuard", "Clients Windows / macOS / Linux"],
    summary:
      "Procédure complète décrivant la configuration d'un concentrateur VPN WireGuard sur pfSense, la génération des clés publiques/privées (Curve25519), les clés pré-partagées (PSK) et le filtrage pare-feu associé.",
    steps: [
      {
        stepNumber: "Étape 1",
        title: "Création du Tunnel WireGuard (wg0) sur pfSense",
        description:
          "Configuration de l'interface virtuelle `tun_wg0` sur le sous-réseau dédié `10.200.0.1/24` (Port UDP 51820) et génération de la paire de clés du serveur.",
        commandOrConfig: `# Paramètres du Tunnel pfSense (VPN > WireGuard > Tunnels)\nDescription : WG_NOMADES_IT\nListen Port : 51820\nInterface Address : 10.200.0.1/24`,
      },
      {
        stepNumber: "Étape 2",
        title: "Déclaration d'un Pair (Peer) avec Preshared Key (PSK)",
        description:
          "Attribution d'une IP fixe `/32` à chaque technicien ou collaborateur afin d'appliquer des règles de pare-feu nominatives par profil.",
        commandOrConfig: `[Interface]\nPrivateKey = <CLE_PRIVEE_POSTE_CLIENT>\nAddress = 10.200.0.10/32\nDNS = 10.10.20.1\n\n[Peer]\nPublicKey = <CLE_PUBLIQUE_PFSENSE>\nPresharedKey = <PSK_ADDITIONNELLE>\nEndpoint = vpn.novasys.fr:51820\nAllowedIPs = 10.10.10.0/24, 10.10.20.0/24\nPersistentKeepalive = 25`,
      },
      {
        stepNumber: "Étape 3",
        title: "Règles WAN et Filtrage granulaire sur l'interface WireGuard",
        description:
          "Autorisation du port UDP 51820 sur l'interface WAN et restriction des flux sur l'interface `WG_NOMADES` selon l'adresse IP `/32` du pair connecté.",
      },
    ],
    results: [
      "Débit chiffré 3x supérieur à OpenVPN avec une latence minimale.",
      "Révocation instantanée d'un collaborateur en un clic via la suppression de son Peer.",
      "Documentation claire remise aux techniciens lors de l'onboarding.",
    ],
    competencies: ["B1.1", "B1.2", "B1.5"],
  },
  {
    id: "proc-pbs-backup-pra",
    type: "procedure",
    title: "Procédure : Sauvegarde 3-2-1 et Test de Restauration PRA avec Proxmox Backup Server",
    subtitle: "Protocole d'exploitation des sauvegardes dédupliquées, vérification d'intégrité et restauration rapide de VM critique",
    tags: ["Procédure PRA", "Proxmox Backup Server", "Règle 3-2-1", "Chiffrement AES-256", "Continuité de service"],
    environment: ["Proxmox VE 8.2", "Proxmox Backup Server (PBS) 3.2", "Stockage ZFS RAID-Z2"],
    summary:
      "Documentation opérationnelle garantissant la continuité d'activité en cas de sinistre matériel ou d'attaque par rançongiciel (ransomware), incluant le protocole de test mensuel de restauration.",
    steps: [
      {
        stepNumber: "Étape 1",
        title: "Configuration du Datastore PBS et des tâches de Prune & Garbage Collect",
        description:
          "Création d'un compte dédiée avec permissions limitées (`DatastoreBackup` sans droit de suppression pour se protéger des ransomwares) et politique de rétention GFS.",
        commandOrConfig: `# Politique de rétention GFS appliquée :\nkeep-last: 7\nkeep-daily: 14\nkeep-weekly: 8\nkeep-monthly: 6\n# Vérification cryptographique hebdomadaire (Verify Job) activée`,
      },
      {
        stepNumber: "Étape 2",
        title: "Liaison chiffrée côté client depuis le cluster Proxmox VE",
        description:
          "Ajout du stockage PBS sur le cluster Proxmox avec génération d'une clé de chiffrement cliente exportée hors-ligne en coffre-fort physique.",
        commandOrConfig: `pvesm add pbs PBS-PROD --server 10.10.15.50 --datastore backup-zfs \\\n  --username backup-svc@pbs --fingerprint <SHA256_FINGERPRINT> --encryption-key autogen`,
      },
      {
        stepNumber: "Étape 3",
        title: "Protocole de restauration Live-Restore et test en réseau isolé",
        description:
          "Démarrage immédiat de la VM pendant la restauration des blocs (`Live-Restore`) dans un bridge réseau isolé (`vmbr_pra_test`) pour valider le démarrage d'Active Directory et de MariaDB.",
      },
    ],
    results: [
      "RTO (Recovery Time Objective) réduit à moins de 10 minutes grâce au mode Live-Restore.",
      "Taux de déduplication supérieur à 85%, optimisant l'espace disque ZFS.",
      "Rapport mensuel de test de restauration signé et archivé.",
    ],
    competencies: ["B1.1", "B1.4", "B1.5"],
  },
];

export const VEILLES_DATA = {
  mainTheme: "Souveraineté Numérique & Sortie de la dépendance Microsoft : Migration des infrastructures systèmes vers Linux (Active Directory sous Linux avec Samba 4, Proxmox VE & solutions Open Source)",
  problematique:
    "Suite aux décisions gouvernementales françaises et européennes visant à réduire la dépendance aux solutions propriétaires Microsoft (licences, souveraineté, Cloud Act), comment les collectivités et entreprises peuvent-elles migrer leurs services critiques — notamment Active Directory et la virtualisation — vers un écosystème Linux Open Source ?",
  methodology: [
    {
      tool: "Directives État (DINUM, ANSSI, SILL)",
      role: "Suivi des décisions gouvernementales & logiciels libres recommandés",
      sources: "DINUM (numérique.gouv.fr), Socle Interministériel de Logiciels Libres (SILL), ANSSI, CNLL",
    },
    {
      tool: "Veille Technique Linux & Active Directory",
      role: "Documentation & retours d'expérience Samba 4 AD / FreeIPA / Proxmox",
      sources: "Tranquil IT (Samba-AD), LinuxFr, LeMagIT, Goodtech, Proxmox Server Solutions, Debian Wiki",
    },
    {
      tool: "Tests pratiques en Laboratoire SISR",
      role: "Expérimentation sur Proxmox VE & Debian",
      sources: "Mise en place de contrôleurs de domaine sous Linux, tests RSAT/GPO et interopérabilité postes Windows/Linux",
    },
  ],
  comparison: {
    title: "Comparatif des solutions d'identité Linux",
    rows: [
      {
        solution: "Samba 4 AD",
        best: "Remplacer un Windows Server AD (jonction des postes Windows, GPO, Kerberos)",
        worst: "GPO moins complètes que Windows, pas d'AD CS natif",
      },
      {
        solution: "FreeIPA",
        best: "Parc Linux (LDAP, Kerberos, DNS, certificats intégrés)",
        worst: "Postes Windows : pas de jonction directe, relation d'approbation requise",
      },
      {
        solution: "Univention UCS",
        best: "Administration simple avec interface web",
        worst: "Dépend de Samba 4 en dessous, pas une vraie alternative technique",
      },
      {
        solution: "Kanidm",
        best: "Identité moderne et SSO (OIDC, LDAP), souveraineté",
        worst: "Pas de contrôleur de domaine Windows : ni GPO, ni jonction de postes",
      },
    ],
    summary:
      "Samba pour remplacer l'AD Windows, FreeIPA pour un parc Linux, Kanidm pour l'authentification moderne.",
  },
  articles: [
    {
      id: "veille-1",
      title: "La DINUM migre ses postes internes vers Linux : environ 250 postes d'ici fin 2026",
      source: "Acteurs Publics (article du 20 avril 2026)",
      date: "20 avril 2026",
      category: "Souveraineté & État",
      impactLevel: "Critique",
      summary:
        "La DINUM migre ses postes internes vers Linux, avec une échéance fixée à la fin de l'année 2026 et un poste de travail basé sur NixOS. La généralisation à toute l'administration n'est encore qu'au stade de la réflexion.",
      takeawaySISR:
        "Pour un technicien SISR, l'administration Linux et les alternatives libres deviennent un sujet concret, même si la généralisation reste à l'étude.",
      url: "https://acteurspublics.fr/articles/400-postes-concernes-dici-lete-la-dsi-de-letat-precise-les-contours-de-sa-migration-vers-linux/",
    },
    {
      id: "veille-2",
      title: "Samba 4.25 : contrôleur de domaine Active Directory libre sous Linux",
      source: "Samba.org (annonces de versions)",
      date: "24 septembre 2026 (4.25.0) — 23 octobre 2026 (4.25.1)",
      category: "Active Directory sous Linux",
      impactLevel: "Critique",
      summary:
        "Samba 4 permet de faire tourner un contrôleur de domaine Active Directory sur Debian : Kerberos, LDAP, DNS, réplication SYSVOL et administration depuis les outils RSAT. La série 4.25 est sortie en septembre 2026, suivie d'une première version corrective en octobre.",
      takeawaySISR:
        "Samba permet de remplacer un AD Windows, mais avec des GPO moins complètes que sous Windows Server : c'est la limite à présenter à l'oral.",
      url: "https://www.samba.org/samba/latest_news.html",
    },
    {
      id: "veille-3",
      title: "FreeIPA 4.13.4 : correctif critique sur l'authentification LDAP",
      source: "Projet FreeIPA (notes de version 4.13.4)",
      date: "9 juillet 2026",
      category: "Active Directory sous Linux",
      impactLevel: "Majeur",
      summary:
        "FreeIPA combine LDAP (389 Directory Server), Kerberos, DNS, une autorité de certification (Dogtag) et des approbations avec Active Directory. La version 4.13.4 corrige deux CVE : un bind LDAP anonyme pouvait obtenir des identifiants administrateur (CVE-2026-76578), et un principal authentifié pouvait déclencher un eval() avant le contrôle d'autorisation (CVE-2026-79678).",
      takeawaySISR:
        "Un annuaire Linux doit être mis à jour rapidement, et limiter les binds anonymes fait partie du durcissement de base à appliquer en SISR.",
      url: "https://www.freeipa.org/_sources/release-notes/4-13-4.rst",
    },
    {
      id: "veille-4",
      title: "Proxmox VE 9.2 : répartition dynamique de charge et noyau Linux 7.0",
      source: "Proxmox Server Solutions (communiqué officiel)",
      date: "21 mai 2026",
      category: "Alternative Open Source",
      impactLevel: "Majeur",
      summary:
        "Proxmox VE 9.2 ajoute un Dynamic Load Balancer qui tient compte de la charge réelle des nœuds et peut migrer les VM et conteneurs HA, avec une base Debian 13.5, noyau 7.0 et QEMU 11.0. La version étend aussi le SDN (WireGuard, BGP).",
      takeawaySISR:
        "Proxmox VE reste le socle de virtualisation utilisé en SISR : suivre ses versions permet de planifier les mises à jour d'un cluster.",
      url: "https://www.proxmox.com/en/about/press-releases/proxmox-virtual-environment-9-2",
    },
  ] as VeilleArticle[],
};
