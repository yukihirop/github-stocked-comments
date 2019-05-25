/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'GitHub Stocked Comments',
  description: 'This app to be able to stock issue comments in GitHub.',
  author: 'yukihirop',
  version: '1.0.1',
  icons: {
    '16': 'icons/gsc_icon16.png',
    '48': 'icons/gsc_icon48.png',
    '128': 'icons/gsc_icon128.png'
  },
  background: {
    scripts: [
      'js/vendor.js',
      'js/background.js'
    ],
    persistent: false
  },
  browser_action: {
    default_popup: 'pages/popup.html'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    'https://github.com/*',
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
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [
    'js/content.js',
    'js/inject.js',
    '*.css'
  ]
}
