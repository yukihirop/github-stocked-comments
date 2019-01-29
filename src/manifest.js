/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'github-stocked-comments',
  description: 'A Chrome extension project with Vue.js',
  author: 'yukihirop <te108186@gmail.com>',
  version: '1.0.0',
  icons: {
    '16': 'icons/16.png',
    '128': 'icons/128.png'
  },
  background: {
    scripts: [
      'js/vendor.js',
      'js/background.js'
    ],
    persistent: false
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    '*://*/*',
    'activeTab',
    'tabs',
    'storage'
  ],
  content_scripts: [{
    matches: [
      'https://github.com/',
      'https://github.com/*'
    ],
    js: [
      'js/vendor.js',
      'js/content.js'
    ]
  }],
  manifest_version: 2,
  content_security_policy: `script-src 'self' ${(process.env.NODE_ENV === 'development') ? '\'unsafe-eval\'' : ''}; object-src 'self'"`,
  web_accessible_resources: [
    'js/content.js',
    'js/inject.js'
  ]
}
