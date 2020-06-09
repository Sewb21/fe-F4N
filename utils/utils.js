export default function getSkillImageLocation(skillName) {
  const skills = {
    accounts: 'fas fa-file-invoice',
    secretarial: '',
    typing: 'fas fa-keyboard',
    proofreading: 'fas fa-glasses',
    electrics: 'fas fa-bolt',
    roofing: '',
    cleaning: 'fas fa-broom',
    plumbing: 'fas fa-wrench',
    'painting and decorating': '',
    computers: 'fas fa-desktop',
    gardening: 'fas fa-seedling',
    'flat pack': 'fas fa-box-open',
    photography: 'fas fa-camera-retro',
    videography: 'fas fa-video',
    sewing: '',
    baking: '',
    caligraphy: '',
    tiling: '',
    'make up artist': ''
  };
  return skills[skillName];
}
