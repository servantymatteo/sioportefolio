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
  category: "Zero Trust & SASE" | "Virtualisation & Cloud" | "Cybersécurité & ANSSI";
  impactLevel: "Critique" | "Majeur" | "Informatif";
  summary: string;
  takeawaySISR: string;
  url: string;
}

export const PORTFOLIO_OWNER = {
  fullName: "Mattéo Servanty",
  role: "Administrateur Systèmes, Réseaux & Sécurité Junior",
  diploma: "BTS SIO — Option SISR (Solutions d'Infrastructure, Systèmes et Réseaux)",
  session: "Session 2025 - 2027",
  location: "France",
  email: "matteo.servanty@etudiant-it.fr",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  statusBadge: "Disponible Alternance / Stage & Épreuves E4 - E5",
  bio: "Passionné par l'architecture réseau, l'administration système Linux/Windows Server, la virtualisation (Proxmox VE / VMware) et la cybersécurité défensive. Mon objectif est de concevoir des infrastructures résilientes, automatisées et documentées selon les bonnes pratiques de l'ANSSI.",
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
      year: "2025 — Présent",
      title: "BTS SIO — Option SISR",
      institution: "Pôle Supérieur Informatique & Réseaux",
      description:
        "Apprentissage approfondi des architectures systèmes & réseaux, laboratoires virtualisés sous Proxmox, sécurisation de parc et préparation aux épreuves E4 et E5.",
      tags: ["Proxmox VE", "Cisco IOS", "Windows Server 2022", "Debian 12", "pfSense"],
    },
    {
      year: "2025 — Présent",
      title: "Technicien Systèmes & Réseaux (Stage / Alternance)",
      institution: "Direction des Systèmes d'Information (DSI)",
      description:
        "Gestion du support N1/N2 via GLPI, déploiement automatisé de postes, segmentation VLAN, durcissement Active Directory et rédaction de procédures d'exploitation.",
      tags: ["GLPI", "Active Directory", "VLAN", "Zabbix", "Veeam Backup"],
    },
    {
      year: "2022 — 2025",
      title: "Baccalauréat Général / Technologique (Spécialité Numérique / STI2D)",
      institution: "Lycée Général et Technologique",
      description:
        "Acquisition des bases fondamentales en algorithmique, architecture matérielle des ordinateurs, protocoles TCP/IP et systèmes d'exploitation Linux.",
      tags: ["TCP/IP", "Python", "Linux", "Architecture Matérielle"],
    },
  ],
  skillGroups: [
    {
      category: "Réseaux & Sécurité",
      skills: [
        { name: "VLAN, Trunk 802.1Q, Routage Inter-VLAN, STP", level: 92 },
        { name: "Pare-feu pfSense / OPNsense / Fortigate (NAT, Règles, HA)", level: 88 },
        { name: "VPN Site-à-Site & Nomade (WireGuard, IPsec, OpenVPN)", level: 85 },
        { name: "Switchs & Routeurs Cisco IOS / HP Aruba", level: 86 },
      ],
    },
    {
      category: "Systèmes & Virtualisation",
      skills: [
        { name: "Windows Server 2022 (AD DS, GPO, DNS, DHCP, PKI)", level: 90 },
        { name: "Linux Debian / Ubuntu / Rocky (SSH, Systemd, Bash, NFTables)", level: 88 },
        { name: "Virtualisation Proxmox VE, Cluster HA & Conteneurs LXC", level: 92 },
        { name: "Docker, Docker Compose & Reverse Proxy (Nginx / Traefik)", level: 82 },
      ],
    },
    {
      category: "Supervision, Parc & Exploitation",
      skills: [
        { name: "GLPI 10 + FusionInventory / GLPI Agent (ITSM & Asset)", level: 94 },
        { name: "Supervision Zabbix & Grafana / Prometheus (SNMP, Agents)", level: 86 },
        { name: "Sauvegarde 3-2-1 Veeam Backup & Proxmox Backup Server", level: 85 },
        { name: "Scripting PowerShell & Automatisation Ansible", level: 78 },
      ],
    },
  ],
};

export const ENTREPRISE_DATA = {
  companyName: "NovaSys Infrastructure & Cloud (DSI / ESN)",
  sector: "Services d'Infrastructures Managées, Hébergement & Conseil IT",
  size: "85 collaborateurs — Pôle Infrastructure & Support (14 ingénieurs/techniciens)",
  location: "Siège Social & Datacenter Régional (Tier III)",
  context:
    "Au sein du pôle Exploitation & Infrastructure, j'interviens sur le maintien en condition opérationnelle (MCO) et l'évolution de l'infrastructure interne ainsi que des environnements clients PME/ETI hébergés sur nos clusters virtualisés.",
  infrastructureStats: [
    { label: "Serveurs Virtuels (VM / LXC)", value: "140+", detail: "Cluster Proxmox VE & VMware vSphere" },
    { label: "Postes & Équipements gérés", value: "450+", detail: "Supervisés via GLPI Agent & Zabbix" },
    { label: "VLANs segmentés", value: "18", detail: "Admin, Prod, VoIP, DMZ, IoT, Invités" },
    { label: "Disponibilité SLA", value: "99.92%", detail: "Redondance CARP/VRRP & Backups PBS" },
  ],
  missions: [
    {
      title: "Gestion du Parc & Support N1/N2 (ITIL)",
      code: "B1.1 / B1.2",
      description:
        "Traitement des tickets d'incidents et demandes d'évolution sous GLPI, inventaire automatisé par agent, masterisation et déploiement de postes Windows 11 Pro via WDS/MDT.",
      tools: ["GLPI 10", "GLPI Agent", "Windows 11 Pro", "Active Directory"],
    },
    {
      title: "Refonte Réseau & Segmentation VLAN / Pare-feu",
      code: "B1.4 / B1.5",
      description:
        "Segmentation du réseau plat historique en 6 VLANs étanches (Administration, Serveurs, Utilisateurs, VoIP, DMZ, Wi-Fi Invité) avec filtrage inter-VLAN sur cluster pfSense HA.",
      tools: ["Cisco Catalyst", "pfSense CE/Plus", "802.1Q", "CARP / pfsync"],
    },
    {
      title: "Supervision Proactive & Sauvegardes Immuables",
      code: "B1.1 / B1.5",
      description:
        "Déploiement de sondes Zabbix (SNMPv3 et agents actifs) sur les équipements critiques, création de tableaux de bord et alertes Webhook, et vérification des plans de reprise d'activité (PRA).",
      tools: ["Zabbix 7.0", "SNMPv3", "Proxmox Backup Server", "Veeam"],
    },
    {
      title: "Durcissement Active Directory & Politiques GPO",
      code: "B1.1 / B1.6",
      description:
        "Audit PingCastle de l'annuaire AD, application des recommandations ANSSI (modèle de délégation Tiering, LAPS, blocage SMBv1, politiques de mots de passe fines).",
      tools: ["Windows Server 2022", "PingCastle", "Microsoft LAPS", "PowerShell"],
    },
  ],
};

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "secnum-anssi",
    name: "SecNumacadémie — MOOC Cybersécurité de l'ANSSI",
    issuer: "ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information)",
    date: "Octobre 2025",
    status: "Obtenue",
    scoreOrBadge: "Score global : 94% (4 modules validés)",
    description:
      "Formation officielle de l'ANSSI couvrant le panorama de la SSI, la sécurité de l'authentification, la sécurité sur Internet et la sécurité du poste de travail et du nomadisme.",
    skills: ["Panorama SSI", "Cryptographie & Authentification", "Sécurité Réseau", "Poste de travail & Nomadisme"],
  },
  {
    id: "cisco-ccna1-2",
    name: "Cisco CCNA : Introduction to Networks & Switching, Routing",
    issuer: "Cisco Networking Academy (NetAcad)",
    date: "Janvier 2026",
    status: "Obtenue",
    scoreOrBadge: "Badge Officiel Credly — Mention Excellence",
    description:
      "Conception d'architectures IPv4/IPv6, configuration de commutateurs et routeurs Cisco IOS, VLANs, Spanning-Tree (RSTP), EtherChannel (LACP) et routage dynamique OSPF.",
    skills: ["Subnetting IPv4/IPv6", "VLAN & 802.1Q", "Spanning Tree & LACP", "Routage Statique & OSPF"],
  },
  {
    id: "cnil-rgpd",
    name: "Atelier RGPD — Les 5 Modules de conformité",
    issuer: "CNIL (Commission Nationale de l'Informatique et des Libertés)",
    date: "Novembre 2025",
    status: "Obtenue",
    scoreOrBadge: "5 Certificats obtenus (Modules 1 à 5)",
    description:
      "Maîtrise des principes de protection des données personnelles, registre des traitements, sécurité des données, responsabilité des sous-traitants IT et gestion des violations.",
    skills: ["Principes RGPD", "Sécurité des traitements", "Privacy by Design", "Sous-traitance IT"],
  },
  {
    id: "pix-certification",
    name: "Certification Nationale PIX",
    issuer: "GIP PIX — Ministère de l'Enseignement Supérieur",
    date: "Mars 2026",
    status: "Obtenue",
    scoreOrBadge: "640 / 768 Pix (Niveau Avancé 6/7)",
    description:
      "Validation officielle des compétences numériques transversales : sécurité, protection des données, environnement technique, traitement de données et collaboration.",
    skills: ["Cybersécurité", "Administration système", "Traitement de données", "Interopérabilité"],
  },
  {
    id: "stormshield-csna",
    name: "Préparation Stormshield CSNA / Linux LPIC-1",
    issuer: "Stormshield Academy & Linux Professional Institute",
    date: "Session 2026",
    status: "En cours",
    scoreOrBadge: "Labs pratiques validés à 80%",
    description:
      "Approfondissement de l'administration de pare-feux UTM/NGFW (filtrage applicatif, IPS, VPN IPsec) et de l'administration système Linux avancée en ligne de commande.",
    skills: ["Firewalling UTM", "Prévention d'intrusion (IPS)", "PKI & Certificats", "Administration Linux LPIC-1"],
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
    period: "Oct. 2025 — Déc. 2025",
    title: "Déploiement d'une infrastructure Active Directory redondée (Windows Server 2022) + GPO & LAPS",
    context: "Atelier Professionnel SISR — Lab Proxmox",
    competencies: ["B1.1", "B1.4", "B1.5"],
    deliverable: "Dossier d'architecture + Procédure AD",
  },
  {
    id: "real-2",
    category: "school",
    period: "Janv. 2026 — Févr. 2026",
    title: "Architecture réseau multi-VLANs, routage inter-VLAN sur switch L3 Cisco & Cluster pfSense HA (CARP)",
    context: "Projet E5 — Infrastructure Haute Disponibilité",
    competencies: ["B1.1", "B1.2", "B1.4", "B1.5"],
    deliverable: "Topologie Packet Tracer / GNS3 + Configs IOS",
  },
  {
    id: "real-3",
    category: "school",
    period: "Mars 2026 — Avril 2026",
    title: "Mise en place de GLPI 10 sous Debian 12 avec inventaire automatique GLPI Agent et liaison LDAP/AD",
    context: "Atelier Professionnel — Gestion de parc ITSM",
    competencies: ["B1.1", "B1.2", "B1.5"],
    deliverable: "Guide d'installation & Manuel utilisateur",
  },
  {
    id: "real-4",
    category: "school",
    period: "Sept. 2025 — Oct. 2026",
    title: "Conception de ce Portfolio IT (Next.js & Lenis) et système de veille automatisée Cybersécurité/Cloud",
    context: "Projet Personnel & Épreuve E4",
    competencies: ["B1.3", "B1.6"],
    deliverable: "Site Web en production & Flux de veille",
  },
  {
    id: "real-5",
    category: "company1",
    period: "Mai 2026 — Juin 2026",
    title: "Support utilisateurs N1/N2, résolution d'incidents réseau/système et masterisation de 45 postes Windows 11",
    context: "Stage 1re année — NovaSys Infrastructure",
    competencies: ["B1.1", "B1.2", "B1.5"],
    deliverable: "Rapports de tickets GLPI & Master WDS",
  },
  {
    id: "real-6",
    category: "company1",
    period: "Juin 2026",
    title: "Segmentation du VLAN Wi-Fi Invité et mise en place d'un portail captif sécurisé sur pfSense",
    context: "Stage 1re année — NovaSys Infrastructure",
    competencies: ["B1.1", "B1.4", "B1.5"],
    deliverable: "Procédure d'exploitation & PV de recette",
  },
  {
    id: "real-7",
    category: "company2",
    period: "Nov. 2026 — Janv. 2027",
    title: "Déploiement d'une plateforme de supervision Zabbix 7.0 (SNMPv3, Agents Linux/Windows, Alerting Teams)",
    context: "Stage 2e année / Alternance — NovaSys Infrastructure",
    competencies: ["B1.1", "B1.2", "B1.4", "B1.5"],
    deliverable: "Dashboard NOC & Documentation technique",
  },
  {
    id: "real-8",
    category: "company2",
    period: "Janv. 2027 — Févr. 2027",
    title: "Stratégie de sauvegarde 3-2-1 avec Proxmox Backup Server (PBS), chiffrement et tests de restauration PRA",
    context: "Stage 2e année / Alternance — NovaSys Infrastructure",
    competencies: ["B1.1", "B1.4", "B1.5"],
    deliverable: "Plan de Reprise d'Activité (PRA) validé",
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
  mainTheme: "L'évolution des architectures Zero Trust Network Access (ZTNA) et la sécurisation des infrastructures virtualisées (Hyperviseurs & Sauvegardes immuables)",
  problematique:
    "Comment les administrateurs Systèmes & Réseaux (SISR) peuvent-ils remplacer le modèle périmétrique traditionnel (« château-fort ») par une architecture Zero Trust et résiliente face aux rançongiciels ciblant les hyperviseurs ?",
  methodology: [
    {
      tool: "Feedly & Miniflux (Agrégateur RSS)",
      role: "Collecte quotidienne automatisée",
      sources: "CERT-FR (ANSSI), BleepingComputer, LeMagIT, Silicon, Proxmox Forum, Ars Technica",
    },
    {
      tool: "Bulletins d'Alerte CERT-FR & CVE",
      role: "Veille vulnérabilités critiques (Patch Management)",
      sources: "Avis de sécurité ANSSI, NIST NVD, Stormshield / Fortinet / Debian Security Advisories",
    },
    {
      tool: "Curation & Synthèse Notion / Git",
      role: "Qualification, tests en Lab Proxmox et archivage",
      sources: "Fiches de synthèse classées par impact SISR et applicabilité en entreprise",
    },
  ],
  articles: [
    {
      id: "veille-1",
      title: "Du VPN traditionnel au ZTNA (Zero Trust Network Access) : pourquoi le périmètre réseau ne suffit plus",
      source: "ANSSI / LeMagIT — Dossier Architecture Sécurité",
      date: "Septembre 2026",
      category: "Zero Trust & SASE",
      impactLevel: "Critique",
      summary:
        "Les attaques récentes montrent que la compromission d'un seul accès VPN donne souvent une visibilité latérale excessive sur le LAN. Le modèle ZTNA vérifie en continu l'identité, la conformité du poste (EDR/Certificat) et n'autorise l'accès qu'à l'application cible sans exposer le sous-réseau.",
      takeawaySISR:
        "En pratique SISR : combiner des tunnels WireGuard/IPsec avec un filtrage micro-segmenté par identité (/32) et une authentification multifacteur (MFA) systématique.",
      url: "https://www.ssi.gouv.fr/",
    },
    {
      id: "veille-2",
      title: "Migration massive de VMware vSphere vers Proxmox VE : retours d'expérience et bonnes pratiques en PME/ETI",
      source: "Proxmox Server Solutions / Silicon IT",
      date: "Août 2026",
      category: "Virtualisation & Cloud",
      impactLevel: "Majeur",
      summary:
        "Suite aux évolutions tarifaires et de licences sur le marché de la virtualisation, de nombreuses DSI migrent leurs clusters vers Proxmox VE 8.x couplé à Ceph ou ZFS et à l'outil d'importation natif ESXi.",
      takeawaySISR:
        "La maîtrise de Proxmox VE, de la haute disponibilité (Corosync) et de Proxmox Backup Server devient une compétence incontournable sur le marché de l'emploi SISR.",
      url: "https://www.proxmox.com/",
    },
    {
      id: "veille-3",
      title: "Protection des sauvegardes contre les ransomwares : l'immuabilité et la règle du 3-2-1-1-0",
      source: "CERT-FR & Guide ANSSI Sauvegardes",
      date: "Juillet 2026",
      category: "Cybersécurité & ANSSI",
      impactLevel: "Critique",
      summary:
        "Les cyberattaquants ciblent désormais en priorité les serveurs de sauvegarde et les hyperviseurs avant de déclencher le chiffrement. L'ajout d'une copie immuable (WORM / Object Lock ou compte PBS sans droit Prune/Delete) est indispensable.",
      takeawaySISR:
        "Toujours isoler le réseau d'administration des sauvegardes, désactiver le SSH/Root sur les serveurs de backup en production et tester régulièrement les restaurations (0 erreur).",
      url: "https://www.cert.ssi.gouv.fr/",
    },
    {
      id: "veille-4",
      title: "Durcissement Active Directory : généralisation de Windows LAPS et abandon progressif de NTLM au profit de Kerberos",
      source: "Microsoft Security & PingCastle Blog",
      date: "Juin 2026",
      category: "Cybersécurité & ANSSI",
      impactLevel: "Majeur",
      summary:
        "L'intégration native de Windows LAPS avec chiffrement AD et les nouvelles politiques de blocage NTLM réduisent drastiquement les risques de mouvements latéraux (Pass-the-Hash et relais NTLM).",
      takeawaySISR:
        "Auditer régulièrement l'AD avec PingCastle ou PurpleKnight et appliquer le modèle de séparation des comptes d'administration (Tier 0, Tier 1, Tier 2).",
      url: "https://www.pingcastle.com/",
    },
  ] as VeilleArticle[],
};
