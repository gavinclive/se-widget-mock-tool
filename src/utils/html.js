const html = `
  <html>
    <head>
      <link rel="stylesheet" href="/widget.css"> 
      <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
      <script defer src="/widget.js"></script>
    </head>
    <body>
      <div class="main-container"></div>
    </body>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const event = new CustomEvent('onWidgetLoad', {
          detail: {
            fieldData: {
              animationIn: 'bounceIn',
              animationOut: 'bounceOut',
              hideAfter: 600,
              messagesLimit: 100,
              nickColor: 'user',
              customNickColor: '#FF0000',
              hideCommands: 'no',
              mergeMessages: 'no',
              alignMessages: 'not block',
              ignoredUsers: 'bot1,bot2'
            },
            channel: {
              id: '12345678',
              username: 'TestChannel'
            }
          }
        });
        window.dispatchEvent(event)
      })
    </script>
  </html>
`

export default html
