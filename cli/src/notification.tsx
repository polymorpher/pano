import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState
} from 'react'
import { Text, Box, isWeb } from './shared/ui.js'
import { isCli } from './command/cmd.ts'
import {
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react'

interface NotificationOptions {
  time?: number
  duration?: number
  delay?: number
  color?: string
  sticky?: boolean
  id?: string
}

interface NotificationContextProps {
  addMessage: (message: string, options?: NotificationOptions) => void
  clear: () => void
  remove: (id: string) => void
  stickyMessages: NotificationMessage[]
  expiredMessages: NotificationMessage[]
  messageStore: Map<string, NotificationMessage>
}

export interface NotificationMessage {
  message: string
  options: NotificationOptions
}

export const NotificationContext = createContext<NotificationContextProps>({
  addMessage: (message: string, options: NotificationOptions = {}) => {},
  clear: () => {},
  remove: (id: string) => {},
  stickyMessages: [],
  expiredMessages: [],
  messageStore: new Map()
})

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [stickyMessages, setStickyMessages] = useState<NotificationMessage[]>(
    []
  )

  const [messageStore, setMessageStore] = useState<
    Map<string, NotificationMessage>
  >(new Map())

  const [expiredMessages, setExpiredMessages] = useState<NotificationMessage[]>(
    []
  )

  const toast = useToast()

  const addMessage = useCallback(
    (message: string, options: NotificationOptions = {}) => {
      if (isCli()) {
        options.sticky = true
      }

      const id = options.id ?? Math.random().toString(36).slice(2)
      const duration =
        options.duration && options.duration > 0 ? options.duration : 10_000
      const time = Date.now()
      options = { ...options, id, duration, time }
      if (options.sticky) {
        setStickyMessages((sm) => [...sm, { message, options }])
      }
      if (!options.sticky) {
        if (isWeb) {
          toast({
            description: message,
            status: options.color === 'red' ? 'error' : options.color === 'green' ? 'success' : 'info',
            duration: 10000,
            isClosable: true,
          })
          return
        }

        setTimeout(() => {
          setMessageStore((ms) => new Map([...ms, [id, { message, options }]]))
        }, options.delay ?? 0)
        setTimeout(() => {
          setMessageStore((ms) => new Map([...ms].filter((e) => e[0] !== id)))
          setExpiredMessages((em) => [...em, { message, options }])
        }, duration)
      }
    },
    []
  )
  const clear = useCallback(() => {
    setMessageStore(new Map())
    setStickyMessages([])
  }, [])
  const remove = useCallback((id: string) => {
    setMessageStore((ms) => {
      ms.delete(id)
      return ms
    })
    setStickyMessages((sm) => sm.filter((m) => m.options.id !== id))
  }, [])
  return (
    <NotificationContext.Provider
      value={{
        addMessage,
        clear,
        remove,
        stickyMessages,
        messageStore,
        expiredMessages
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const NotificationBar = () => {
  const { stickyMessages, messageStore } = useContext(NotificationContext)

  return (
    <Box flexDirection={'column'} marginTop={1} marginBottom={1}>
      {isCli() && <Text>Logs:</Text>}
      {stickyMessages.map((message) => isWeb ? (
        <Alert status={message.options.color === 'red' ? 'error' : 'success'} key={message.options.id} mb={2}>
          <AlertIcon />
          {message.message}
        </Alert>
      ) : (
        <Text
          key={message.options.id}
          color={message.options.color ?? 'greenBright'}
        >
          [!] {message.message}
        </Text>
      ))}
      {[...messageStore.values()].map((message) => (
        <Text key={message.options.id} color={message.options.color ?? 'grey'}>
          [*] {message.message}
        </Text>
      ))}
    </Box>
  )
}
