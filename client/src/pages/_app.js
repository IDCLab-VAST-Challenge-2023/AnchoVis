import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Pretendard',
    body: 'Pretendard',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Text: {
      variants: {
        layout: {
          color: 'gray.500',
        },
      },
    },
    Heading: {
      variants: {
        layout: {
          fontWeight: 900,
          color: 'gray.500',
        },
        section: {
          fontSize: 'sm',
          fontWeight: 700,
          color: 'gray.700',
        },
      },
    },
    Button: {
      variants: {
        layout: {
          color: 'gray.500',
          backgroundColor: 'transparent',
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
