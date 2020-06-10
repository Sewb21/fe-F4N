export default function getSkillImageLocation(skillName) {
  const skills = {
    accounts: 'account_balance',
    secretarial: 'work',
    typing: 'keyboard',
    proofreading: 'visibility',
    electrics: 'flash_on',
    roofing: 'home',
    cleaning: 'cleaning_services',
    plumbing: 'build',
    'painting and decorating': 'format_paint',
    computers: 'computer',
    gardening: 'local_florist',
    'flat pack': 'build',
    photography: 'camera-enhance',
    videography: 'theaters',
    sewing: 'accessibility',
    baking: 'cake',
    caligraphy: 'create',
    tiling: 'build',
    'make up artist': 'face'
  };
  return skills[skillName];
}
