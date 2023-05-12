'use client';

import { getProviders, useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Nav = () => {
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const { data: session } = useSession();

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders()
			setProviders(res)
		}
		fetchProviders()
	}, [])


	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					alt='logo'
					width={30}
					height={30}
					className='object-contain'
				/>
				<p className='logo_text'>AI-Prompts</p>
			</Link>
			{/* Deskop Navigation */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-post' className='black_btn'>
							Create Post
						</Link>
						<button className='outline_btn' onClick={signOut}>
							Sign Out
						</button>
						<Link href='/profile' className='flex gap-2 flex-center'>
							<Image
								src={session?.user?.image}
								alt='profile'
								width={30}
								height={30}
								className='rounded-full'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>

			{/* mobile Navigation */}
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src='/assets/images/logo.svg'
							alt='profile'
							width={30}
							height={30}
							className='rounded-full'
							onClick={() =>
								setToggleDropdown((toggleDropdown) => !toggleDropdown)
							}
						/>

						{toggleDropdown && (
							<div className='dropdown'>
								{/* Clicking this link should navigate to profile and reset the toggle variable */}
								<Link
									className='dropdown_link'
									href='/profile'
									onClick={() => setToggleDropdown(false)}
								>My Profile</Link>
								<Link
									className='dropdown_link'
									href='/profile'
									onClick={() => setToggleDropdown(false)}
								>Create Prompt</Link>

								<button type='button' onClick={signOut} className='mt-5 w-full black_btn'>
									Sign Out
								</button>

							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
