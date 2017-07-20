module.exports = {
  dist: {
    files: [
      {
        expand: true,
        flatten: true,
        src: [`application/react/html/*.html`],
        dest: `application/react/dist/`
      }
    ]
  },
  vault: {
    files: [
      {
        expand: true,
        src: ['secrets/**/*', '!secrets/vault-pass.txt', '!secrets/.generated/*', '!secrets/.generated/**/*'],
        dest: 'vault/'
      }
    ]
  }
}
