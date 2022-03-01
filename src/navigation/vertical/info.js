import Permission from "./permissions";
export default [
  // {
  //   header: 'Info',
  // },
  // {
  //   title: 'Info',
  //   icon: 'InboxIcon',
  //   children : [
  //       {
  //         title : 'Bank',
  //         route: 'bank'
  //       }
  //   ]
  // }
  {
    title: "dashboard",
    route: "dashboard",
    icon: "HomeIcon",
    visible: true,
  },
  {
    title: "ConnectionOrg",
    route: "ConnectionOrg",
    icon: "LinkIcon",
    visible: true,
  },
  {
    title: "RateByPost",
    route: "RateByPost",
    icon: "StarIcon",
    visible: true,
  },
  {
    title: "RateByAttr",
    route: "RateByAttr",
    icon: "StarIcon",
    visible: true,
    // style: { ImageCss },
  },

  {
    title: "Top10",
    route: "Top10",
    icon: "ClipboardIcon",
    visible: true,
  },
  {
    title: "Television",
    route: "Television",
    icon: "TvIcon",
    visible: true,
  },
  {
    title: "TelevisionPosition",
    route: "TelevisionMain",
    icon: "TvIcon",
    visible: true,
  },
  {
    title: "TelevisionPosition",
    route: "IndexDownload",
    icon: "TvIcon",
    visible: true,
  },
  {
    title: "SpesService",
    route: "SpesSerice",
    icon: "SettingsIcon",
    visible: true,
  },
  {
    title: "Rate",
    route: "Rate",
    icon: "CheckSquareIcon",
    visible: true,
  },
  {
    title: "ContactOrganization",
    route: "ContactOrganization",
    icon: "PhoneIcon",
    visible: true,
  },
  // {
  //   title: 'SocialInfo',
  //   route: 'SocialInfo',
  //   icon: 'InfoIcon'
  // },

  {
    title: "InstructionAdd",
    route: "Instruction",
    icon: "FileTextIcon",
    visible: true,
  },
  {
    title: "Instruction",
    route: "InstructionDownload",
    icon: "FileTextIcon",
    visible: true,
  },
  {
    title: "Organization",
    route: "Organization",
    icon: "HexagonIcon",
    visible: true,
  },
  {
    title: "User",
    route: "User",
    icon: "UserIcon",
    visible: "view_user",
  },
  {
    title: "Role",
    route: "Role",
    icon: "AwardIcon",
    visible: "view_group",
  },
];
