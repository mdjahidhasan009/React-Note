import { useEffect, useState } from 'react';

// Will solve using hook in future
export const CheckoutBad = () => {
	const [_user, setUser] = useState(null);
	const [cart, setCart] = useState([]);
	const [_promo, setPromo] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchUser();
		fetchCart();
	}, []);

	const fetchUser = async () => {
		const response = await fetch('/api/user');
		const data = await response.json();
		setUser(data);
	};

	const fetchCart = async () => {
		const response = await fetch('/api/cart');
		const data = await response.json();
		setCart(data);
	};

	const applyPromoCode = async (code: string) => {
		const response = await fetch(`/api/promo?code=${code}`);
		const data = await response.json();
		setPromo(data);
	};

	const handlePayment = async () => {
		setLoading(true);
		applyPromoCode('code');
		const response = await fetch('/api/pay', {
			method: 'POST',
			body: JSON.stringify({ cart }),
		});
		const data = await response.json();
		if (data.success) {
			alert('Payment Successful!');
		} else {
			alert('Payment Failed!');
		}
		setLoading(false);
	};

	return (
		<div>
			<h2>Checkout</h2>
			<button onClick={handlePayment} disabled={loading}>
				Pay Now
			</button>
		</div>
	);
};
