import { useState } from 'react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const SignupDialog = ({ isOpen, onClose }: any) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = async () => {
		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			});
			if (!response.ok) {
				throw new Error('Failed to register');
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
					<Button className="hidden">Open Signup</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Signup</DialogTitle>
					<DialogDescription>
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</DialogDescription>
					<DialogFooter>
						<Button onClick={handleSignup}>Signup</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
	);
};

export default SignupDialog;
