# uniq-toast-kit

A library for easily managing toast messages in React applications.

[한국어 문서](./README-ko.md)

## Key Features

- Direct toast calls from within components
- External toast calls via API
- Auto-dismiss timer support
- Custom duration settings
- Multiple toast stack management

## Installation

```bash
npm install uniq-toast-kit
# or
yarn add uniq-toast-kit
# or
pnpm add uniq-toast-kit
```

## Usage

### 1. Add ToastProvider to your application

```tsx
import { ToastProvider, ToastInitializer } from 'uniq-toast-kit';

function App() {
  return (
    <ToastProvider>
      <ToastInitializer />
      <YourApp />
    </ToastProvider>
  );
}
```

### 2. Using within components

```tsx
import { useToast } from 'uniq-toast-kit';

function YourComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      title: 'Success',
      description: 'Operation completed',
      duration: 3000, // optional, default is 3000ms
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

### 3. Using externally via API

```tsx
import { toastApi } from 'uniq-toast-kit';

// Use in API calls or external functions
const saveData = async (data: any) => {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toastApi.create({
        title: 'Success',
        description: 'Data has been saved',
      });
      return true;
    }
  } catch (error) {
    toastApi.create({
      title: 'Error',
      description: 'An error occurred while saving',
    });
    return false;
  }
};
```

## API

### useToast Hook

```tsx
const { showToast, hideToast, overlayList } = useToast();
```

#### showToast(options)

Displays a toast message.

```tsx
showToast({
  title: string,       // Toast title
  description: string, // Toast content
  duration?: number    // Display duration (ms, default: 3000)
});
```

#### hideToast(id)

Hides a specific toast.

```tsx
hideToast('toast-id');
```

#### overlayList

Returns the list of currently displayed toasts.

### toastApi

Provides an API for showing toasts from outside components.

```tsx
toastApi.create({
  title: string, // Toast title
  description: string, // Toast content
});
```

## Important Notes

- `ToastProvider` must be placed at the top level of your application
- `ToastInitializer` must be inside the `ToastProvider`
- `ToastInitializer` is required for external API usage

## Requirements

- React 18 or higher
- React DOM 18 or higher

## Example

```tsx
function Demo() {
  const { showToast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          showToast({
            title: 'Notification',
            description: 'You have a new message',
            duration: 5000,
          })
        }
      >
        Send Notification
      </button>
    </div>
  );
}
```
