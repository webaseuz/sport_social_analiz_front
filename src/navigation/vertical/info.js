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
    visible: "view_organizationprofile",
  },
  {
    title: "RateByPost",
    route: "RateByPost",
    icon: "StarIcon",
    visible: "view_organizationprofile",
  },
  {
    title: "RateByAttr",
    route: "RateByAttr",
    icon: "StarIcon",
    visible: "view_facebook",
    // style: { ImageCss },
  },

  {
    title: "Top10",
    route: "Top10",
    icon: "ClipboardIcon",
    visible: "view_organizationprofile",
  },
  {
    title: "Television",
    route: "Television",
    icon: "TvIcon",
    visible: "view_television",
  },
  {
    title: "TelevisionPosition",
    route: "TelevisionMain",
    icon: "TvIcon",
    visible: "view_television",
  },
  {
    title: "TelevisionPosition",
    route: "IndexDownload",
    icon: "TvIcon",
    visible: "view_television",
  },
  {
    title: "SpesService",
    route: "SpesSerice",
    icon: "SettingsIcon",
    visible: "view_organizationprofile",
  },
  {
    title: "Rate",
    route: "Rate",
    icon: "CheckSquareIcon",
    visible: "view_level_organization",
  },
  {
    title: "ContactOrganization",
    route: "ContactOrganization",
    icon: "PhoneIcon",
    visible: "view_organizationprofile",
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
    visible: "view_instruction",
  },
  {
    title: "Instruction",
    route: "InstructionDownload",
    icon: "FileTextIcon",
    visible: "view_instruction",
  },
  {
    title: "Organization",
    route: "Organization",
    icon: "HexagonIcon",
    visible: "view_organizationprofile",
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
