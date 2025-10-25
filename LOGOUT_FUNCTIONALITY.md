# Logout Functionality Added to SecondaryNavbar

## Overview
Added logout functionality to the SecondaryNavbar component in the HomePage, allowing users to securely log out from their accounts.

## Implementation Details

### 1. **Logout Function**
- **Location**: `src/features/home/HomePage.tsx` - `SecondaryNavbar` component
- **Function**: `handleLogout()`
- **Functionality**:
  - Clears authentication data from localStorage:
    - `token` - JWT authentication token
    - `role` - User role information
    - `user` - User profile data
  - Redirects user to login page (`/login`)

### 2. **Desktop Navigation Logout Button**
- **Position**: Right side of the navigation bar
- **Styling**:
  - White text with transparent background
  - Subtle border for visual distinction
  - Red hover effect (`#f44336`) to indicate logout action
  - Smooth transitions and hover animations
- **Icon**: Material-UI `Logout` icon

### 3. **Mobile Navigation Logout Button**
- **Position**: Bottom of the mobile drawer menu
- **Styling**:
  - Red text color (`#f44336`) to indicate logout action
  - Light red hover background
  - Consistent with mobile drawer styling
- **Icon**: Material-UI `Logout` icon

## Code Changes

### Imports Added:
```typescript
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
```

### Hook Added:
```typescript
const navigate = useNavigate();
```

### Logout Function:
```typescript
const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    
    // Navigate to login page
    navigate('/login');
};
```

### Desktop Logout Button:
```typescript
<Button
    onClick={handleLogout}
    startIcon={<Logout />}
    sx={{
        color: '#ffffff',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '0.95rem',
        fontWeight: '400',
        textTransform: 'none',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.2)',
        '&:hover': {
            backgroundColor: 'rgba(244, 67, 54, 0.15)',
            color: '#f44336',
            borderColor: '#f44336',
            transform: 'translateY(-1px)',
        },
    }}
>
    Logout
</Button>
```

### Mobile Logout Button:
```typescript
<ListItem disablePadding>
    <ListItemButton
        onClick={handleLogout}
        sx={{
            color: '#f44336',
            '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
            },
        }}
    >
        <ListItemIcon sx={{ color: '#f44336' }}>
            <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
    </ListItemButton>
</ListItem>
```

## User Experience

### Desktop:
1. User sees "Logout" button in the top navigation bar
2. Button has subtle border and logout icon
3. On hover: red color and slight upward movement
4. Click: clears session and redirects to login

### Mobile:
1. User opens mobile menu (hamburger icon)
2. Sees "Logout" option at bottom of drawer
3. Red color indicates logout action
4. Click: clears session and redirects to login

## Security Features
- **Complete Session Cleanup**: Removes all authentication data
- **Immediate Redirect**: Prevents access to protected pages after logout
- **Visual Feedback**: Clear indication of logout action with red styling

## Testing
To test the logout functionality:
1. Login as a user
2. Navigate to homepage
3. Click "Logout" button (desktop) or open mobile menu and click "Logout"
4. Verify redirect to login page
5. Verify authentication data is cleared
6. Verify cannot access protected pages without re-login
