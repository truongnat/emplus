import { TamaguiProvider, Theme } from 'tamagui'
import { PropsWithChildren } from 'react'
import config from './tamagui.config'
import { useColorScheme } from 'react-native'

/**
 * DesignProvider tích hợp Tamagui vào ứng dụng.
 * Tự động phát hiện và áp dụng Light/Dark theme từ hệ thống.
 */
export function DesignProvider({ children }: PropsWithChildren) {
    const colorScheme = useColorScheme()

    return (
        <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
            <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
                {children}
            </Theme>
        </TamaguiProvider>
    )
}
