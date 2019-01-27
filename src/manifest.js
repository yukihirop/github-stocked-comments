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
  browser_action: {
    default_title: 'title',
    default_popup: 'pages/popup.html'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    // '<all_urls>',
    // '*://*/*',
    'activeTab',
    'tabs'
  ],
  content_scripts: [{
    matches: [
      "https://github.com/",
      "https://github.com/*"
    ],
    js: [
      "js/manifest.js",
      "js/vendor.js",
      "js/content.js"
    ]
  }],
  manifest_version: 2,
  content_security_policy: "script-src 'self'; object-src 'self'",
  web_accessible_resources: [
    "js/content.js"
  ]
}
