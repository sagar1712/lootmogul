import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginDialog = ({ isOpen, onClose }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      onClose();
    } catch (err) {
        console.log(err);
    } finally {
			onClose()
		}
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="hidden">Open Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleLogin}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
