# 🚀 Quick Reference Guide

## Authentication Hooks

### useAuth (Recommended)

```typescript
import { useAuth } from "@/src/presentation/hooks/auth";

const {
  // State
  user,
  session,
  isAuthenticated,
  isHydrated,

  // Actions
  login,
  register,
  logout,

  // Status
  isLoggingIn,
  isRegistering,
  isLoggingOut,

  // Errors
  loginError,
  registerError,
  logoutError,
} = useAuth();
```

### Individual Hooks

```typescript
import {
  useLogin,
  useRegister,
  useLogout,
} from "@/src/presentation/hooks/auth";

const login = useLogin({ onSuccess, onError, showToast: true });
const register = useRegister({ onSuccess, onError, showToast: true });
const { logout, isLoggingOut } = useLogout({ onSuccess, showToast: true });
```

## Theme System

### Basic Usage

```typescript
import { useTheme, tokens } from "@/src/framework/design";

const {
  theme,
  themeName,
  isDark,
  toggleTheme,
  getColor,
  tokens,
  transitionProgress,
} = useTheme();

// Get themed color
const bg = getColor("background");
const primary = getColor("primary");

// Access tokens
const spacing = tokens.space.md.value;
const radius = tokens.radius.lg.value;
```

### Theme Transition

```typescript
import { useThemeTransition } from "@/src/framework/design";

const { transitionProgress, isTransitioning } = useThemeTransition();
```

## Components

### AnimatedScreen

```typescript
import { AnimatedScreen } from '@/src/framework/design';

<AnimatedScreen
  scrollable
  background="default"  // 'default' | 'muted' | 'primary' | 'gradient'
  padding="md"          // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animation="fade"      // 'fade' | 'slide' | 'scale' | 'none'
  animationDuration={400}
>
  {children}
</AnimatedScreen>
```

### AnimatedButton

```typescript
import { AnimatedButton } from '@/src/framework/design';

<AnimatedButton
  variant="primary"     // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size="md"            // 'sm' | 'md' | 'lg' | 'xl'
  onPress={handlePress}
  loading={isLoading}
  disabled={isDisabled}
  fullWidth
  icon={<Icon />}
  iconPosition="left"  // 'left' | 'right'
>
  Button Text
</AnimatedButton>
```

### AnimatedInput

```typescript
import { AnimatedInput } from '@/src/framework/design';

<AnimatedInput
  label="Email"
  placeholder="example@email.com"
  value={value}
  onChangeText={setValue}
  error={errorMessage}
  helperText="Helper text"
  leftIcon={<Icon />}
  rightElement={<Button />}
  variant="outlined"   // 'outlined' | 'filled' | 'underlined'
  size="md"           // 'sm' | 'md' | 'lg'
  required
  secureTextEntry
/>
```

### AnimatedCard

```typescript
import { AnimatedCard } from '@/src/framework/design';

<AnimatedCard
  elevation="md"       // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  padding="lg"
  radius="lg"
  onPress={handlePress}
  background="default" // 'default' | 'muted' | 'primary' | 'glass'
  bordered
>
  {children}
</AnimatedCard>
```

### Loading Components

```typescript
import { SmoothLoading, LoadingOverlay } from '@/src/framework/design';

// Inline loading
<SmoothLoading
  message="Loading..."
  size="md"      // 'sm' | 'md' | 'lg'
  showIcon
/>

// Full-screen overlay
<LoadingOverlay
  visible={isLoading}
  message="Processing..."
  opacity={0.8}
/>
```

### Auth Components

```typescript
import {
  AuthHeader,
  AuthSocialButton,
  AuthDivider,
  AuthFooter
} from '@/src/framework/design';

<AuthHeader
  icon="heart-outline"
  title="Em+"
  subtitle="Welcome"
  showBack
  onBack={handleBack}
/>

<AuthSocialButton
  icon="logo-google"
  label="Continue with Google"
  onPress={handleGoogleLogin}
/>

<AuthDivider text="or" />

<AuthFooter
  text="Don't have an account? "
  linkText="Sign up"
  onLinkPress={handleSignUp}
/>
```

## Common Patterns

### Login Form

```typescript
import { useAuth } from '@/src/presentation/hooks/auth';
import { AnimatedScreen, AnimatedButton, AnimatedInput } from '@/src/framework/design';

function LoginScreen() {
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatedScreen scrollable>
      <AnimatedInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <AnimatedInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AnimatedButton
        onPress={() => login({ email, password })}
        loading={isLoggingIn}
        fullWidth
      >
        Login
      </AnimatedButton>
    </AnimatedScreen>
  );
}
```

### Theme Toggle

```typescript
import { useTheme } from '@/src/framework/design';
import { Switch } from 'react-native';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Dark Mode</Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}
```

### Themed Card

```typescript
import { useTheme, tokens, AnimatedCard } from '@/src/framework/design';

function ThemedCard({ title, children }) {
  const { getColor } = useTheme();

  return (
    <AnimatedCard
      elevation="md"
      padding="lg"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: getColor('primary'),
      }}
    >
      <Text style={{
        color: getColor('text'),
        fontSize: tokens.typography.fontSize['4'].value,
        fontWeight: '600',
      }}>
        {title}
      </Text>
      {children}
    </AnimatedCard>
  );
}
```

### Error Handling

```typescript
import { useAuth } from '@/src/presentation/hooks/auth';
import { Alert } from 'react-native';

function MyForm() {
  const { login, loginError, resetLoginError } = useAuth();

  useEffect(() => {
    if (loginError) {
      Alert.alert('Login Failed', loginError.message);
      resetLoginError();
    }
  }, [loginError]);

  return (
    <Button
      onPress={() => login({ email, password })}
      loading={isLoggingIn}
    >
      Login
    </Button>
  );
}
```

## Tokens Reference

### Colors

```typescript
tokens.color.primary.value; // '#ec1334'
tokens.color.accent.value; // '#2563eb'
tokens.color.semantic.danger.value;
tokens.color.semantic.success.value;
tokens.color.semantic.warning.value;
tokens.color.semantic.info.value;
```

### Spacing

```typescript
tokens.space.none.value; // 0
tokens.space["2xs"].value; // 4
tokens.space.xs.value; // 8
tokens.space.sm.value; // 12
tokens.space.md.value; // 16
tokens.space.lg.value; // 24
tokens.space.xl.value; // 32
tokens.space["2xl"].value; // 40
```

### Border Radius

```typescript
tokens.radius.none.value; // 0
tokens.radius.xs.value; // 4
tokens.radius.sm.value; // 8
tokens.radius.md.value; // 12
tokens.radius.lg.value; // 18
tokens.radius.xl.value; // 24
tokens.radius.pill.value; // 9999
```

### Typography

```typescript
tokens.typography.fontSize["1"].value; // 12
tokens.typography.fontSize["2"].value; // 14
tokens.typography.fontSize["3"].value; // 16
tokens.typography.fontSize["4"].value; // 18
tokens.typography.fontSize["5"].value; // 22
tokens.typography.fontSize["6"].value; // 28
tokens.typography.fontSize["7"].value; // 34

tokens.typography.fontWeight.regular; // '400'
tokens.typography.fontWeight.medium; // '500'
tokens.typography.fontWeight.semiBold; // '600'
tokens.typography.fontWeight.bold; // '700'
```

## Best Practices

✅ **DO:**

- Use `useAuth()` for unified auth state
- Use themed colors with `getColor()`
- Use tokens for consistent spacing/sizes
- Handle loading and error states
- Use appropriate component variants
- Keep components memoized

❌ **DON'T:**

- Hardcode colors or spacing values
- Call hooks conditionally
- Forget to handle loading states
- Ignore error states
- Use multiple auth hooks in same component (use `useAuth()` instead)

## Troubleshooting

### Theme not updating?

```typescript
// Ensure ThemeProvider wraps your app
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Auth state not persisting?

```typescript
// Ensure SessionProvider wraps your app
<SessionProvider>
  <App />
</SessionProvider>
```

### Animations not smooth?

```typescript
// Use native driver
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // ✅
});
```

---

For complete documentation, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
