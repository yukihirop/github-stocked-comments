# Github Stocked Comments

<p align="center">
  <a href="https://babeljs.io/">
    <img alt="babel" src="https://user-images.githubusercontent.com/11146767/54084647-b0a02d00-4376-11e9-831c-acd093aa4bd2.png" width="546">
  </a>
</p>

This app is a chrome extension for stock issue comments in GitHub.

## Feature

If you use this chrome extension, the following will happen to your GitHub.

1. A `Stocked` button will be added to all issue comments.
2. The `Stocked Comments` link is added to the navbar of GitHub.
3. When you click `Stocked Comments`, the page will be displayed.

like this:

<img src="https://user-images.githubusercontent.com/11146767/54064915-c7eaf780-425c-11e9-82d2-3a235fa9687d.png" width="80%">

## Install

Install the extension from [Chrome Web Store](https://chrome.google.com/webstore/detail/github-stocked-comments/cnmddkochdamgioikdfkkkojmdfoianf?utm_source=chrome-ntp-icon).

## Usage

1. Click `Stocked` on issuecomment.

<img src="https://user-images.githubusercontent.com/11146767/54065059-793e5d00-425e-11e9-829f-f0a9cfc98d74.png" width="80%">

2. Click `Stocked Comments` on navbar.

<img src="https://user-images.githubusercontent.com/11146767/54065117-3c269a80-425f-11e9-8689-2bf454113e0a.png" width="80%">

3. What you stocked is displayed.

<img src="https://user-images.githubusercontent.com/11146767/54065181-35e4ee00-4260-11e9-888c-acc05dcc48d4.png" width="80%">

## Development

```bash
$ yarn
$ # authorized
$ echo 'CLIENT_ID=set GitHub app client id' >> ./env
$ echo 'CLIENT_SECRET=set GitHub app client secret' >> ./env
$ yarn dev   # for development
$ yarn build # for production
```

Register `Oauth App` for Authorization from [here](https://github.com/settings/developers)

## License
The gem is available as open source under the terms of the MIT License.

## Declaration
The author is not responsible for any damage caused by using this gem.
Please use at your own risk.

## Contributing

1. Fork it ( http://github.com/yukihirop/github-stocked-comments/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
