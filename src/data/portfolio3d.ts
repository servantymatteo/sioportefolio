export interface Certification3DItem {
  id: string;
  date: string;
  code: string;
  shortBadge: string;
  issuer: string;
  title: string;
  description: string;
  status: string;
}

export const CERTIFICATION_ITEMS_3D: Certification3DItem[] = [
  {
    id: "cert-1",
    date: "Oct. 2025",
    code: "ANSSI",
    shortBadge: "SN",
    issuer: "SecNumacadémie — ANSSI",
    title: "MOOC Cybersécurité de l'ANSSI (4 Modules)",
    description:
      "Panorama de la SSI, sécurité de l'authentification, sécurité sur Internet et sécurité du poste de travail & nomadisme (Score : 94%).",
    status: "Validée",
  },
  {
    id: "cert-2",
    date: "Janv. 2026",
    code: "CCNA",
    shortBadge: "CS",
    issuer: "Cisco Networking Academy",
    title: "CCNA : Switching, Routing & Wireless Essentials",
    description:
      "Configuration avancée VLANs, 802.1Q Trunking, Rapid-PVST+, EtherChannel LACP et routage dynamique OSPF IPv4/IPv6.",
    status: "Validée",
  },
  {
    id: "cert-3",
    date: "Nov. 2025",
    code: "RGPD",
    shortBadge: "CN",
    issuer: "CNIL — Atelier RGPD",
    title: "Conformité RGPD & Sécurité des données (5 Modules)",
    description:
      "Principes de protection des données, registre des traitements, Privacy by Design et sécurité des sous-traitants IT.",
    status: "5/5 Certificats",
  },
  {
    id: "cert-4",
    date: "Mars 2026",
    code: "PIX",
    shortBadge: "PX",
    issuer: "GIP PIX — Certification d'État",
    title: "Certification Nationale PIX (640 / 768 Pix)",
    description:
      "Validation officielle des compétences en cybersécurité, administration système, réseau et traitement de données.",
    status: "Niveau Avancé",
  },
  {
    id: "cert-5",
    date: "Avril 2026",
    code: "PVE",
    shortBadge: "PM",
    issuer: "Proxmox Server Solutions",
    title: "Virtualisation Proxmox VE 8 & Cluster Haute Dispo",
    description:
      "Administration hyperviseur KVM/LXC, stockage ZFS/Ceph, réplication Corosync et sauvegardes dédupliquées PBS.",
    status: "Lab Validé",
  },
  {
    id: "cert-6",
    date: "Juin 2026",
    code: "AD-DS",
    shortBadge: "MS",
    issuer: "Microsoft Learn & PingCastle",
    title: "Hardening Active Directory & Windows Server 2022",
    description:
      "Déploiement AD DS redondé, modèle Tiering ANSSI, Windows LAPS, durcissement GPO et audit de vulnérabilités PingCastle.",
    status: "Validée",
  },
  {
    id: "cert-7",
    date: "Sept. 2026",
    code: "CSNA",
    shortBadge: "ST",
    issuer: "Stormshield / pfSense Lab",
    title: "Pare-feu UTM, HA CARP & Tunnels VPN WireGuard",
    description:
      "Filtrage inter-VLAN Zero-Trust, coupure de flux, prévention d'intrusion (IPS), redondance CARP/pfsync et VPN chiffré.",
    status: "En cours",
  },
  {
    id: "cert-8",
    date: "Oct. 2026",
    code: "LPIC-1",
    shortBadge: "LX",
    issuer: "Linux Professional Institute",
    title: "Administration Serveur Linux Debian 12 & Bash",
    description:
      "Durcissement SSH Ed25519, pare-feu NFTables/UFW, services Systemd, reverse-proxy Nginx TLS 1.3 et automatisation.",
    status: "Validée",
  },
];
