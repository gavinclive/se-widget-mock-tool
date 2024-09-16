export default class EventTrigger {
  constructor(iframeRef) {
    this.iframe = iframeRef
  }

  triggerTestMessage() {
    const event = new CustomEvent('onEventReceived', {
      detail: {
        event: {
          listener: 'widget-button',
          field: 'testMessage',
          channelName: 'Mock Channel',
        }
      }
    })
    this.iframe.contentWindow.dispatchEvent(event)
  }

  triggerDeleteMessage() {
    const event = new CustomEvent('onEventReceived', {
      detail: {
        listener: 'delete-message',
        event: {
          msgId: '43285909-412c-4eee-b80d-89f72ba53142'
        }
      }
    })
    this.iframe.contentWindow.dispatchEvent(event)
  }

  triggerDeleteMessages() {
    const event = new CustomEvent('onEventReceived', {
      detail: {
        listener: 'delete-messages',
        event: {
          userId: '100135110'
        }
      }
    })
    this.iframe.contentWindow.dispatchEvent(event)
  }

  triggerCustomMessage(text, username, subscriber) {
    const event = new CustomEvent('onEventReceived', {
      detail: {
        listener: 'message',
        event: {
          service: 'custom',
          data: {
            time: Date.now(),
            tags: {
              'badge-info': '',
              badges: '',
              color: '#FF0000',
              'display-name': username,
              emotes: '',
              flags: '',
              id: 'custom-message-id',
              mod: '0',
              'room-id': 'custom-room-id',
              subscriber: subscriber === 'true' ? '1' : '0',
              'tmi-sent-ts': Date.now(),
              turbo: '0',
              'user-id': 'custom-user-id',
              'user-type': ''
            },
            nick: username,
            userId: 'custom-user-id',
            displayName: username,
            displayColor: '#FF0000',
            badges: [],
            channel: 'custom-channel',
            text: text,
            isAction: false,
            emotes: [],
            msgId: 'custom-message-id'
          },
          renderedText: text,
        }
      }
    })
    this.iframe.contentWindow.dispatchEvent(event)
  }

  triggerSimpleEvent(username, kind, message, tier) {
    let listener = kind

    if(kind === 'sub-gift-latest') {
      listener = 'subscriber-latest'
    }

    const event = new CustomEvent('onEventReceived', {
      detail: {
        listener,
        event: {
          time: Date.now(),
          name: username,
          amount: Math.floor(Math.random() * 999),
          message,
          gifted: kind === 'sub-gift-latest',
          tier,
        }
      }
    })
    this.iframe.contentWindow.dispatchEvent(event)
  }
}
